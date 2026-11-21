"""Copy the public website into backend/public/ for WhiteNoise to serve in production.

Run on every deploy (see render.yaml). Only allow-listed files are copied (accounts/site_files.py)."""
import shutil

from django.conf import settings
from django.core.management.base import BaseCommand

from accounts.site_files import is_site_file


class Command(BaseCommand):
    help = "Copy the public HTML/CSS/JS/image site into backend/public/."

    def handle(self, *args, **options):
        source, target = settings.SITE_DIR, settings.PUBLIC_ROOT
        if target.exists():
            shutil.rmtree(target)
        copied = 0
        candidates = [*source.glob("*.html"), *(source / "css").rglob("*"), *(source / "js").rglob("*"), *(source / "img").glob("*")]
        for path in sorted(candidates):
            relative = path.relative_to(source).as_posix()
            if path.is_file() and is_site_file(relative):
                destination = target / relative
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(path, destination)
                copied += 1
        self.stdout.write(self.style.SUCCESS(f"Copied {copied} site files to {target}"))
