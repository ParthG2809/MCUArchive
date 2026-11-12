"""Create the site admin from environment variables if it doesn't exist yet.

Render's free plan has no shell for `createsuperuser`, so the deploy runs this instead (see render.yaml).
Set DJANGO_ADMIN_USERNAME and DJANGO_ADMIN_PASSWORD in the Render dashboard. If either is missing, nothing happens.
An existing admin is never changed (its password is not overwritten on later deploys)."""
import os

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Create the admin account from DJANGO_ADMIN_USERNAME / DJANGO_ADMIN_PASSWORD if it doesn't exist."

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_ADMIN_USERNAME", "").strip()
        password = os.environ.get("DJANGO_ADMIN_PASSWORD", "")
        if not username or not password:
            self.stdout.write("DJANGO_ADMIN_USERNAME / DJANGO_ADMIN_PASSWORD not set; no admin created.")
            return

        User = get_user_model()
        if User.objects.filter(username__iexact=username).exists():
            self.stdout.write(f"Admin '{username}' already exists; left unchanged.")
            return
        try:
            validate_password(password, user=User(username=username))
        except ValidationError as exc:
            raise CommandError("DJANGO_ADMIN_PASSWORD is too weak: " + " ".join(exc.messages))

        User.objects.create_superuser(username=username, password=password)
        self.stdout.write(self.style.SUCCESS(f"Admin '{username}' created."))
