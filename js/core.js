/* =========================================================
   The Marvel Archive: shared core (loaded on every page)
   Requires: js/data/*.js (window.ARCHIVE) and js/posters.js (window.ARCHIVE_POSTERS)
   ========================================================= */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- navigation ---------- */
const NAV = [
  { key: "lobby",   label: "Lobby",           href: "index.html" },
  { key: "mcu",     label: "Sacred Timeline", href: "mcu.html" },
  { key: "spider",  label: "Spider-Verse",    href: "spider-verse.html" },
  { key: "mutant",  label: "Mutant",          href: "mutant.html" },
  { key: "legacy",  label: "Legacy",          href: "legacy.html" },
  { key: "doomsday", label: "Doomsday",       href: "doomsday.html" },
  { key: "tracker", label: "My Gauntlet",     href: "tracker.html" },
];

/* ---------- canon status ---------- */
const CANON = {
  confirmed:  { label: "Canon · Confirmed",       short: "MCU canon" },
  recognised: { label: "On the official MCU timeline", short: "Added to MCU timeline" },
  disputed:   { label: "Canon · Disputed",        short: "Canon disputed" },
  separate:   { label: "Separate continuity",     short: "Own continuity" },
};

/* ---------- data ---------- */
const REALITIES = window.ARCHIVE.realities;

// MCU-style realities define `phases`; turn them into the generic `sections` shape.
Object.values(REALITIES).forEach((reality) => {
  if (!reality.sections && reality.phases) {
    reality.sections = Object.fromEntries(Object.entries(reality.phases).map(([n, p]) => [n, {
      label: `Phase ${p.word}`, sub: `${p.stone} Stone · ${p.span}`, color: `var(--stone-${n})`, stone: p.stone,
    }]));
  }
});

// Every title, tagged with its home reality, section and release-order file number.
const ALL_TITLES = Object.values(REALITIES).flatMap((reality) =>
  [...reality.titles]
    .sort((a, b) => a.released.localeCompare(b.released))
    .map((t, i) => Object.assign(t, {
      reality: reality.key,
      section: String(t.section ?? t.phase),
      fileNo: String(i + 1).padStart(4, "0"),
    }))
);

const titleById = (id) => ALL_TITLES.find((t) => t.id === id) || null;

/* Everything listed on a reality's timeline: its own titles plus cross-references
   to titles that live in another reality (e.g. MCU Spider-Man films in the Spider-Verse). */
function entriesOf(reality) {
  const own = reality.titles.map((t) => ({ t, section: t.section, ref: false }));
  const refs = (reality.refs || [])
    .map((r) => ({ t: titleById(r.id), section: String(r.section), ref: true }))
    .filter((e) => e.t);
  return [...own, ...refs];
}

const sectionOf = (t) => REALITIES[t.reality].sections?.[t.section];
const canonOf = (t) => t.canon || REALITIES[t.reality].defaultCanon || null;

function isReleased(t, now = new Date()) {
  return new Date(t.released + "T00:00:00") <= now;
}

const releaseYear = (t) => t.released.slice(0, 4);

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- posters ---------- */
function posterHTML(t, { decorative = true } = {}) {
  const alt = decorative ? "" : `${escapeHTML(t.title)} poster`;
  return `<div class="poster" data-poster>
    <img alt="${alt}" data-wiki="${escapeHTML(t.wiki)}" loading="lazy" decoding="async">
    <div class="fallback">${escapeHTML(t.title)}</div>
  </div>`;
}

// Fill <img data-wiki> from the pre-resolved poster map. Missing posters keep the typographic fallback.
function hydratePosters(root = document) {
  const map = window.ARCHIVE_POSTERS || {};
  root.querySelectorAll("img[data-wiki]:not([src])").forEach((img) => {
    const src = map[img.dataset.wiki];
    if (!src) return;
    img.addEventListener("load", () => img.closest("[data-poster]")?.classList.add("has-poster"), { once: true });
    img.src = src;
  });
}

/* ---------- watch tracking ----------
   Signed out: the list lives in this browser (localStorage, WATCH_KEY), exactly as before accounts existed.
   Signed in:  the list lives in the account (Django API under /api/). A copy is cached in ACCOUNT_KEY so pages
               draw the right list immediately, then it is refreshed from the server.
   When the site is served without the backend (e.g. `python -m http.server`), accounts simply stay hidden.
   Pages listen for "watchedchange" (list replaced) and "accountchange" (signed in/out) on document. */
const WATCH_KEY = "marvel-archive:watched";
const ACCOUNT_KEY = "marvel-archive:account";

function readStored(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function writeStored(key, value) {
  try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

const account = { available: false, user: null };
const cachedAccount = readStored(ACCOUNT_KEY, null);
if (cachedAccount?.username) account.user = cachedAccount.username;
const watched = new Set(account.user ? cachedAccount.ids || [] : readStored(WATCH_KEY, []));
let syncedIds = new Set(account.user ? watched : []); // what the server is known to hold

function saveWatched() {
  if (account.user) {
    writeStored(ACCOUNT_KEY, { username: account.user, ids: [...watched] });
    queueAccountSync();
  } else {
    writeStored(WATCH_KEY, [...watched]);
  }
  renderBadge();
}

function toggleWatched(id) {
  watched.has(id) ? watched.delete(id) : watched.add(id);
  saveWatched();
  return watched.has(id);
}

/* ---------- accounts (Django API) ---------- */
function csrfToken() {
  return document.cookie.split("; ").find((c) => c.startsWith("csrftoken="))?.split("=")[1] || "";
}

async function api(path, body) {
  const options = { credentials: "same-origin", headers: { Accept: "application/json" } };
  if (body !== undefined) {
    options.method = "POST";
    options.headers["Content-Type"] = "application/json";
    options.headers["X-CSRFToken"] = csrfToken();
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`/api/${path}`, options);
  const isJSON = (response.headers.get("content-type") || "").includes("application/json");
  const data = isJSON ? await response.json() : {};
  if (!response.ok || !isJSON) {
    throw Object.assign(new Error(data.error || "Something went wrong. Please try again."), { status: response.status, field: data.field });
  }
  return data;
}

const emit = (name) => document.dispatchEvent(new CustomEvent(name));

// Replace the in-memory list (after sign-in, sign-out or a server refresh) and tell the page.
function replaceWatched(ids) {
  const next = new Set(ids);
  const same = next.size === watched.size && [...next].every((id) => watched.has(id));
  watched.clear();
  next.forEach((id) => watched.add(id));
  renderBadge();
  if (!same) emit("watchedchange");
}

async function refreshAccountList() {
  const { ids } = await api("watched");
  syncedIds = new Set(ids);
  writeStored(ACCOUNT_KEY, { username: account.user, ids });
  replaceWatched(ids);
}

// Send local changes to the account one request at a time; each request sends the difference
// between the local list and what the server last confirmed, so rapid clicks are batched.
let syncChain = Promise.resolve();
function queueAccountSync() {
  syncChain = syncChain.then(async () => {
    if (!account.user) return;
    const add = [...watched].filter((id) => !syncedIds.has(id));
    const remove = [...syncedIds].filter((id) => !watched.has(id));
    if (!add.length && !remove.length) return;
    try {
      const body = watched.size === 0 ? { clear: true } : { add: add.slice(0, 500), remove: remove.slice(0, 500) };
      syncedIds = new Set((await api("watched", body)).ids);
      if (add.length > 500 || remove.length > 500) queueAccountSync();
    } catch (error) {
      showNotice(error.status === 401 ? "You were signed out. Sign in again to save your progress." : "Couldn't save to your account. Your last change was undone.");
      if (error.status === 401) signedOut(); else refreshAccountList().catch(() => {});
    }
  });
  return syncChain;
}

function signedIn(username) {
  account.user = username;
  emit("accountchange");
  return refreshAccountList();
}

function signedOut() {
  account.user = null;
  syncedIds = new Set();
  writeStored(ACCOUNT_KEY, null);
  replaceWatched(readStored(WATCH_KEY, []));
  emit("accountchange");
}

const accountActions = {
  async signIn(username, password) { const me = await api("login", { username, password }); await signedIn(me.username); },
  async signUp(username, password) { const me = await api("signup", { username, password }); await signedIn(me.username); },
  async signOut() { await syncChain; await api("logout", {}); signedOut(); },
  // Titles marked watched in this browser (while signed out) that the account doesn't have yet.
  guestOnlyIds: () => readStored(WATCH_KEY, []).filter((id) => !watched.has(id) && titleById(id)),
  async mergeGuestList() {
    this.guestOnlyIds().forEach((id) => watched.add(id));
    saveWatched();
    await syncChain;
    writeStored(WATCH_KEY, null); // now safely in the account
    emit("watchedchange");
  },
};

async function connectAccount() {
  let me;
  try { me = await api("me"); } catch { account.available = false; emit("accountchange"); return; }
  account.available = true;
  if (me.authenticated) {
    account.user = me.username;
    emit("accountchange");
    refreshAccountList().catch(() => {});
  } else if (account.user) {
    signedOut(); // the session ended (expired or signed out elsewhere)
  } else {
    emit("accountchange");
  }
}

function showNotice(text) {
  let box = document.querySelector(".site-notice");
  if (!box) {
    box = document.createElement("p");
    box.className = "site-notice";
    box.setAttribute("role", "status");
    document.body.append(box);
  }
  box.textContent = text;
  box.hidden = false;
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => (box.hidden = true), 6000);
}

/* ---------- masthead, footer, progress badge ---------- */
function renderChrome(activeKey) {
  const skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main";
  skip.textContent = "Skip to content";

  const header = document.createElement("header");
  header.className = "masthead";
  header.innerHTML = `
    <div class="wrap mast-row">
      <a class="cornerbox" href="index.html" aria-label="The Marvel Archive home"><small>No.</small><b>616</b></a>
      <a class="logo misprint" href="index.html">The Marvel Archive<span>Every film &amp; series since 1944</span></a>
      <nav class="mast-nav" aria-label="Main">
        ${NAV.map((n) => `<a href="${n.href}"${n.key === activeKey ? ' aria-current="page"' : ""}>${n.label}</a>`).join("")}
      </nav>
      <div class="mast-tools">
        <a class="account-link" href="account.html"${activeKey === "account" ? ' aria-current="page"' : ""} hidden>Sign in</a>
        <div class="theme-switch" role="group" aria-label="Site theme">
          ${THEMES.map((th) => `<button type="button" data-theme-choice="${th.key}" title="${th.title}">${th.label}</button>`).join("")}
        </div>
      </div>
    </div>
    <div class="dateline"><div class="wrap"><span>Fan-made archive · Vol. 1</span><span>${ALL_TITLES.length} files on record</span></div></div>`;

  const footer = document.createElement("footer");
  footer.className = "foot";
  footer.innerHTML = `<div class="wrap"><span>The Marvel Archive is an unofficial fan project. Characters and posters © Marvel / Disney and their respective studios, used with permission.</span><span>Excelsior.</span></div>`;

  document.body.prepend(skip, header);
  document.body.append(footer);
  setupThemeSwitch(header.querySelector(".theme-switch"));

  const accountLink = header.querySelector(".account-link");
  const syncAccountLink = () => {
    accountLink.hidden = !account.available;
    accountLink.textContent = account.user || "Sign in";
    accountLink.title = account.user ? `Signed in as ${account.user}` : "Sign in or create an account";
  };
  document.addEventListener("accountchange", syncAccountLink);
  connectAccount();
  if (activeKey !== "tracker") {
    const badge = document.createElement("a");
    badge.className = "gauntlet-badge";
    badge.href = "tracker.html";
    badge.title = "Your watch progress";
    document.body.append(badge);
  }
  renderBadge();
}

/* ---------- theme switch (js/theme.js applies the theme; this is the masthead control) ---------- */
const THEMES = [
  { key: "deck",      label: "Deck",      title: "Command Deck: hero-tower theme (default)" },
  { key: "archive",   label: "Archive",   title: "The Archive: printed-comic theme" },
  { key: "programme", label: "Programme", title: "The Programme: dark cinema theme" },
];

function setupThemeSwitch(group) {
  const sync = () => group.querySelectorAll("[data-theme-choice]").forEach((b) =>
    b.setAttribute("aria-pressed", b.dataset.themeChoice === window.siteTheme?.get()));
  group.addEventListener("click", (e) => {
    const choice = e.target.closest("[data-theme-choice]");
    if (choice) window.siteTheme?.set(choice.dataset.themeChoice);
  });
  document.addEventListener("themechange", sync);
  sync();
  if (!window.siteTheme) group.hidden = true; // theme.js missing: nothing to switch
}

// Six gems light up as each MCU phase is fully watched; the counter covers every released title.
function phaseProgress(phase) {
  const inPhase = REALITIES.mcu.titles.filter((t) => t.phase == phase && isReleased(t));
  const done = inPhase.filter((t) => watched.has(t.id)).length;
  return { done, total: inPhase.length, full: inPhase.length > 0 && done === inPhase.length };
}

function renderBadge() {
  const badge = document.querySelector(".gauntlet-badge");
  if (!badge) return;
  const gems = Object.keys(REALITIES.mcu.phases)
    .map((n) => `<i class="${phaseProgress(n).full ? "on" : ""}" style="--c: var(--stone-${n})"></i>`).join("");
  const released = ALL_TITLES.filter((t) => isReleased(t));
  const done = released.filter((t) => watched.has(t.id)).length;
  badge.innerHTML = `<span class="gems" aria-hidden="true">${gems}</span><span>${done}/${released.length}<span class="sr-only"> released titles watched</span></span>`;
}
