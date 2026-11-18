/* Command Deck theme: the timeline as a cast-selector deck.
   [thumbnail rail of the current section] [stage: poster, split-weight title, details, watched] [section tabs]

   Loaded after timeline.js on every timeline page and reuses its globals:
   reality, ENTRIES, sectionKeys, chronoIndex, tagsHTML, render (the list view used by the other themes).
   The deck is always built; css/theme-deck.css shows it (and hides the list) only in the Deck theme. */

(function deckTimeline() {
  const views = reality.views;
  const firstSection = sectionKeys.find((key) => ENTRIES.some((e) => e.section === key));
  const deck = { view: views[0], section: firstSection, index: 0 };

  const root = document.createElement("section");
  root.className = "deck-view";
  root.setAttribute("aria-label", `${reality.name}: title deck`);
  root.innerHTML = `
    <aside class="dv-rail" aria-label="Titles">
      <div class="dv-rail-head"><b data-dv="railTitle"></b><span class="dv-label" data-dv="count"></span></div>
      <div class="dv-list" data-dv="list"></div>
      <div class="dv-rail-foot">
        <span class="dv-label">Scroll</span>
        <button class="dv-step" type="button" data-dv="prev" aria-label="Previous title">↑</button>
        <button class="dv-step" type="button" data-dv="next" aria-label="Next title">↓</button>
      </div>
    </aside>
    <article class="dv-stage">
      <div class="dv-top">
        <div class="dv-order" role="group" aria-label="Order">${views.map((v) =>
          `<button type="button" data-view="${v.key}">${escapeHTML(v.label)}</button>`).join("")}</div>
        <p class="dv-frame" data-dv="frame"></p>
      </div>
      <div class="dv-art" data-dv="art" aria-hidden="true"></div>
      <div class="dv-body" data-dv="body" aria-live="polite"></div>
    </article>
    <nav class="dv-tabs" aria-label="${escapeHTML(reality.indexLabel || "Sections")}" data-dv="tabs"></nav>`;
  document.querySelector(".controls").before(root);
  const $ = (name) => root.querySelector(`[data-dv="${name}"]`);

  const colorOf = (entry) => reality.sections[entry.section]?.color || "var(--signal)";
  const byRelease = (a, b) => a.t.released.localeCompare(b.t.released);

  function list() {
    if (deck.view.grouped) return ENTRIES.filter((e) => e.section === deck.section).sort(byRelease);
    if (deck.view.sort === "chrono") {
      return [...ENTRIES].sort((a, b) => (chronoIndex.get(a.t.id) ?? 1e9) - (chronoIndex.get(b.t.id) ?? 1e9));
    }
    return [...ENTRIES].sort(byRelease);
  }

  // Split-weight title: "Captain America: Civil War" -> thin "Captain America" / heavy "Civil War";
  // "Iron Man" -> heavy "Iron" / thin "Man".
  function splitTitle(title) {
    if (title.includes(":")) {
      const [a, b] = title.split(/:\s*/, 2);
      return `<span>${escapeHTML(a)}</span><b>${escapeHTML(b)}</b>`;
    }
    const words = title.split(" ");
    if (words.length === 1) return `<b>${escapeHTML(title)}</b>`;
    return `<b>${escapeHTML(words[0])}</b><span>${escapeHTML(words.slice(1).join(" "))}</span>`;
  }

  function renderTabs() {
    const tabs = $("tabs");
    tabs.innerHTML = sectionKeys
      .filter((key) => ENTRIES.some((e) => e.section === key))
      .map((key) => {
        const s = reality.sections[key];
        const on = deck.view.grouped && key === deck.section;
        return `<button class="dv-tab" type="button" data-section="${key}" style="--c: ${s.color}" aria-pressed="${on}">${escapeHTML(s.label)}</button>`;
      }).join("");
    // Phones scroll the tabs sideways: keep the active one in view without moving the page.
    const active = tabs.querySelector('[aria-pressed="true"]');
    if (active && tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = active.offsetLeft - 16;
    root.querySelectorAll("[data-view]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.view === deck.view.key));
  }

  function renderRail() {
    const items = list();
    $("railTitle").textContent = deck.view.grouped ? reality.sections[deck.section].label : deck.view.label;
    $("count").textContent = `${items.length} file${items.length === 1 ? "" : "s"}`;
    $("list").innerHTML = items.map((entry, i) => {
      const { t } = entry;
      const yearLabel = deck.view.sort === "chrono" ? (t.setIn || "—") : releaseYear(t);
      return `<button class="dv-item" type="button" data-i="${i}" style="--c: ${colorOf(entry)}" aria-current="${i === deck.index}">
        ${posterHTML(t)}<span class="y">${escapeHTML(yearLabel)}</span><span class="t">${escapeHTML(t.title)}</span>
        ${watched.has(t.id) ? '<i class="seen" aria-hidden="true"></i><span class="sr-only">, watched</span>' : ""}
      </button>`;
    }).join("");
    hydratePosters($("list"));
  }

  function renderStage(animate = true) {
    const items = list();
    const entry = items[deck.index];
    if (!entry) {
      $("body").innerHTML = '<p class="dv-empty">No files here yet.</p>';
      $("art").innerHTML = "";
      $("frame").textContent = "";
      return;
    }
    const { t } = entry;
    const section = reality.sections[entry.section];
    const upcoming = !isReleased(t);
    const isWatched = watched.has(t.id);
    root.style.setProperty("--power", colorOf(entry));
    $("frame").innerHTML = `${String(deck.index + 1).padStart(2, "0")} <span>/ ${String(items.length).padStart(2, "0")}</span>`;

    $("art").innerHTML = `${posterHTML(t)}<span class="dv-ghost">${escapeHTML(t.title.split(/:\s*|\s/).filter(Boolean).pop())}</span>`;
    hydratePosters($("art"));

    const label = [section?.label, section?.sub, t.setIn && `Set in ${t.setIn}`].filter(Boolean).map(escapeHTML).join(" · ");
    $("body").innerHTML = `
      <p class="dv-label">${label}</p>
      <h2><a href="title.html?id=${t.id}">${splitTitle(t.title)}</a></h2>
      <span class="dv-bar" aria-hidden="true"></span>
      <div class="dv-tags">
        <span class="tag"><i aria-hidden="true"></i>${escapeHTML(t.format)}</span>
        <span class="tag">${releaseYear(t)}</span>
        ${t.length ? `<span class="tag">${escapeHTML(t.length)}</span>` : ""}
        ${tagsHTML(entry)}
      </div>
      <div><p class="dv-summary">${escapeHTML(t.summary)}</p>${t.crew ? `<p class="dv-crew">${escapeHTML(t.crew)}</p>` : ""}</div>
      <div class="dv-actions">
        ${upcoming ? `<span class="dv-label">Releases ${escapeHTML(formatDate(t.released))}</span>` :
          `<button class="btn" type="button" data-dv-watch aria-pressed="${isWatched}">${isWatched ? "Watched ✓" : "Mark watched"}</button>`}
        <a class="dv-more" href="title.html?id=${t.id}">Open case file ››</a>
      </div>`;

    if (animate && !prefersReducedMotion) {
      for (const el of [$("body"), $("art")]) { el.classList.remove("enter"); void el.offsetWidth; el.classList.add("enter"); }
    }
    $("prev").disabled = deck.index === 0;
    $("next").disabled = deck.index === items.length - 1;
  }

  function renderDeck(animate = false) {
    deck.index = Math.min(deck.index, Math.max(0, list().length - 1));
    renderTabs();
    renderRail();
    renderStage(animate);
  }

  function select(i, { focus = false } = {}) {
    const items = list();
    deck.index = Math.max(0, Math.min(items.length - 1, i));
    $("list").querySelectorAll(".dv-item").forEach((b) => b.setAttribute("aria-current", +b.dataset.i === deck.index));
    const active = $("list").querySelector(`[data-i="${deck.index}"]`);
    if (active) {
      // Scroll inside the rail only (never the page).
      const rail = $("list");
      if (rail.scrollHeight > rail.clientHeight) rail.scrollTop = Math.max(0, active.offsetTop - rail.clientHeight / 2 + active.offsetHeight / 2);
      if (rail.scrollWidth > rail.clientWidth) rail.scrollLeft = Math.max(0, active.offsetLeft - 16);
      if (focus) active.focus({ preventScroll: true });
    }
    renderStage();
  }

  /* ---------- events ---------- */
  root.addEventListener("click", (e) => {
    const item = e.target.closest(".dv-item");
    if (item) return select(+item.dataset.i);

    const tab = e.target.closest("[data-section]");
    if (tab) {
      const grouped = views.find((v) => v.grouped);
      if (grouped) deck.view = grouped;
      deck.section = tab.dataset.section;
      deck.index = 0;
      return renderDeck(true);
    }

    const viewButton = e.target.closest("[data-view]");
    if (viewButton && viewButton.dataset.view !== deck.view.key) {
      const keep = list()[deck.index]?.t;
      deck.view = views.find((v) => v.key === viewButton.dataset.view);
      if (deck.view.grouped && keep) deck.section = ENTRIES.find((en) => en.t === keep)?.section || deck.section;
      deck.index = Math.max(0, list().findIndex((en) => en.t === keep));
      return renderDeck(true);
    }

    if (e.target.closest('[data-dv="prev"]')) return select(deck.index - 1);
    if (e.target.closest('[data-dv="next"]')) return select(deck.index + 1);

    if (e.target.closest("[data-dv-watch]")) {
      toggleWatched(list()[deck.index].t.id);
      renderRail();
      renderStage(false);
    }
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      select(deck.index + (e.key === "ArrowDown" ? 1 : -1), { focus: e.target.closest(".dv-list") !== null });
    }
  });

  // Keep the deck and the list view in step with each other and with the account.
  document.addEventListener("watchedchange", () => renderDeck());
  document.addEventListener("themechange", () => { render(); renderDeck(); });

  // The deck fills the screen below the sticky masthead, whose height changes when the nav wraps.
  const syncMastHeight = () => document.documentElement.style.setProperty("--mast-h", `${document.querySelector(".masthead")?.offsetHeight || 69}px`);
  window.addEventListener("resize", syncMastHeight);
  document.addEventListener("themechange", syncMastHeight);
  syncMastHeight();

  renderDeck();
})();
