# Project status: The Marvel Archive

_Last updated: 2026-11-20 (step 10, part 2: full cast, account/404 polish, dead CSS removed)_

**Live site:** https://marvel-archive.onrender.com (Render free plan, Blueprint `marvel-archive`, deploys automatically from `main`).

## Objective
A frontend-only, multi-page fan site cataloguing every Marvel film and series on four timelines (MCU, Spider-Verse,
Mutant/X-Men, Legacy), with release/story order, case files with spoiler-free synopses and a personal watch tracker. Deployed on Render.

## Architecture
Static HTML pages + shared `css/archive.css` design system + `js/core.js` + one data file per reality in `js/data/`.
Every page loads all four data files (cross-references and connections span realities).
`js/pages/timeline.js` is one generic timeline used by all four reality pages; each reality declares its own
`sections` (phases / film series / lanes), `views` (order tabs) and optional `refs` (titles borrowed from another reality).
Posters are pre-resolved into `js/posters.js` by `scripts/check_data.py`. See CLAUDE.md for rules.
One design ("Command Deck"): `js/theme.js` (loaded in every `<head>`) sets `<html data-theme="deck">`; `css/archive.css` and the page CSS
files hold layout only, and `css/theme-deck.css` holds every colour/type/shape token and the look of every component.
(The Archive and Programme themes described in older entries below were removed in step 10.)

## Implemented
| Page | Content |
|---|---|
| `index.html` Lobby | Data-driven marquee + countdown (next film), now-streaming ticket, four reality doors with live counts, archive facts |
| `mcu.html` | 65 MCU titles, Phase 1–6, release/story order |
| `spider-verse.html` | 28 own titles + 7 MCU Holland cross-refs; Raimi, Webb, Spider-Verse animation, Sony's universe, live-action and animated TV; converging-strands diagram |
| `mutant.html` | 22 own titles + Deadpool & Wolverine cross-ref; Fox films, spin-offs, Legion, The Gifted, X-Men animation; Days of Future Past split diagram |
| `legacy.html` | 46 own titles + Born Again cross-refs; early adaptations, Blade, 2000s films, Marvel Television, Netflix, animation; canon key and canon tags |
| `title.html?id=` | Case file for any title: section/phase + canon stamps, "also filed in", connections, watch order, spoiler reveal |
| `tracker.html` My Gauntlet | Overall score, six Infinity Stones (one per MCU phase), progress per reality, "up next" per timeline, reset |
| `doomsday.html` Before Doomsday | Marvel's official 15-title pre-Doomsday list (Disney+, Aug 2026) in release order, countdown, briefing progress (Loki = both seasons), spoiler-guarded notes, stamp watched |
| `404.html` | Not-found page |
| `account.html` Accounts | Create account (username + password), sign in/out, watch list saved to the account and synced on every page, one-click merge of the titles watched in this browser before signing in. Masthead shows "Sign in" / the username when the backend is present |
| Theme switch (every page) | Masthead toggle between **The Archive** (printed comic, default on light devices) and **The Programme** (dark cinema programme from mockup V5, default on dark devices). Choice saved per browser. Programme adds a hover poster preview and "ticket punch" watch buttons on the timelines |

Total: 161 titles (158 released as of 2026-11-12).

## Verified (2026-11-12, local server; desktop and 375px phone width)
- `scripts/check_data.py`: 161 titles, ids unique across realities, all refs valid, MCU story order complete.
  156/161 posters resolved; no Wikipedia poster for *The Incredible Hulk* (1977), *Blade: The Series*, *The Gifted*,
  *Wonder Man*, *Avengers: Secret Wars*, so these show the typographic fallback.
- All 7 pages load with no console errors. Row/section counts match the data.
- Cross-references show "From MCU"; Legacy canon tags render; case files show the right stamps and "Also filed in".
- Tracker: phase completion claims a stone; progress bars and "up next" update after marking titles; watched state persists across pages.
- Animations were fast-forwarded during automated testing (browser pane hidden), so live motion still needs a human look.

## Verified (2026-11-12, step 3)
- `doomsday.html`: 15 entries render, no console errors, countdown and viewing time (about 32 hours of film + 12 Loki episodes) computed from data.
  Stamping Loki marks both seasons; progress, badge and other pages share the same watch store. Spoiler reveal works. Desktop (1280/1440) and 375px phone checked.
- Masthead with the new "Doomsday" nav item keeps the logo on two lines at 1440px; nav moves to its own row below 1300px.
- Mockup V5 "The Programme" (`mockups/v5-programme/`) checked at desktop and phone width. It is a proposal only; the live design is unchanged.

## Verified (2026-11-12, step 4: themes)
- Programme theme checked on Lobby, Sacred Timeline (release + story order, punch toggle, poster peek), case file, My Gauntlet and Before Doomsday at 1280/1440px, and Lobby, timeline and case file at 375px.
- Switching themes in the masthead applies instantly and persists after reload; with no saved choice, the theme follows the device's dark/light setting. Programme fonts load only when that theme is used.
- Archive theme looks as before. The masthead nav now moves to its own row below 1500px (was 1300px) so the logo stays on one line next to the switch; on phones the switch sits beside the 616 box.
- Not yet screenshot-checked in Programme: Spider-Verse, Mutant and Legacy pages (same timeline code and CSS as the MCU page), 404, and the case file's Connections/Watch order tabs.
- In the hidden preview pane, lazy-loaded posters sometimes wait to load (seen on the case file); they load normally when the page is visible. Not a theme issue.

## Verified (2026-11-12, step 5: accounts, Django dev server on port 8610)
- `manage.py test accounts`: 14 tests pass (sign up/in/out, CSRF enforced, weak passwords and bad usernames rejected, login throttle,
  watch list add/remove/clear, lists private per member, invalid ids rejected, private files such as `backend/db.sqlite3` and `CLAUDE.md` not served).
- `manage.py check --deploy` with production settings: only the two HSTS subdomain/preload notices, left off on purpose for a shared onrender.com address.
  Without `DJANGO_SECRET_KEY` the server refuses to start in production mode.
- In the browser: wrong password and weak password show clear errors; sign-up signs in and offers to merge 2 browser titles; merged list saved;
  marking on the timeline and Loki (both seasons) on Doomsday saved to the account; sign out returns to the (empty) browser list; signing in again
  with different capitalisation restores all 5 titles. Archive and Programme themes checked at 1280px and 375px. No server errors.
- `manage.py build_site` copies only the 32 public files. The test account and test data were deleted afterwards.
- Not tested: real deployment on Render with Postgres (not deployed), and behaviour across two real devices at once.

## Verified (2026-11-12, step 6: deploy preparation)
- The Render build steps ran in production mode (DEBUG off, real secret key, throwaway SQLite database): collectstatic, build_site
  (32 public files), migrate and ensure_admin (creates the admin once, leaves it unchanged on the next run).
- Production-mode server: pages, CSS/JS, `/api/me`, admin login and admin assets return 200; `CLAUDE.md`, `backend/db.sqlite3`,
  `render.yaml`, mockups and unknown pages return the site's 404 page; unknown Host headers are rejected (400);
  sign-up + watch list round trip works with CSRF; a POST without a CSRF token is refused.
- Every page now carries `X-Frame-Options: DENY` (pages served by WhiteNoise were missing it; fixed).
- Backend tests: 16 pass. Throwaway build output and test database were deleted.
- Git repository initialised (branch `main`); nothing committed yet. 103 files would be committed (about 1.7 MB);
  `.venv`, the local database, build output, `.env` files and `.claude/` are ignored. Secret scan clean.

## Verified (2026-11-12, step 7: live site)
- https://marvel-archive.onrender.com: pages, CSS/JS, `/api/me` and `/admin/login/` return 200; `CLAUDE.md`, `backend/db.sqlite3` and
  `render.yaml` return 404; http redirects to https; HSTS and `X-Frame-Options: DENY` present.
- Not checked on the live site: signing up / saving a watch list and the admin login (no test accounts are created on the production site;
  the owner should try both once).

## Design proposal (2026-11-18): mockup V6 "Command Deck"
- `mockups/v6-deck/`: `system.html` (design system: principles, colour, type, shape, components, power-colour demo),
  `index.html` (lobby) and `mcu.html` (timeline as a thumbnail rail + stage + vertical phase tabs). Reads the real data; mockup only.
- Inspired by four owner-supplied references (cast-selector rail, slashed landing sections, condensed villain type). Left out on purpose:
  gambling content and a DC character in one reference, and blur glows / rounded glass (project design rules).
- Fonts: Big Shoulders Display + Barlow (Google Fonts). Checked at 1440px and 375px; no horizontal scroll; screenshots in `mockups/v6-deck/screens/`.
- Decided 2026-11-19: V6 is now the main theme (see step 8 below).

## Step 8 (2026-11-19): Command Deck is the main theme (local only; not committed or deployed)
- Owner decisions: Deck is the default for every first-time visitor; Archive and Programme stay in the switch; timelines get the
  full rail + stage layout. Visitors who already picked a theme keep it.
- New `css/theme-deck.css` (all pages) and `js/pages/timeline-deck.js` (deck timeline for MCU, Spider-Verse, Mutant, Legacy).
  `js/theme.js` now has three themes, Deck as default, fonts per theme. Lobby has a Deck-only stats band (computed from data).
- Verified at 1440px and 375px in the Deck theme: lobby, all four timelines (Sacred Timeline and Spider-Verse clicked through),
  case file, My Gauntlet, Doomsday, account (on the Django server) and 404. No horizontal scroll on phones.
  Switching themes swaps deck and list views and keeps the watched list in sync. Archive and Programme unchanged. Backend tests: 16 pass.
- Not yet checked: Mutant and Legacy decks clicked through by hand (same code as Spider-Verse), keyboard-only use of the deck
  beyond ↑/↓, live motion with the browser visible (animations were fast-forwarded in testing).
- The followed-device default (dark → Programme) was replaced by the Deck default.

## Known limitations / decisions
- Story order exists only for the MCU. Other realities offer "by series/lane" and release order.
- Story-order positions for Phase 4–6 follow common viewing guides; many later titles say "Post-Blip" instead of a year.
- Values not confirmed are left out on purpose (e.g. *Brand New Day* runtime, some TV directors).
- Not yet included (dates/details not verified): 1989 *The Punisher*, 1990 *Captain America*, the unreleased 1994 *Fantastic Four*,
  the 2011 Marvel Anime series, *Spider-Man: Beyond the Spider-Verse* crew, a few minor animated series.
- Diagram labels on the Spider-Verse/Mutant pages are small at phone width (readable, but could be enlarged).
- Masthead/footer are injected by JavaScript; `title.html?id=` is one template, so titles are not separately indexed by search engines.
- Before Doomsday order: published copies of Marvel's list agree on the 15 titles but not on the order of entries 10–13, so the page uses release order and says so. The "why it matters" notes only name cast confirmed for Doomsday.
- Nav label is "Doomsday" (not "Before Doomsday") so the masthead fits; the page title is "Before Doomsday".
- On phones the logo sits below the 616 corner box (existing masthead behaviour, unchanged).
- Programme theme keeps the case-file page (no side drawer from the mockup), so links and shared URLs work the same in both themes.
- The Programme theme is CSS-only apart from the poster peek in `timeline.js`; the Archive page CSS was not edited for it except the masthead switch styles.
- Accounts (owner decisions 2026-11-12): whole site on Render, packages approved, password reset left out of v1 (no email provider yet).
  A member who forgets their password cannot recover the account yet (the owner can reset it in /admin/).
- Login throttle (10 failures per username per 15 minutes) is kept in memory per server process; it resets on restart.
  There is no sign-up captcha.
- Render free tier: the web service sleeps after ~15 minutes idle (first visit then takes a while), and free Postgres databases expire after
  a limited period. A paid plan avoids both. Check Render's current terms before deploying.
- The theme preference is still per browser, not saved to the account.
- When the site is served without Django (e.g. `python -m http.server`), the account link stays hidden and everything works per browser as before.
- Static-only deploy (e.g. Vercel, 2026-11-21): works without Django, no code changes; `.vercelignore` keeps `backend/`, `render.yaml` and
  tooling files out of the upload. Accounts are off there (Sign in link hidden; `account.html` says accounts aren't available right now).
  Owner decision: no site-code changes for Vercel.
- Deployed on Vercel 2026-11-22 (Hobby, static, no accounts): https://the-mcu-archive.vercel.app (old mcu-archive-six.vercel.app redirects).
  Project settings: root `./`, preset Other, output `.`, no build/install. Checked: pages 200; /backend/*, render.yaml, /api/me 404.
  Render (with accounts) stays live too; every push to `main` redeploys both.
- Link previews (2026-11-22): one card for the whole site; `title.html?id=` links show the generic card, not the title's poster
  (previewers don't run JavaScript; per-title previews would need a page per title). og:image uses the Vercel address on both hosts.
- Phone masthead (2026-11-22): the badge scrolls away with the masthead (the masthead is not sticky below 900px); on Render the
  Sign in link and badge add a row on phones. At 320px the menu takes three rows.
- Git: `main` on GitHub (ParthG2809/MCUArchive). The first commit was rewritten (owner request) to remove a Claude co-author line; it is now 4a1f9db.
- Deployed on Render 2026-11-12 (free web service + free Postgres). Free-plan limits apply: sleeps after ~15 min idle; free database expires after a limited period.

## Next steps
1. Owner reviews the two themes (screenshots in `mockups/screens-themes/`).
2. Deploy to Render (each step needs the owner's approval): first commit; create an empty private GitHub repository and push;
   in Render, New > Blueprint > pick the repository (uses `render.yaml`), enter DJANGO_ADMIN_USERNAME / DJANGO_ADMIN_PASSWORD when asked.
   Decide free vs paid plan first. After the first deploy, check the site, sign-up and /admin/ on the onrender.com address.
   Optional later: password reset by email, saving the theme to the account.
3. Optional: J.A.R.V.I.S. search (Ctrl+K), character threads, more legacy titles from the list above.

## Verified (2026-11-19, step 9: synopses and typography)
- `scripts/check_data.py`: 161 titles, 0 structure or cross-reality problems; `js/posters.js` unchanged. Backend tests: 16 pass.
- All 161 synopses are premise-only (no endings), no `[[ ]]` markup and no `.redact` elements left on any page.
- Static preview (port 5610): lobby, MCU timeline (Deck stage and list view) and case file checked in Deck, Archive and Programme at 1440px and 375px.
  No horizontal scroll, no console errors (only the expected `/api/me` 404 on the static server). Screenshots in `mockups/screens-typography/`.
- Synopses for titles released after the archive's research cut-off (Spider-Man: Brand New Day, VisionQuest, X-Men '97 season 2, Spider-Noir)
  and unreleased titles describe only the announced premise and cast.
- Theme reset (2026-11-19): with an old saved choice (`programme`) the site opens in Deck and clears the old key; picking Archive afterwards persists across pages. No console errors.

## Step 10 (2026-11-19/20): redesign
- Part 1 (committed and deployed as ed3c404): single theme, Montserrat + Inter, single red accent, glass over artwork, Cast section.
- Part 2 (2026-11-20, local only; not committed or deployed):
  - Cast for all 161 titles (845 characters). `check_data.py --offline`: 0 problems. Unreleased titles list only announced cast:
    Avengers: Secret Wars has one entry (Robert Downey Jr. as Doctor Doom), Beyond the Spider-Verse four.
  - Account and 404 polished (see CHANGELOG). Checked on the Django dev server: wrong/empty input errors, focus, sign-up, merge of
    2 browser titles, sign-out; the throwaway test account and its 2 rows were deleted afterwards. Unknown URLs return the new 404 page.
  - Dead comic-theme CSS removed. `css/archive.css` and the page CSS files hold layout only; `css/theme-deck.css` holds every token and the look.
    Verified by a computed-style + box snapshot of every rendered element on all 10 pages (lobby, 4 timelines, case file, My Gauntlet,
    Before Doomsday, account, 404) at 1440 and 375px before and after: no element moved or resized; the remaining computed differences are
    on hidden or statically positioned elements only. Hover/press states were checked by reading the rules, not in the browser.
  - All pages at 768px: no horizontal scroll. Backend tests: 16 pass. Screenshots: `mockups/screens-redesign/account-*`, `404-*`.
- Known leftovers (not changed, visible behaviour kept): the "done" number on Before Doomsday rows is green (`--doom`), a remnant of the old
  green accent; a full Infinity Stone glows (`drop-shadow`) on My Gauntlet; `lobby.js` and `dossier.js` still start GSAP motions that CSS
  blocks with `transform: none !important` (lobby doors, case-file poster); the `misprint` class is still in some markup but has no style.
