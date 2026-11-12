/* My Gauntlet: watch progress across every reality */

renderChrome("tracker");

const REALITY_ORDER = ["mcu", "spider", "mutant", "legacy"];
const released = (list) => list.filter((t) => isReleased(t));

// A reality's progress counts its own titles plus its cross-references (each title counted once overall).
function realityTitles(key) {
  return released(entriesOf(REALITIES[key]).map((e) => e.t));
}

function renderScore() {
  const all = released(ALL_TITLES);
  const done = all.filter((t) => watched.has(t.id)).length;
  document.getElementById("scoreDone").textContent = done;
  document.getElementById("scoreTotal").textContent = all.length;
  document.getElementById("scorePct").textContent = `${all.length ? Math.round((done / all.length) * 100) : 0}%`;
}

function renderStones() {
  const mcu = REALITIES.mcu;
  document.getElementById("stones").innerHTML = Object.entries(mcu.phases).map(([n, p]) => {
    const { done, total, full } = phaseProgress(n);
    const pct = total ? done / total : 0;
    return `<li class="stone${full ? " full" : ""}" style="--c: var(--stone-${n}); --p: ${pct}">
      <span class="gem" aria-hidden="true"></span>
      <b>${p.stone}</b>
      <span>Phase ${p.word} · ${done}/${total}</span>
      ${full ? '<span class="claimed">Claimed</span>' : ""}
    </li>`;
  }).join("");
}

function renderBars() {
  document.getElementById("bars").innerHTML = REALITY_ORDER.map((key) => {
    const reality = REALITIES[key];
    const list = realityTitles(key);
    const done = list.filter((t) => watched.has(t.id)).length;
    const pct = list.length ? Math.round((done / list.length) * 100) : 0;
    const color = Object.values(reality.sections)[0].color;
    return `<a class="bar-row" href="${reality.page}" style="--c: ${color}">
      <span class="bar-name">${escapeHTML(reality.name)}</span>
      <span class="bar-track" role="progressbar" aria-valuemin="0" aria-valuemax="${list.length}" aria-valuenow="${done}" aria-label="${escapeHTML(reality.name)}: ${done} of ${list.length} watched"><i style="width: ${pct}%"></i></span>
      <span class="bar-count">${done}/${list.length}</span>
    </a>`;
  }).join("");
}

function renderNext() {
  const cards = REALITY_ORDER.map((key) => {
    const reality = REALITIES[key];
    const next = realityTitles(key).sort((a, b) => a.released.localeCompare(b.released)).find((t) => !watched.has(t.id));
    if (!next) return `<div class="next-card done"><span class="stamp">Complete</span><b>${escapeHTML(reality.name)}</b><p>Every released file watched.</p></div>`;
    return `<article class="next-card" data-id="${next.id}">
      <span class="next-reality">${escapeHTML(reality.short)}</span>
      ${posterHTML(next)}
      <h3><a href="title.html?id=${next.id}">${escapeHTML(next.title)}</a></h3>
      <span class="next-meta">${releaseYear(next)} · ${next.format}</span>
      <button class="btn" type="button" data-watch="${next.id}">Mark watched</button>
    </article>`;
  });
  const box = document.getElementById("next");
  box.innerHTML = cards.join("");
  hydratePosters(box);
}

function renderAll() {
  renderScore();
  renderStones();
  renderBars();
  renderNext();
}

document.getElementById("next").addEventListener("click", (e) => {
  const button = e.target.closest("[data-watch]");
  if (!button) return;
  toggleWatched(button.dataset.watch);
  renderAll();
});

// Where progress is kept: this browser, or the signed-in account.
function renderSaveNotes() {
  const saveNote = document.getElementById("saveNote");
  if (account.user) {
    saveNote.innerHTML = `Progress is saved to your account, <b>${escapeHTML(account.user)}</b>.`;
  } else if (account.available) {
    saveNote.innerHTML = 'Progress is saved in this browser only. <a href="account.html">Sign in</a> to keep it on every device.';
  } else {
    saveNote.textContent = "Progress is saved in this browser only.";
  }
  document.getElementById("resetNote").textContent = account.user
    ? "Clears every watched stamp in your account, on every device. This can't be undone."
    : "Clears every watched stamp saved in this browser. This can't be undone.";
}

document.getElementById("reset").addEventListener("click", () => {
  if (!watched.size) return;
  const where = account.user ? "your account" : "this browser";
  if (!confirm(`Remove all ${watched.size} watched stamps from ${where}? This can't be undone.`)) return;
  watched.clear();
  saveWatched();
  renderAll();
});

renderAll();
renderSaveNotes();
document.addEventListener("watchedchange", renderAll);
document.addEventListener("accountchange", renderSaveNotes);
if (!prefersReducedMotion) {
  gsap.from(".stone", { y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.6)", clearProps: "opacity,transform" });
}
