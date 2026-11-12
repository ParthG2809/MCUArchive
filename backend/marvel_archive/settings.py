"""Settings for The Marvel Archive backend.

Django serves the whole site: the static pages (from the repository root) and the account API under /api/.
Everything environment-specific comes from environment variables:

  DJANGO_DEBUG            "1" for local development (default: off)
  DJANGO_SECRET_KEY       required when DEBUG is off
  DJANGO_ALLOWED_HOSTS    comma-separated extra host names
  DATABASE_URL            e.g. postgres://... (default: SQLite file in backend/)
  RENDER_EXTERNAL_HOSTNAME  set automatically by Render
  DJANGO_SSL_REDIRECT     "0" disables the https redirect (local production-mode testing only)
  DJANGO_ADMIN_USERNAME / DJANGO_ADMIN_PASSWORD  read by `manage.py ensure_admin` on deploy
"""
from pathlib import Path
import os

import dj_database_url
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent  # backend/
SITE_DIR = BASE_DIR.parent                         # repository root: the HTML/CSS/JS site

DEBUG = os.environ.get("DJANGO_DEBUG") == "1"

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "")
if not SECRET_KEY:
    if not DEBUG:
        raise ImproperlyConfigured("Set DJANGO_SECRET_KEY (or DJANGO_DEBUG=1 for local development).")
    SECRET_KEY = "local-development-only-not-secret"

ALLOWED_HOSTS = [h.strip() for h in os.environ.get("DJANGO_ALLOWED_HOSTS", "").split(",") if h.strip()]
CSRF_TRUSTED_ORIGINS = []
render_host = os.environ.get("RENDER_EXTERNAL_HOSTNAME")
if render_host:
    ALLOWED_HOSTS.append(render_host)
    CSRF_TRUSTED_ORIGINS.append(f"https://{render_host}")
if DEBUG:
    ALLOWED_HOSTS += ["localhost", "127.0.0.1", "[::1]"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "accounts",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "marvel_archive.urls"
WSGI_APPLICATION = "marvel_archive.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
        conn_health_checks=True,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Static files: /static/ is only the Django admin's assets (collectstatic).
# The site itself is served from the web root: in production by WhiteNoise from backend/public/
# (filled by `manage.py build_site`), in development straight from the repository by accounts.views.site_file.
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
PUBLIC_ROOT = BASE_DIR / "public"
WHITENOISE_ROOT = PUBLIC_ROOT if PUBLIC_ROOT.exists() and not DEBUG else None
WHITENOISE_INDEX_FILE = True


def _site_file_headers(headers, path, url):
    """WhiteNoise answers before Django's clickjacking middleware, so add the same protection to every page it serves."""
    headers["X-Frame-Options"] = "DENY"


WHITENOISE_ADD_HEADERS_FUNCTION = _site_file_headers
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}

# Caching is only used for the login throttle (per process).
CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}

# Sessions: signed-in for 60 days; cookies are HttpOnly and SameSite=Lax (Django defaults).
SESSION_COOKIE_AGE = 60 * 24 * 60 * 60
CSRF_FAILURE_VIEW = "accounts.views.csrf_failure"  # JSON instead of Django's HTML page

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    # On by default; DJANGO_SSL_REDIRECT=0 only for a local production-mode test over plain http.
    SECURE_SSL_REDIRECT = os.environ.get("DJANGO_SSL_REDIRECT", "1") != "0"
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30
    SECURE_REFERRER_POLICY = "same-origin"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "WARNING"},
}
