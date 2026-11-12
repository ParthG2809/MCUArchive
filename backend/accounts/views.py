"""Account API (JSON, session cookie + CSRF token) and the static-site fallback views.

API (all under /api/, all responses JSON, never cached):
  GET  me        -> {authenticated, username?}; also sets the csrftoken cookie
  POST signup    {username, password} -> creates the account and signs in
  POST login     {username, password}
  POST logout
  GET  watched   -> {ids: [...]}
  POST watched   {add?: [...], remove?: [...], clear?: true} -> {ids: [...]}
POST requests must send the csrftoken cookie value in the X-CSRFToken header (Django's CSRF protection).
"""
import json
import re

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.contrib.auth.password_validation import validate_password
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.db import transaction
from django.http import Http404, HttpResponse, JsonResponse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_http_methods, require_POST
from django.views.static import serve

from .models import WatchedTitle
from .site_files import is_site_file

User = get_user_model()

USERNAME_RE = re.compile(r"^[A-Za-z0-9_.-]{3,30}$")
TITLE_ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,79}$")
MAX_IDS_PER_REQUEST = 500
MAX_WATCHED_PER_USER = 2000
LOGIN_FAILURE_LIMIT = 10
LOGIN_LOCKOUT_SECONDS = 15 * 60


class BadRequest(Exception):
    def __init__(self, message, field=None):
        super().__init__(message)
        self.message, self.field = message, field


def api_error(message, status=400, field=None):
    body = {"error": message}
    if field:
        body["field"] = field
    return JsonResponse(body, status=status)


def read_json(request):
    try:
        data = json.loads(request.body or b"{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        raise BadRequest("The request body must be JSON.")
    if not isinstance(data, dict):
        raise BadRequest("The request body must be a JSON object.")
    return data


def text_field(data, name):
    value = data.get(name, "")
    if not isinstance(value, str):
        raise BadRequest(f"{name.capitalize()} must be text.", name)
    return value


def account_payload(user):
    if user.is_authenticated:
        return {"authenticated": True, "username": user.get_username()}
    return {"authenticated": False}


def api_view(view):
    """Turns BadRequest into a 400 JSON response."""
    def wrapped(request, *args, **kwargs):
        try:
            return view(request, *args, **kwargs)
        except BadRequest as exc:
            return api_error(exc.message, field=exc.field)
    wrapped.__name__ = view.__name__
    wrapped.__doc__ = view.__doc__
    return wrapped


# ---------- account ----------

@never_cache
@ensure_csrf_cookie
@require_GET
def me(request):
    return JsonResponse(account_payload(request.user))


@never_cache
@require_POST
@api_view
def signup(request):
    data = read_json(request)
    username = text_field(data, "username").strip()
    password = text_field(data, "password")

    if not USERNAME_RE.match(username):
        raise BadRequest("Use 3–30 letters, numbers, dots, dashes or underscores.", "username")
    if User.objects.filter(username__iexact=username).exists():
        raise BadRequest("That username is taken.", "username")
    try:
        validate_password(password, user=User(username=username))
    except ValidationError as exc:
        raise BadRequest(" ".join(exc.messages), "password")

    user = User.objects.create_user(username=username, password=password)
    login(request, user)
    return JsonResponse(account_payload(user), status=201)


@never_cache
@require_POST
@api_view
def login_view(request):
    data = read_json(request)
    username = text_field(data, "username").strip()
    password = text_field(data, "password")
    if not username or not password:
        raise BadRequest("Enter your username and password.")

    # Throttle repeated failures per username (cache is per server process).
    throttle_key = f"login-failures:{username.lower()}"
    if cache.get(throttle_key, 0) >= LOGIN_FAILURE_LIMIT:
        return api_error("Too many failed attempts. Try again in 15 minutes.", status=429)

    # Usernames are unique regardless of case, so sign in with the stored spelling.
    stored = User.objects.filter(username__iexact=username).values_list("username", flat=True).first()
    user = authenticate(request, username=stored or username, password=password)
    if user is None:
        if not cache.add(throttle_key, 1, LOGIN_LOCKOUT_SECONDS):
            cache.incr(throttle_key)
        return api_error("Wrong username or password.", status=400)

    cache.delete(throttle_key)
    login(request, user)
    return JsonResponse(account_payload(user))


@never_cache
@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse(account_payload(request.user))


# ---------- watched titles ----------

def id_list(data, name):
    value = data.get(name, [])
    if not isinstance(value, list) or len(value) > MAX_IDS_PER_REQUEST:
        raise BadRequest(f"'{name}' must be a list of at most {MAX_IDS_PER_REQUEST} title ids.", name)
    if not all(isinstance(v, str) and TITLE_ID_RE.match(v) for v in value):
        raise BadRequest(f"'{name}' contains an invalid title id.", name)
    return list(dict.fromkeys(value))


def watched_ids(user):
    return list(user.watched_titles.values_list("title_id", flat=True))


@never_cache
@require_http_methods(["GET", "POST"])
@api_view
def watched(request):
    if not request.user.is_authenticated:
        return api_error("Sign in to use a watch list.", status=401)
    user = request.user

    if request.method == "POST":
        data = read_json(request)
        add, remove = id_list(data, "add"), id_list(data, "remove")
        clear = data.get("clear") is True
        with transaction.atomic():
            if clear:
                user.watched_titles.all().delete()
            if remove:
                user.watched_titles.filter(title_id__in=remove).delete()
            if add:
                existing = set(user.watched_titles.filter(title_id__in=add).values_list("title_id", flat=True))
                new = [i for i in add if i not in existing]
                if user.watched_titles.count() + len(new) > MAX_WATCHED_PER_USER:
                    raise BadRequest("Your watch list is full.")
                WatchedTitle.objects.bulk_create(
                    [WatchedTitle(user=user, title_id=i) for i in new], ignore_conflicts=True)

    return JsonResponse({"ids": watched_ids(user)})


def csrf_failure(request, reason=""):
    return api_error("Your session expired. Reload the page and try again.", status=403)


# ---------- the static site ----------

def not_found(request, exception=None):
    root = settings.PUBLIC_ROOT if settings.WHITENOISE_ROOT else settings.SITE_DIR
    page = root / "404.html"
    body = page.read_bytes() if page.exists() else b"Not found"
    return HttpResponse(body, status=404, content_type="text/html; charset=utf-8")


def site_file(request, path):
    """Development: serve allow-listed site files straight from the repository.
    Production: WhiteNoise serves them from backend/public/, so anything reaching here is a 404."""
    path = path or "index.html"
    if settings.DEBUG and is_site_file(path) and (settings.SITE_DIR / path).is_file():
        return serve(request, path, document_root=settings.SITE_DIR)
    if settings.DEBUG:
        return not_found(request)
    raise Http404
