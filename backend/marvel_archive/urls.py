from django.contrib import admin
from django.urls import include, path, re_path

from accounts import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("accounts.urls")),
    # The static site. In production WhiteNoise answers these before Django's URLs are reached,
    # so this route only serves files in development and the 404 page otherwise.
    re_path(r"^(?P<path>.*)$", views.site_file, name="site_file"),
]

handler404 = "accounts.views.not_found"
