import json

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import Client, TestCase, override_settings

from .models import WatchedTitle
from .site_files import is_site_file

User = get_user_model()
PASSWORD = "vibranium-shield-1943"


class ApiTestCase(TestCase):
    def setUp(self):
        cache.clear()
        # Enforce CSRF like a real browser would.
        self.client = Client(enforce_csrf_checks=True)
        self.client.get("/api/me")

    def post(self, url, data=None, csrf=True):
        headers = {"HTTP_X_CSRFTOKEN": self.client.cookies["csrftoken"].value} if csrf else {}
        return self.client.post(url, json.dumps(data or {}), content_type="application/json", **headers)

    def sign_up(self, username="peter", password=PASSWORD):
        return self.post("/api/signup", {"username": username, "password": password})


class AccountTests(ApiTestCase):
    def test_me_when_signed_out_sets_csrf_cookie(self):
        response = self.client.get("/api/me")
        self.assertEqual(response.json(), {"authenticated": False})
        self.assertIn("csrftoken", response.cookies)
        self.assertIn("no-cache", response["Cache-Control"])

    def test_signup_signs_in(self):
        response = self.sign_up()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(self.client.get("/api/me").json(), {"authenticated": True, "username": "peter"})

    def test_signup_rejects_taken_username_any_case(self):
        User.objects.create_user("Peter", password=PASSWORD)
        response = self.sign_up("peter")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["field"], "username")

    def test_signup_rejects_bad_username_and_weak_password(self):
        self.assertEqual(self.sign_up("p").json()["field"], "username")
        self.assertEqual(self.sign_up("peter<script>").json()["field"], "username")
        self.assertEqual(self.sign_up("peter", "password").json()["field"], "password")
        self.assertEqual(self.sign_up("peter", "12345678901").json()["field"], "password")
        self.assertFalse(User.objects.exists())

    def test_post_without_csrf_token_is_rejected(self):
        response = self.post("/api/signup", {"username": "peter", "password": PASSWORD}, csrf=False)
        self.assertEqual(response.status_code, 403)
        self.assertIn("error", response.json())
        self.assertFalse(User.objects.exists())

    def test_login_logout(self):
        User.objects.create_user("Peter", password=PASSWORD)
        self.assertEqual(self.post("/api/login", {"username": "peter", "password": "wrong-password"}).status_code, 400)
        response = self.post("/api/login", {"username": "peter", "password": PASSWORD})
        self.assertEqual(response.json(), {"authenticated": True, "username": "Peter"})
        self.post("/api/logout")
        self.assertEqual(self.client.get("/api/me").json(), {"authenticated": False})

    def test_login_is_throttled_after_repeated_failures(self):
        User.objects.create_user("peter", password=PASSWORD)
        for _ in range(10):
            self.post("/api/login", {"username": "peter", "password": "wrong-password"})
        response = self.post("/api/login", {"username": "peter", "password": PASSWORD})
        self.assertEqual(response.status_code, 429)

    def test_rejects_non_json_and_get_on_post_endpoints(self):
        token = self.client.cookies["csrftoken"].value
        response = self.client.post("/api/login", "not json", content_type="application/json", HTTP_X_CSRFTOKEN=token)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(self.client.get("/api/login").status_code, 405)


class WatchedTests(ApiTestCase):
    def test_requires_sign_in(self):
        self.assertEqual(self.client.get("/api/watched").status_code, 401)
        self.assertEqual(self.post("/api/watched", {"add": ["iron-man"]}).status_code, 401)

    def test_add_remove_clear(self):
        self.sign_up()
        response = self.post("/api/watched", {"add": ["iron-man", "thor", "iron-man"]})
        self.assertEqual(sorted(response.json()["ids"]), ["iron-man", "thor"])
        response = self.post("/api/watched", {"add": ["loki-s1"], "remove": ["thor"]})
        self.assertEqual(sorted(response.json()["ids"]), ["iron-man", "loki-s1"])
        self.assertEqual(sorted(self.client.get("/api/watched").json()["ids"]), ["iron-man", "loki-s1"])
        self.assertEqual(self.post("/api/watched", {"clear": True}).json()["ids"], [])

    def test_lists_are_private_to_each_member(self):
        self.sign_up("peter")
        self.post("/api/watched", {"add": ["iron-man"]})
        self.post("/api/logout")
        self.sign_up("miles")
        self.assertEqual(self.client.get("/api/watched").json()["ids"], [])
        self.assertEqual(WatchedTitle.objects.count(), 1)

    def test_rejects_invalid_ids(self):
        self.sign_up()
        for bad in [["Iron Man"], ["../etc"], [42], "iron-man", ["x" * 81]]:
            self.assertEqual(self.post("/api/watched", {"add": bad}).status_code, 400, bad)
        self.assertEqual(WatchedTitle.objects.count(), 0)


class EnsureAdminTests(TestCase):
    def run_command(self, **env):
        from io import StringIO
        from unittest import mock
        from django.core.management import call_command
        with mock.patch.dict("os.environ", env, clear=False):
            call_command("ensure_admin", stdout=StringIO())

    def test_creates_admin_once_and_never_overwrites(self):
        self.run_command(DJANGO_ADMIN_USERNAME="owner", DJANGO_ADMIN_PASSWORD=PASSWORD)
        admin = User.objects.get(username="owner")
        self.assertTrue(admin.is_superuser and admin.is_staff)
        self.run_command(DJANGO_ADMIN_USERNAME="owner", DJANGO_ADMIN_PASSWORD="another-strong-pass-77")
        admin.refresh_from_db()
        self.assertTrue(admin.check_password(PASSWORD))

    def test_does_nothing_without_variables_and_rejects_weak_password(self):
        from django.core.management.base import CommandError
        self.run_command(DJANGO_ADMIN_USERNAME="", DJANGO_ADMIN_PASSWORD="")
        self.assertFalse(User.objects.exists())
        with self.assertRaises(CommandError):
            self.run_command(DJANGO_ADMIN_USERNAME="owner", DJANGO_ADMIN_PASSWORD="password")


class SiteFileTests(TestCase):
    def test_allowlist(self):
        for ok in ["index.html", "title.html", "css/archive.css", "js/core.js", "js/data/mcu.js", "js/pages/timeline.js"]:
            self.assertTrue(is_site_file(ok), ok)
        for blocked in ["CLAUDE.md", "backend/db.sqlite3", "backend/manage.py", "mockups/v5-programme/index.html",
                        "scripts/check_data.py", "css/../backend/db.sqlite3", ".vercelignore", "js/data/../../CLAUDE.md"]:
            self.assertFalse(is_site_file(blocked), blocked)

    @override_settings(DEBUG=True)
    def test_development_server_serves_pages_but_not_private_files(self):
        self.assertEqual(self.client.get("/").status_code, 200)
        self.assertEqual(self.client.get("/mcu.html").status_code, 200)
        self.assertEqual(self.client.get("/js/core.js").status_code, 200)
        for blocked in ["/CLAUDE.md", "/backend/db.sqlite3", "/backend/marvel_archive/settings.py", "/mockups/v1-nexus.html"]:
            self.assertEqual(self.client.get(blocked).status_code, 404, blocked)
