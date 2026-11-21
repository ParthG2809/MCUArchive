# Changelog

## 2026-11-21: Static-only (Vercel) readiness
- `.vercelignore` now also excludes `backend/`, `render.yaml`, `.python-version` and `.gitignore`, so a Vercel deploy no longer
  publishes the Django source.
- No site code changed (owner decision): on a static host the existing account page already reports accounts as unavailable.

## 2026-11-20: Step 10 (redesign, part 2: full cast, account/404 polish, dead CSS removed)
- Cast for the last 19 titles (now 161 of 161, 845 characters), from Wikipedia voice/cast credits, bios in our own words:
  Toei Spider-Man, Spider-Man (1981), Pryde of the X-Men, X-Men: Evolution, Wolverine and the X-Men, X-Men '97 season 2,
  The Marvel Super Heroes, Fantastic Four (1967, 1994), Iron Man (1994), The Incredible Hulk (1996), Silver Surfer,
  Iron Man: Armored Adventures, Earth's Mightiest Heroes, Avengers Assemble, Hulk and the Agents of S.M.A.S.H., Guardians of the Galaxy (2015).
  Unreleased titles list announced cast only: Avengers: Secret Wars (Robert Downey Jr. as Doctor Doom, the only casting Marvel has announced
  for it) and Spider-Man: Beyond the Spider-Verse (Moore, Steinfeld, Johnson, Schwartzman, each confirmed). Roles voiced by several actors
  name all of them ("James Avery and Dorian Harewood").
- 404 page: real `<h1>` with the shared split-weight heading and red bar, caption instead of the old stamp chip, no inline style, clearer text.
  The missing-case-file notice in `dossier.js` uses the same markup (`h1`, `.notice-actions`).
- Account page: card heading on the `--fs-h3` scale, faux-bold fixed (weight 900 -> 800, the heaviest Montserrat loaded), links underlined in
  signal red, merge notice marked in red instead of yellow (single accent), inputs 48px high like the buttons with hover/focus/invalid edges,
  labels lighter for contrast, card top-aligned with the page title. Account behaviour, CSRF and password rules unchanged.
- Dead comic-theme CSS removed: `css/archive.css` is now layout only (207 -> 80 lines; all CSS 1,486 -> 999 lines; no comic fonts, halftone, misprint shadows, stamps,
  bursts, chips); the page CSS files keep layout only; the hidden list view (`.chart`, `.row`, `.record`, index card, filters) has no styles
  left (its JS and markup stay, `timeline-deck.js` reads it). Overrides in `css/theme-deck.css` that only cancelled those styles are gone,
  as are unused tokens (`--f-head`, `--f-sign`, `--f-type`, `--manila`, `--paper-2/3`, `--ink-2`, `--red-dark`, `--doom-light`, `--hard*`, `--rule`, `--slash`).
  Verified with a computed-style and box snapshot of every rendered element on all 10 pages at 1440 and 375px: no element moved or resized.
- One deliberate hover tweak: the "Shred my records" button's hover text is #0A0A0E (was #121218 from a leftover rule), like every red button.

## 2026-11-19: Step 10 (redesign, part 1: one theme, new type, cast for the MCU)
- One design for the whole site: the Archive and Programme themes and the masthead theme switch are removed
  (`css/theme-programme.css` deleted; `js/theme.js` now always sets `data-theme="deck"` and clears old theme keys).
- Fonts: Montserrat (headings) + Inter (body) only, linked in every page; the six earlier font families are gone.
  New type-scale tokens (`--fs-hero`, `--fs-h1`, `--fs-h2`, `--fs-h3`) and every heading re-set for the wider face; label tracking reduced.
- Colour: red (`--signal`) is the single accent; phase colours only as small markers (`--mark`). Doomsday's green accent removed.
- Glass (`backdrop-filter`, with solid fallback) on the sticky masthead, the timeline stage panel and the new cast panel.
- New Cast & characters section on case files (`js/pages/dossier.js`, styles in `css/theme-deck.css`): character list + stage with
  name, actor and bio over the title's poster; keyboard arrows/Home/End. Data in `js/data/cast-<reality>.js` (loaded on title.html only).
  All four realities: 142 of 161 titles, 738 characters (MCU 64/374, Spider-Verse 25/104, Mutant 18/111, Legacy 35/149).
  Titles left without a cast section: no announced cast (Secret Wars, Beyond the Spider-Verse, X-Men '97 season 2) or credits
  not verified well enough (mostly older animated series).
- Cast bios rewritten to 2–3 sentences each (owner: no one-liners); voice-only roles marked "(voice)" and shown as "Voiced by".
- `scripts/check_data.py`: skips cast files when reading title data and validates cast ids/rows.
- Fixes: phone masthead (logo no longer pushed right), lobby door text offset, case-file pager height at tablet/phone width.
- Removed the Programme-only poster peek from `js/pages/timeline.js`. Screenshots in `mockups/screens-redesign/`.

## 2026-11-19: Deck for returning visitors
- `js/theme.js`: theme choice now saved under `marvel-archive:theme-v2`; the old key is ignored and removed, so visitors who had
  picked Archive or Programme before also start on Command Deck. Choices made from now on are remembered. Watch lists unaffected.

## 2026-11-19: Step 9 (synopses and typography)
- All 161 `summary` fields rewritten as original premise-only synopses (2–4 sentences, no endings or twists, no `[[ ]]` markup).
  Before Doomsday notes in `js/pages/doomsday.js` rewritten without spoilers.
- Redaction removed: `renderSpoilers` deleted from `js/core.js`; summaries rendered with `escapeHTML`; reveal handlers removed from
  `dossier.js`, `doomsday.js`, `timeline-deck.js`; `.redact` CSS removed; case-file label is now "Synopsis"; MCU intro no longer mentions blacked-out spoilers.
- Typography: Deck labels 12px with .12em tracking (was 11px/.16–.18em), `--text-3` lightened to #8F8D99 for 4.5:1 contrast on raised panels,
  body copy 15–18px at 1.55–1.7 line height, display titles .86–.95. Archive and Programme card/summary sizes and line heights adjusted.
- Deck stage body scrolls inside the fixed-height deck on desktop if a synopsis runs long.
- Archive timeline cards at phone width: poster floats so text uses the full card width; fixes long titles pushing cards past the screen edge.
- Screenshots in `mockups/screens-typography/`.

## 2026-11-19: Step 8 (Command Deck becomes the main theme)
- New `css/theme-deck.css` and `js/pages/timeline-deck.js`; linked on every page / every timeline page.
- `js/theme.js`: themes deck / archive / programme, Deck default for new visitors; theme fonts load per theme.
- `js/core.js`: switch gains "Deck" (first). `index.html` + `js/pages/lobby.js`: Deck-only stats band.
- Screenshots in `mockups/screens-deck-theme/`.

## 2026-11-18: Mockup V6 "Command Deck"
- New design proposal in `mockups/v6-deck/` (deck.css, deck.js, system.html, index.html, mcu.html, screens/). Live site unchanged.

## 2026-11-12: Step 7 (live)
- Deployed to Render: https://marvel-archive.onrender.com.
- `.gitignore`: ignores `.secrets/` (local generated credentials).
- First commit rewritten without the Claude co-author line (owner request); future commits carry no attribution trailer.

## 2026-11-12: Development step 6 (deploy preparation)
- `manage.py ensure_admin`: creates the admin from DJANGO_ADMIN_USERNAME / DJANGO_ADMIN_PASSWORD on deploy (Render free plan has no shell); never overwrites an existing admin. 2 new tests (16 total).
- `render.yaml`: runs ensure_admin; asks for the two admin values on setup (`sync: false`, never stored in the repository).
- `.python-version` (3.13) so Render uses the same Python as local development.
- Settings: `X-Frame-Options: DENY` added to pages served by WhiteNoise; `DJANGO_SSL_REDIRECT=0` switch for local production-mode tests only.
- `.gitignore`: also ignores `.claude/`. Git repository initialised on `main` (no commits yet).

## 2026-11-12: Development step 5 (accounts)
- Owner decisions: whole site hosted on Render (Django serves pages + API), packages approved, no password reset in v1.
- New `backend/` Django 5.2 project (`marvel_archive`) with an `accounts` app: `WatchedTitle` model (+ migration 0001),
  JSON API `/api/me|signup|login|logout|watched` (session cookie + CSRF, password validators, login throttle, id validation),
  JSON CSRF-failure view, admin registration, 14 tests, and `manage.py build_site` (copies only allow-listed public files to `backend/public/`).
- Dependencies (new, in `backend/.venv`): Django 5.2.19, gunicorn 23.0.0, whitenoise 6.12.0, dj-database-url 3.1.2, psycopg[binary] 3.3.8.
- New `render.yaml` (web service + Postgres; not deployed) and root `.gitignore` (venv, database, build output, env files).
- New page `account.html` with `css/account.css` and `js/pages/account.js`; Programme styles added to `css/theme-programme.css`.
- `js/core.js`: account layer (API helper, sync of watch-list changes, account cache, merge of the browser list, `watchedchange` /
  `accountchange` events, status notice) and a masthead "Sign in" / username link. Without the backend, behaviour is unchanged.
- Timeline, Doomsday, case file and My Gauntlet redraw when the account list arrives; My Gauntlet explains where progress is saved.
- `css/archive.css`: `.mast-tools` group (account link + theme switch) and `.site-notice`.
- `.claude/launch.json`: "django" dev server on port 8610.

## 2026-11-12: Development step 4 (themes)
- Theme switch: the site now has two themes, **The Archive** (existing comic design) and **The Programme** (dark cinema design from mockup V5).
  Toggle in the masthead; choice saved in `localStorage` (`marvel-archive:theme`); first visit follows the device's dark/light setting.
- New `js/theme.js` (loaded in every page `<head>`, applies the theme before first paint and loads Bodoni Moda / Public Sans only when needed).
- New `css/theme-programme.css`: token remap plus restyles for the masthead, lobby, timelines, case file, My Gauntlet, Before Doomsday and 404, all scoped under `[data-theme="programme"]`.
- `js/core.js`: theme switch in the masthead (`THEMES`, `setupThemeSwitch`). `js/pages/timeline.js`: hover poster preview (Programme only, mouse/trackpad) and a tooltip on the watch button, which the Programme theme draws as a ticket punch.
- `css/archive.css`: switch styles; nav wraps to its own row below 1500px (was 1300px); on phones the switch sits beside the 616 box.
- Screenshots in `mockups/screens-themes/`.

## 2026-11-12: Development step 3
- New page `doomsday.html` (Before Doomsday) with `css/doomsday.css` and `js/pages/doomsday.js`: Marvel's official 15-title
  "Countdown to Avengers: Doomsday" list, countdown, briefing progress, release-order list with original notes and spoilers.
- Nav: new "Doomsday" item. Masthead nav padding/gap tightened and nav wraps to its own row below 1300px (was 1120px).
- New colour tokens `--doom` / `--doom-light` in `css/archive.css`.
- Design proposal: mockup V5 "The Programme" in `mockups/v5-programme/` (reads the real data; not deployed).
- `.claude/launch.json`: added a whole-site preview server (port 5610).

## 2026-11-12: Development step 2
- New realities: `js/data/spider.js` (28 titles), `js/data/mutant.js` (22), `js/data/legacy.js` (46). The archive now holds 161 titles.
- New pages: `spider-verse.html`, `mutant.html`, `legacy.html` (with signature diagrams/canon key) and `tracker.html` (My Gauntlet).
- Timeline generalised: realities define `sections`, `views` and cross-reality `refs`; format filters adapt to each reality.
- Canon status (`confirmed` / `recognised` / `disputed` / `separate`) shown as tags and case-file stamps.
- Case files: section stamps for non-MCU titles, "Also filed in" computed from cross-references (replaces the `alsoIn` field).
- Lobby doors unsealed with live counts; copy updated to cover 1944 onward; all nav items live.
- `scripts/check_data.py`: cross-reality id/ref checks, polite retries, incremental poster resolution, lobby art posters.
- Fixes: tracker gem fill, Spider-Verse diagram label overlap.

## 2026-11-12: Development step 1
- Project set up as a static multi-page site (HTML/CSS/vanilla JS + GSAP from CDN), ready for Vercel (`vercel.json`, `.vercelignore`).
- Design system moved from mockup V4 into `css/archive.css`, with page styles in `css/lobby.css`, `css/timeline.css`, `css/dossier.css`.
- Full MCU dataset (`js/data/mcu.js`): 65 films, series and specials, Phase One to Phase Six, with release dates, story order, original spoiler-guarded summaries and connections.
- Poster pipeline: `scripts/check_data.py` validates the data and resolves poster URLs from Wikipedia into `js/posters.js`, so visitors' browsers never call the Wikipedia API.
- Pages: Lobby (`index.html`), Sacred Timeline (`mcu.html`), data-driven case file (`title.html?id=`), `404.html`.
- Timeline features: release/story order with animated re-filing, format filters (films, series, animated, specials), hide-watched, phase index, upcoming titles detected from today's date.
- Case-file features: click-to-reveal spoilers, connections, watch-order neighbours, "stamp as watched", missing-file state.
- Watch progress saved in the browser (localStorage) and shown in the gauntlet badge on every page.

## 2026-11-11 to 11-12: Design exploration
- Mockups V1 (Nexus), V2 (TVA), V3 (S.H.I.E.L.D.) and the combined V4 "Marvel Archive", stored in `mockups/`. V4 approved for development.
