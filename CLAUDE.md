# The Marvel Archive: project instructions

A multi-page fan website (static frontend + small Django account backend) that catalogues every Marvel film and series on four timelines ("realities"):
MCU (Sacred Timeline), Spider-Verse, Mutant (X-Men) and Legacy (everything else: Blade, Fox Fantastic Four, Netflix, ABC/Hulu shows…).
Marvel-only. No DC or other franchises.

## Stack (fixed. Do not change without the owner's approval)
- Frontend: plain HTML, CSS and vanilla JavaScript. No frameworks, no Node/npm, no build step.
- GSAP 3.12.5 (+ Flip plugin) loaded from cdnjs. The only third-party frontend library.
- Backend (accounts only): Django 5.2 LTS in `backend/`, with gunicorn, whitenoise, dj-database-url, psycopg
  (pinned in `backend/requirements.txt`, installed in `backend/.venv`). SQLite locally, Postgres on Render.
- Fonts from Google Fonts, exactly two (owner decision 2026-11-19): Montserrat (headings, 600/700/800) and Inter (everything else,
  400–700). Linked in every page `<head>`. Do not add other fonts.
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
css/archive.css     Structural base: layout of the masthead and shared components (no colours or fonts)
css/<page>.css      Page-specific layout only
css/theme-deck.css  The site design ("Command Deck"): all tokens (colour, type scale, shape), the look of every component, glass,
                    cast section; scoped under [data-theme="deck"]
js/theme.js         Loaded in every <head>: sets <html data-theme="deck"> before first paint (and clears old theme keys)
js/core.js          Shared: watch store, poster loader, masthead/footer, helpers
js/data/<reality>.js  Title data, one file per reality, registered on window.ARCHIVE
js/data/cast-<reality>.js  Cast & characters per title (window.ARCHIVE_CAST), loaded only by title.html
js/pages/<page>.js  Page behaviour (timeline-deck.js builds the Deck theme's rail + stage timeline)
mockups/            Design mockups (V1–V6, V6 is now the Deck theme) and screenshots. Reference only, not deployed
backend/            Django project: marvel_archive/ (settings, urls), accounts/ (WatchedTitle model, JSON API, tests,
                    build_site command)
render.yaml         Render Blueprint (web service + Postgres); admin created by `manage.py ensure_admin` from env vars
.python-version     Python version for Render (match backend/.venv)
```

## Design rules
- One design for the whole site (owner decision 2026-11-19): "Command Deck", graphite + fine dot grid, chamfered panels,
  big uppercase Montserrat headings, Inter body text. The Archive (comic) and Programme themes and the theme switch were removed.
  `css/archive.css` and the page CSS files are layout only; colours, fonts and decoration go in `css/theme-deck.css` (since the comic-theme
  leftovers were removed on 2026-11-20).
- Colour: near-black surfaces, white/grey text, one accent (`--signal` red, also `--power`). Phase/Infinity Stone colours
  (1 Space blue, 2 Mind yellow, 3 Reality red, 4 Power purple, 5 Time green, 6 Soul orange) only as small markers
  (`--mark`, `--c`, `--stone`): dots, diamonds, thin stripes, the stones. Never as large fills. Text contrast at least 4.5:1.
- Type scale tokens in `css/theme-deck.css` (`--fs-hero`, `--fs-h1`, `--fs-h2`, `--fs-h3`); body 16–17px, line-height 1.55–1.7;
  labels Inter 600 12px, uppercase, letter-spacing about .08em. No thin weights.
- Glass (frosted `backdrop-filter`) only over artwork: the sticky masthead, the timeline stage panel, the cast panel
  (class `glass`). Always inside `@supports`, with a solid fallback. Not on plain cards.
- Avoid generic "AI" patterns: no mono eyebrow labels everywhere, no rounded card grids, no decorative glows.
- Must work at phone width, keep keyboard focus visible, and respect `prefers-reduced-motion`.
- Every page links the two fonts, `css/archive.css`, its page CSS, `css/theme-deck.css` and `js/theme.js` in `<head>`.
- Timelines use the rail + stage layout from `js/pages/timeline-deck.js`. The old list view (`timeline.js`) is hidden and unstyled but still
  renders the data the deck reads; redraw on `watchedchange`.

## Data rules
- Each reality file declares `sections` (MCU uses `phases`, converted in core.js), `views` (order tabs),
  optional `refs` (titles from another reality shown on its timeline) and `defaultCanon`. Title ids must be unique across all files.
- Every page loads all four data files, in the order mcu, spider, mutant, legacy.
- Facts must be verifiable. If unsure of a value (runtime, story year, director), leave it out rather than guess.
- Summaries are original synopses in our own words, 2–4 sentences: the premise, main characters and stakes, never the ending or
  twists (owner decision 2026-11-19: synopsis, not a full plot recap). No spoiler markup or redaction; unreleased titles describe only
  the officially announced premise. Before Doomsday `why` notes follow the same no-spoiler rule.
- Cast (owner decision 2026-11-19): `js/data/cast-<reality>.js`, title id -> `[character, actor, bio]`, 4–8 main characters,
  original 2–3 sentence bios about the character's role, no endings (owner: never a one-liner). Voice-only roles in live-action
  titles carry "(voice)" after the actor's name; the case file then shows "Voiced by". Verifiable credits only; unreleased titles list announced cast
  only; leave a title out if unsure. No actor/character photos (no rights); the stage uses the title's poster.
  `scripts/check_data.py` validates cast ids and rows.
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
