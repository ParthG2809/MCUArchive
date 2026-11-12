/* Mockup V5 "The Programme": shared helpers. Reads the real site data (js/data/*.js, js/posters.js).
   Mockup only: watched state is kept in memory and not saved. */

const R = window.ARCHIVE.realities;
const POSTERS = window.ARCHIVE_POSTERS || {};
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const seen = new Set(["iron-man", "incredible-hulk", "iron-man-2", "thor", "first-avenger", "avengers", "guardians", "winter-soldier"]);

const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const released = (t) => new Date(t.released + "T00:00:00") <= new Date();
const dateText = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const allTitles = () => Object.values(R).flatMap((r) => r.titles.map((t) => ({ ...t, reality: r.key })));

function poster(t) {
  const src = POSTERS[t.wiki];
  return src
    ? `<img src="${esc(src)}" alt="" loading="lazy" decoding="async">`
    : `<div class="fallback">${esc(t.title)}</div>`;
}

function masthead(active) {
  const links = [
    ["lobby", "Lobby", "index.html"], ["mcu", "Sacred Timeline", "mcu.html"], ["spider", "Spider-Verse", "#"],
    ["mutant", "Mutant", "#"], ["legacy", "Legacy", "#"], ["doomsday", "Before Doomsday", "#", "hot"],
  ];
  const stones = Object.keys(R.mcu.phases).map((n) => {
    const inPhase = R.mcu.titles.filter((t) => t.phase == n && released(t));
    const full = inPhase.length && inPhase.every((t) => seen.has(t.id));
    return `<i class="${full ? "on" : ""}" style="--c: var(--stone-${n})"></i>`;
  }).join("");
  const done = allTitles().filter((t) => released(t) && seen.has(t.id)).length;
  const total = allTitles().filter(released).length;
  document.querySelector("[data-mast]").innerHTML = `
    <div class="wrap">
      <a class="brand" href="index.html">The Marvel Archive<span>.</span></a>
      <nav aria-label="Main">${links.map(([k, label, href, cls]) =>
        `<a href="${href}"${k === active ? ' aria-current="page"' : ""}${cls ? ` class="${cls}"` : ""}>${label}</a>`).join("")}</nav>
      <a class="gauntlet" href="#"><span class="dots" aria-hidden="true">${stones}</span><span>${done}/${total}<span class="sr-only"> released titles seen</span></span></a>
    </div>`;
}

function redactable(text) {
  return esc(text).replace(/\[\[(.+?)\]\]/g, (_, s) => `<span class="redact" role="button" tabindex="0" aria-label="Hidden spoiler. Select to reveal">${s}</span>`);
}
document.addEventListener("click", (e) => e.target.closest(".redact")?.classList.add("shown"));
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList?.contains("redact")) { e.preventDefault(); e.target.classList.add("shown"); }
});
