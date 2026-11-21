"""Which files of the repository make up the public website.

Only top-level .html pages, the .css/.js files under css/ and js/, and the .png/.svg images in img/ are public.
Everything else (backend/, the database, docs, mockups, scripts) must never be served."""
import re

SITE_FILE_RE = re.compile(
    r"^(?:[A-Za-z0-9_-]+\.html|(?:css|js)(?:/[A-Za-z0-9_-]+)+\.(?:css|js)|img/[A-Za-z0-9_-]+\.(?:png|svg))$"
)


def is_site_file(relative_path: str) -> bool:
    return bool(SITE_FILE_RE.match(relative_path))
