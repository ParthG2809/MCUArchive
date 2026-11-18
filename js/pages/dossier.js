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
      <span class="stamp">Missing file</span>
      <h2>No file on record</h2>
      <p>That file isn't in the archive. It may have been pruned from the timeline.</p>
      <p style="margin-top:18px"><a class="btn red" href="mcu.html">Back to the Sacred Timeline</a></p>
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
