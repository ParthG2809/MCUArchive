# The Marvel Archive: project instructions

A multi-page fan website (static frontend + small Django account backend) that catalogues every Marvel film and series on four timelines ("realities"):
MCU (Sacred Timeline), Spider-Verse, Mutant (X-Men) and Legacy (everything else: Blade, Fox Fantastic Four, Netflix, ABC/Hulu shows…).
Marvel-only. No DC or other franchises.

## Stack (fixed. Do not change without the owner's approval)
- Frontend: plain HTML, CSS and vanilla JavaScript. No frameworks, no Node/npm, no build step.
- GSAP 3.12.5 (+ Flip plugin) loaded from cdnjs. The only third-party frontend library.
- Backend (accounts only): Django 5.2 LTS in `backend/`, with gunicorn, whitenoise, dj-database-url, psycopg
  (pinned in `backend/requirements.txt`, installed in `backend/.venv`). SQLite locally, Postgres on Render.
- Fonts from Google Fonts: Alfa Slab One (headlines), Libre Franklin (body), Bungee (signage, years, numbers), Special Elite (typewriter text).
- Hosting (owner decision 2026-11-12): the whole site on Render. Django serves the pages and `/api/` from one origin
  (`render.yaml`). Live at https://marvel-archive.onrender.com; every push to `main` redeploys. `vercel.json` / `.vercelignore` are left over from the earlier Vercel plan and unused.

## Structure
```
index.html          Lobby (marquee, countdown, reality doors)
mcu.html            Sacred Timeline (MCU)
spider-verse.html   Spider-Verse timeline
mutant.html         Mutant (X-Men) timeline
legacy.html         Legacy timeline (with canon status)
tracker.html        My Gauntlet (watch progress)
doomsday.html       Before Doomsday (Marvel's official pre-Doomsday watchlist)
title.html?id=...   Case file for any title (one data-driven template)
account.html        Sign in / create account / merge this browser's list / sign out
css/archive.css     Design system: tokens, masthead, shared components
css/<page>.css      Page-specific styles
css/theme-programme.css  "The Programme" theme: everything scoped under [data-theme="programme"]
js/theme.js         Loaded in every <head>: applies the saved/device theme before first paint
js/core.js          Shared: watch store, poster loader, masthead/footer, helpers
js/data/<reality>.js  Title data, one file per reality, registered on window.ARCHIVE
js/pages/<page>.js  Page behaviour
mockups/            Design mockups (V1–V5) and screenshots. Reference only, not deployed
backend/            Django project: marvel_archive/ (settings, urls), accounts/ (WatchedTitle model, JSON API, tests,
                    build_site command)
render.yaml         Render Blueprint (web service + Postgres); admin created by `manage.py ensure_admin` from env vars
.python-version     Python version for Render (match backend/.venv)
```

## Design rules
- Concept: "The Marvel Archive", printed-comic material (newsprint, ink, hard panel borders, caption boxes,
  misregistered colour, stamps). Lobby = cinema lobby, timelines = TVA-style records floor, title pages = dossier room.
- All colours come from CSS custom properties in `css/archive.css`. Phase colours = Infinity Stones
  (1 Space blue, 2 Mind yellow, 3 Reality red, 4 Power purple, 5 Time green, 6 Soul orange).
- Avoid generic "AI" patterns: no mono eyebrow labels everywhere, no rounded card grids, no blur glows.
- Must work at phone width, keep keyboard focus visible, and respect `prefers-reduced-motion`.
- Two themes share one set of markup: "The Archive" (default comic look) and "The Programme" (dark cinema programme: Bodoni Moda + Public Sans,
  hairlines, no hard shadows). Every page links `css/theme-programme.css` and `js/theme.js` in `<head>`; any new component needs
  Programme styles in that file. Do not edit Archive styles to suit the Programme theme.

## Data rules
- Each reality file declares `sections` (MCU uses `phases`, converted in core.js), `views` (order tabs),
  optional `refs` (titles from another reality shown on its timeline) and `defaultCanon`. Title ids must be unique across all files.
- Every page loads all four data files, in the order mcu, spider, mutant, legacy.
- Facts must be verifiable. If unsure of a value (runtime, story year, director), leave it out rather than guess.
- Summaries are original, one or two sentences. Wrap spoilers in `[[double brackets]]`. They render redacted until clicked.
- Release status (upcoming vs released) is computed from the `released` date at runtime. Do not hard-code it.
- Posters: each title's `wiki` field is an English Wikipedia article name (owner has permission to use posters).
  After adding or changing titles, run `python scripts/check_data.py`. It validates the data files and writes
  `js/posters.js` (article name → image URL), so browsers load images directly and never call the Wikipedia API.
  Titles without a poster show a typographic fallback.

## Account rules
- Watch list: signed out = localStorage (`marvel-archive:watched`), signed in = the account via `/api/watched`
  (core.js `saveWatched()` syncs the difference). Pages must redraw on the `watchedchange` event; `accountchange` fires on sign in/out.
- API is same-origin JSON with Django sessions + CSRF (`X-CSRFToken` header). Never disable CSRF or weaken password validation.
- Only allow-listed files are public (`backend/accounts/site_files.py`: top-level *.html, css/**, js/**). New public file types must be added there.
- Settings come from environment variables (see `backend/marvel_archive/settings.py`); never commit secrets or `.env` files.
- No password reset yet (needs an email provider; owner decision).

## Workflow
- Preview the static site only: `python -m http.server 5500` from the project root (accounts stay hidden).
- Full site with accounts: from `backend/`, set `DJANGO_DEBUG=1`, then `.venv\Scripts\python manage.py migrate` (first time)
  and `.venv\Scripts\python manage.py runserver 8610`, open http://localhost:8610 (launch config "django").
- Backend tests: `.venv\Scripts\python manage.py test accounts` (with `DJANGO_DEBUG=1`).
- Keep PROJECT_STATUS.md and CHANGELOG.md updated after milestones.
- Never commit, push or deploy without the owner's explicit approval.
