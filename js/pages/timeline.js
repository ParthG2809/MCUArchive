/* Timeline page (records floor). Works for any reality: <body data-reality="mcu|spider|mutant|legacy">

   Each reality declares:
     sections  ordered groups (MCU phases, film series, lanes…) with label / sub / color
     views     the order tabs, e.g. { key, label, hint, sort: "release" | "chrono", grouped: true }
     refs      optional cross-references to titles that live in another reality */

const reality = REALITIES[document.body.dataset.reality];
renderChrome(reality.key);

const chart = document.getElementById("chart");
const sectionKeys = Object.keys(reality.sections);
const chronoIndex = new Map((reality.chrono || []).map((id, i) => [id, i]));
const ENTRIES = entriesOf(reality);
const state = { view: reality.views[0], filter: "all", hideWatched: false };

/* ---------- list building ---------- */
function matchesFilter({ t }) {
  if (state.hideWatched && watched.has(t.id)) return false;
  if (state.filter === "all") return true;
  if (state.filter === "animated") return !!t.animated;
  return t.format === state.filter;
}

function sortedEntries() {
  const byRelease = (a, b) => a.t.released.localeCompare(b.t.released);
  const list = ENTRIES.filter(matchesFilter);
  if (state.view.sort === "chrono") {
    return list.sort((a, b) => (chronoIndex.get(a.t.id) ?? 1e9) - (chronoIndex.get(b.t.id) ?? 1e9));
  }
  if (state.view.grouped) {
    return list.sort((a, b) => (sectionKeys.indexOf(a.section) - sectionKeys.indexOf(b.section)) || byRelease(a, b));
  }
  return list.sort(byRelease);
}

function tagsHTML({ t, ref }) {
  const tags = [];
  if (!isReleased(t)) tags.push('<span class="tag tag-soon">Upcoming</span>');
  if (t.animated) tags.push('<span class="tag tag-anim">Animated</span>');
  if (ref) tags.push(`<span class="tag tag-ref">From ${escapeHTML(REALITIES[t.reality].short)}</span>`);
  const canon = canonOf(t);
  if (canon && canon !== "confirmed" && reality.showCanon) tags.push(`<span class="tag tag-canon tag-${canon}">${CANON[canon].short}</span>`);
  return tags.join("");
}

function burstLabel(t) {
  const d = new Date(t.released + "T00:00:00");
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}<br>${d.getFullYear()}`;
}

function rowHTML(entry, i) {
  const { t, section } = entry;
  const upcoming = !isReleased(t);
  const nodeLabel = state.view.sort === "chrono" ? (t.setIn || "—") : releaseYear(t);
  const burst = upcoming
    ? `<span class="burst">${burstLabel(t)}</span>`
    : t.nexus ? '<span class="burst" style="--bg: var(--cyan)">Nexus event!</span>' : "";
  const sectionLabel = state.view.grouped ? "" : reality.sections[section]?.label;
  const meta = [entry.ref ? null : `File ${t.fileNo}`, sectionLabel, t.format, t.length].filter(Boolean).join(" · ");
  const isWatched = watched.has(t.id);
  return `<div class="row${i % 2 ? " right" : ""}${t.nexus ? " nexus" : ""}" data-flip-id="${t.id}" style="--stone: ${reality.sections[section]?.color || "var(--red)"}">
    <span class="node${String(nodeLabel).length > 5 ? " text" : ""}" aria-hidden="true">${escapeHTML(nodeLabel)}</span>
    <article class="record${isWatched ? " is-watched" : ""}${upcoming ? " upcoming" : ""}" data-id="${t.id}">
      ${burst}
      <span class="clip" aria-hidden="true"></span>
      ${posterHTML(t)}
      <div>
        <span class="kind">${escapeHTML(meta)}</span>
        <h3><a class="title-link" href="title.html?id=${t.id}">${escapeHTML(t.title)}</a></h3>
        <div class="tags">${tagsHTML(entry)}</div>
        <p>${escapeHTML(t.summary)}</p>
        <div class="acts">
          <a href="title.html?id=${t.id}" aria-hidden="true" tabindex="-1">Open file →</a>
          ${upcoming ? "" : `<button class="watch-btn" type="button" aria-pressed="${isWatched}" title="${isWatched ? "Watched" : "Mark watched"}">${isWatched ? "Watched" : "Mark watched"}</button>`}
        </div>
      </div>
      <span class="stamp watched-stamp" aria-hidden="true">Watched</span>
    </article>
  </div>`;
}

function dividerHTML(key, count) {
  const s = reality.sections[key];
  return `<div class="divider" id="section-${key}" data-flip-id="divider-${key}" style="--stone: ${s.color}">
    <h2 class="tabmark">${escapeHTML(s.label)}</h2><span class="meta">${escapeHTML(s.sub)} · ${count} file${count === 1 ? "" : "s"}</span></div>`;
}

function render() {
  const list = sortedEntries();
  let html = "";
  let lastSection = null;
  list.forEach((entry, i) => {
    if (state.view.grouped && entry.section !== lastSection) {
      html += dividerHTML(entry.section, list.filter((x) => x.section === entry.section).length);
      lastSection = entry.section;
    }
    html += rowHTML(entry, i);
  });
  chart.innerHTML = html || '<p class="empty">No files match these filters.</p>';
  document.getElementById("count").textContent = `Showing ${list.length} of ${ENTRIES.length} files`;
  hydratePosters(chart);
}

// Re-render with a FLIP animation so records visibly re-file themselves.
function refile() {
  const before = Flip.getState(".row, .divider");
  render();
  Flip.from(before, {
    targets: ".row, .divider",
    duration: prefersReducedMotion ? 0 : 0.8,
    ease: "power3.inOut",
    stagger: 0.01,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.45 }),
  });
}

/* ---------- controls ---------- */
function renderControls() {
  document.getElementById("views").innerHTML = reality.views.map((v, i) =>
    `<button class="tab" type="button" data-view="${v.key}" aria-pressed="${i === 0}">${escapeHTML(v.label)}</button>`).join("");
  document.getElementById("hint").textContent = reality.views[0].hint;

  // Only offer format filters that this reality actually has.
  const has = (fn) => ENTRIES.some(fn);
  const chips = [["all", "Everything"]];
  if (has((e) => e.t.format === "Film")) chips.push(["Film", "Films"]);
  if (has((e) => e.t.format === "Series")) chips.push(["Series", "Series"]);
  if (has((e) => e.t.animated)) chips.push(["animated", "Animated"]);
  if (has((e) => e.t.format === "Special")) chips.push(["Special", "Specials"]);
  document.getElementById("chips").innerHTML = chips.map(([key, label]) =>
    `<button class="chip" type="button" data-filter="${key}" aria-pressed="${key === "all"}">${label}</button>`).join("");

  document.getElementById("indexTitle").textContent = `INDEX · ${reality.indexLabel}`;
  document.getElementById("sectionIndex").innerHTML = sectionKeys.map((key) => {
    const s = reality.sections[key];
    const count = ENTRIES.filter((e) => e.section === key).length;
    return `<li><button type="button" data-section="${key}" style="--c: ${s.color}"><i aria-hidden="true"></i><span>${escapeHTML(s.label)}</span><b>${count}</b></button></li>`;
  }).join("");
}

function setView(key) {
  state.view = reality.views.find((v) => v.key === key);
  document.querySelectorAll("#views .tab").forEach((b) => b.setAttribute("aria-pressed", b.dataset.view === key));
  document.getElementById("hint").textContent = state.view.hint;
}

document.getElementById("views").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab || tab.dataset.view === state.view.key) return;
  setView(tab.dataset.view);
  refile();
});

document.getElementById("chips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip || chip.dataset.filter === state.filter) return;
  state.filter = chip.dataset.filter;
  document.querySelectorAll("#chips .chip").forEach((c) => c.setAttribute("aria-pressed", c === chip));
  refile();
});

document.getElementById("hideWatched").addEventListener("change", (e) => {
  state.hideWatched = e.target.checked;
  refile();
});

// Index jumps need the grouped view with nothing filtered out, so every divider exists.
document.getElementById("sectionIndex").addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  const grouped = reality.views.find((v) => v.grouped);
  if (state.view !== grouped || state.filter !== "all" || state.hideWatched) {
    setView(grouped.key);
    state.filter = "all";
    state.hideWatched = false;
    document.getElementById("hideWatched").checked = false;
    document.querySelectorAll("#chips .chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.filter === "all"));
    render();
  }
  document.getElementById("section-" + button.dataset.section)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
});

chart.addEventListener("click", (e) => {
  const button = e.target.closest(".watch-btn");
  if (!button) return;
  const card = button.closest(".record");
  const on = toggleWatched(card.dataset.id);
  card.classList.toggle("is-watched", on);
  button.setAttribute("aria-pressed", on);
  button.textContent = button.title = on ? "Watched" : "Mark watched";
  if (on && state.hideWatched) refile();
});

/* ---------- Programme theme: floating poster preview while hovering a record (mouse/trackpad only) ---------- */
const peek = document.createElement("div");
peek.className = "peek";
peek.setAttribute("aria-hidden", "true");
document.body.append(peek);
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

chart.addEventListener("mousemove", (e) => {
  const record = window.siteTheme?.get() === "programme" && finePointer.matches
    && !e.target.closest(".watch-btn") && e.target.closest(".record");
  const src = record && record.querySelector("img[data-wiki]")?.getAttribute("src");
  if (!src) { peek.classList.remove("on"); return; }
  if (peek.dataset.src !== src) {
    peek.dataset.src = src;
    const img = document.createElement("img");
    img.alt = "";
    img.src = src;
    peek.replaceChildren(img);
  }
  const width = 180, height = 270, gap = 28;
  const left = e.clientX + gap + width < innerWidth ? e.clientX + gap : e.clientX - gap - width;
  peek.style.left = `${Math.max(8, left)}px`;
  peek.style.top = `${Math.min(Math.max(e.clientY - height / 2, 16), innerHeight - height - 16)}px`;
  peek.classList.add("on");
});
chart.addEventListener("mouseleave", () => peek.classList.remove("on"));

/* ---------- start ---------- */
renderControls();
render();
document.addEventListener("watchedchange", render); // signed in/out, or the account list arrived
if (!prefersReducedMotion) {
  gsap.from(".row", { opacity: 0, y: 40, duration: 0.6, stagger: { amount: 1 }, ease: "power2.out", clearProps: "opacity,transform" });
}
