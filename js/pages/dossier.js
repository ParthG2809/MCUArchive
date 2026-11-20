/* Case file page: title.html?id=<title id> */

renderChrome(null);

const params = new URLSearchParams(location.search);
const t = titleById(params.get("id"));

if (!t) {
  renderMissingFile();
} else {
  renderFile(t);
}

function renderMissingFile() {
  document.title = "File not found | The Marvel Archive";
  document.getElementById("room").innerHTML = `
    <div class="notice-card">
      <span class="caption">Missing file</span>
      <h1>No file <span>on record</span></h1>
      <p>That file isn't in the archive. It may have been pruned from the timeline.</p>
      <p class="notice-actions"><a class="btn red" href="mcu.html">Back to the Sacred Timeline</a></p>
    </div>`;
}

function renderFile(t) {
  const reality = REALITIES[t.reality];
  const phase = reality.phases?.[t.phase];
  const section = sectionOf(t);
  const canon = canonOf(t);
  const released = isReleased(t);
  const folder = document.getElementById("folder");

  document.title = `${t.title}: Case File ${t.fileNo} | The Marvel Archive`;
  document.querySelector('meta[name="description"]').content = `${t.title} (${releaseYear(t)}): release date, story year, connections and where it fits in ${reality.name}.`;

  folder.style.setProperty("--stone", section?.color || "var(--red)");
  folder.dataset.tab = `FILE ${t.fileNo} · ${t.format.toUpperCase()}`;
  const crumbReality = document.getElementById("crumbReality");
  crumbReality.href = reality.page;
  crumbReality.textContent = reality.name;
  document.getElementById("crumb").textContent = `File ${t.fileNo}`;
  document.getElementById("fileNo").textContent = `AGENCY FILE No. ${t.fileNo}`;
  document.getElementById("earth").textContent = `REALITY: ${reality.earth.toUpperCase()}`;
  document.getElementById("title").textContent = t.title;
  document.getElementById("posterSlot").innerHTML = posterHTML(t, { decorative: false });

  document.getElementById("stamps").innerHTML = [
    phase ? `<span class="stamp stone">Phase ${phase.word}</span>` : section && `<span class="stamp stone">${escapeHTML(section.label)}</span>`,
    phase && `<span class="stamp blue">${phase.stone} Stone</span>`,
    t.animated && `<span class="stamp blue">Animated</span>`,
    t.nexus && `<span class="stamp">Nexus event</span>`,
    !released && `<span class="stamp">Pending release</span>`,
    canon && `<span class="stamp blue">${CANON[canon].label}</span>`,
  ].filter(Boolean).join("");
  hydratePosters(document.getElementById("posterSlot"));

  /* ---------- tab panels ---------- */
  const inRelease = [...reality.titles].sort((a, b) => a.released.localeCompare(b.released));
  const inStory = reality.chrono ? reality.chrono.map(titleById).filter(Boolean) : inRelease;
  const neighbours = (list) => { const i = list.indexOf(t); return [list[i - 1], list[i + 1]]; };

  // Other realities that list this title as a cross-reference (e.g. No Way Home in the Spider-Verse).
  const alsoIn = Object.values(REALITIES).filter((r) => r.refs?.some((ref) => ref.id === t.id));

  const connections = ALL_TITLES
    .filter((x) => x !== t && ((t.group && x.group === t.group) || t.links?.includes(x.id) || x.links?.includes(t.id)))
    .sort((a, b) => a.released.localeCompare(b.released));

  const field = (label, value, wide) => value
    ? `<div class="field"${wide ? ' style="grid-column: 1 / -1"' : ""}><span>${label}</span>${escapeHTML(value)}</div>` : "";

  const panels = {
    file: () => `
      <div class="fields">
        ${field(released ? "Released" : "Releases", formatDate(t.released))}
        ${field("Set in", t.setIn)}
        ${field("Format", t.animated ? `${t.format} (animated)` : t.format)}
        ${field("Length", t.length)}
        ${field("Credits", t.crew, true)}
      </div>
      <p class="summary-label"><span>Synopsis</span></p>
      <p class="summary">${escapeHTML(t.summary)}</p>
      ${t.note ? `<p class="note">Agent's note: ${escapeHTML(t.note)}</p>` : ""}
      ${alsoIn.length ? `<p class="summary-label"><span>Also filed in: ${alsoIn.map((r) => `<a href="${r.page}">${escapeHTML(r.name)}</a>`).join(", ")}</span></p>` : ""}`,
    links: () => connections.length ? `
      <p class="summary-label"><span>Linked files</span><span>${connections.length} connection${connections.length === 1 ? "" : "s"}</span></p>
      <div class="links">${connections.map((c) => `
        <a class="link-card" href="title.html?id=${c.id}">${posterHTML(c)}<small>File ${c.fileNo} · ${releaseYear(c)}</small><b>${escapeHTML(c.title)}</b></a>`).join("")}
      </div>` : `<p class="summary">No linked files yet.</p>`,
    order: () => {
      const [releasePrev, releaseNext] = neighbours(inRelease);
      const [storyPrev, storyNext] = neighbours(inStory);
      const row = (label, x) => x ? `<a href="title.html?id=${x.id}"><span>${label}</span><b>${escapeHTML(x.title)}</b></a>` : "";
      return `<p class="summary-label"><span>Before &amp; after this file</span></p>
        <div class="order-list">
          ${row("Release order · before", releasePrev)}${row("Release order · after", releaseNext)}
          ${row("Story order · before", storyPrev)}${row("Story order · after", storyNext)}
        </div>`;
    },
  };

  const panel = document.getElementById("panel");
  function showTab(name) {
    document.querySelectorAll(".sheet-tabs [role=tab]").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === name));
    panel.setAttribute("aria-labelledby", `tab-${name}`);
    panel.innerHTML = panels[name]();
    hydratePosters(panel);
    if (!prefersReducedMotion) gsap.from(panel.children, { opacity: 0, y: 10, duration: 0.35, stagger: 0.05 });
  }
  document.querySelector(".sheet-tabs").addEventListener("click", (e) => {
    const tab = e.target.closest("[role=tab]");
    if (tab) showTab(tab.dataset.tab);
  });
  showTab("file");

  /* ---------- watched stamp ---------- */
  const pad = document.getElementById("stampPad");
  if (!released) {
    pad.hidden = true;
  } else {
    const sync = () => {
      const on = watched.has(t.id);
      folder.classList.toggle("is-watched", on);
      pad.setAttribute("aria-pressed", on);
      pad.textContent = on ? "Watched ✓ (undo)" : "Stamp as watched";
    };
    pad.addEventListener("click", () => { toggleWatched(t.id); sync(); });
    document.addEventListener("watchedchange", sync); // signed in/out, or the account list arrived
    sync();
  }

  renderCast(t);

  /* ---------- previous / next in release order ---------- */
  const [prev, next] = neighbours(inRelease);
  document.getElementById("pager").innerHTML =
    (prev ? `<a href="title.html?id=${prev.id}">← Previous file<b>${escapeHTML(prev.title)}</b></a>` : "") +
    (next ? `<a class="next" href="title.html?id=${next.id}">Next file →<b>${escapeHTML(next.title)}</b></a>` : "");

  if (!prefersReducedMotion) {
    gsap.from(".folder", { y: 50, rotation: -1.5, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "opacity,transform" });
    gsap.from(".photo", { x: -30, rotation: -12, duration: 0.9, ease: "back.out(1.6)", delay: 0.2 });
  }
}

/* ---------- cast & characters ----------
   Data: js/data/cast-<reality>.js -> window.ARCHIVE_CAST[titleId] = [[character, actor, bio], ...].
   A list of characters beside a stage (name, actor, bio) in a glass panel over the title's poster art. */
function renderCast(t) {
  const cast = (window.ARCHIVE_CAST || {})[t.id];
  const box = document.getElementById("cast");
  if (!cast || !cast.length) return;
  box.hidden = false;
  const poster = (window.ARCHIVE_POSTERS || {})[t.wiki];
  // Animated titles, and voice-only roles marked "(voice)" in the data, read "Voiced by".
  const credit = (actor) => {
    const isVoice = t.animated || / \(voice\)$/.test(actor);
    return `${isVoice ? "Voiced by" : "Played by"} <b>${escapeHTML(actor.replace(/ \(voice\)$/, ""))}</b>`;
  };
  const initials = (name) => name.replace(/\(.*?\)/g, "").split(/[\s/]+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
  const count = String(cast.length).padStart(2, "0");

  box.innerHTML = `
    <div class="cast-head">
      <h2 id="cast-title">Cast <span>&amp; characters</span></h2>
      <p>${cast.length} main character${cast.length === 1 ? "" : "s"} in ${escapeHTML(t.title)}.</p>
    </div>
    <div class="cast-deck">
      <div class="cast-list" role="tablist" aria-label="Characters" aria-orientation="vertical">
        ${cast.map(([character, actor], i) => `
          <button class="cast-item" type="button" role="tab" id="cast-tab-${i}" aria-controls="cast-stage" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">
            <span class="cast-mono" aria-hidden="true">${escapeHTML(initials(character))}</span>
            <span class="cast-names"><b>${escapeHTML(character)}</b><small>${escapeHTML(actor)}</small></span>
          </button>`).join("")}
      </div>
      <div class="cast-stage" id="cast-stage" role="tabpanel" aria-labelledby="cast-tab-0" aria-live="polite">
        ${poster ? `<img class="cast-art" src="${escapeHTML(poster)}" alt="" decoding="async">` : ""}
        <div class="cast-panel glass"></div>
      </div>
    </div>`;

  const items = [...box.querySelectorAll(".cast-item")];
  const stage = box.querySelector(".cast-stage");
  const panel = box.querySelector(".cast-panel");
  function show(i, focus = false) {
    const [character, actor, bio] = cast[i];
    items.forEach((b, j) => { b.setAttribute("aria-selected", j === i); b.tabIndex = j === i ? 0 : -1; });
    stage.setAttribute("aria-labelledby", `cast-tab-${i}`);
    const [first, ...rest] = character.split(" / ");
    panel.innerHTML = `
      <p class="cast-count">${String(i + 1).padStart(2, "0")} <span>/ ${count}</span></p>
      <h3>${escapeHTML(first)}${rest.length ? `<span>${escapeHTML(rest.join(" / "))}</span>` : ""}</h3>
      <p class="cast-actor">${credit(actor)}</p>
      <span class="cast-bar" aria-hidden="true"></span>
      <p class="cast-bio">${escapeHTML(bio)}</p>`;
    const list = items[i].parentElement; // keep the chosen character in view (scrolls the list only, never the page)
    if (list.scrollWidth > list.clientWidth) list.scrollLeft = Math.max(0, items[i].offsetLeft - 16);
    else if (list.scrollHeight > list.clientHeight) list.scrollTop = Math.max(0, items[i].offsetTop - list.clientHeight / 2);
    if (focus) items[i].focus({ preventScroll: true });
    if (!prefersReducedMotion) gsap.from(panel.children, { opacity: 0, y: 12, duration: 0.35, stagger: 0.04 });
  }
  box.querySelector(".cast-list").addEventListener("click", (e) => {
    const b = e.target.closest(".cast-item");
    if (b) show(+b.dataset.i);
  });
  box.querySelector(".cast-list").addEventListener("keydown", (e) => {
    const i = items.indexOf(document.activeElement);
    if (i < 0) return;
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (step) { e.preventDefault(); show((i + step + items.length) % items.length, true); }
    if (e.key === "Home") { e.preventDefault(); show(0, true); }
    if (e.key === "End") { e.preventDefault(); show(items.length - 1, true); }
  });
  show(0);
}
