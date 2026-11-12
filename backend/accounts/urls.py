from django.urls import path

from . import views

urlpatterns = [
    path("me", views.me, name="me"),
    path("signup", views.signup, name="signup"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("watched", views.watched, name="watched"),
]
