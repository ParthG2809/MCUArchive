/* Mockup V6 "Command Deck": shared helpers. Reads the real site data (js/data/*.js, js/posters.js).
   Mockup only: watched state is kept in memory and not saved. */

const R = window.ARCHIVE.realities;
const POSTERS = window.ARCHIVE_POSTERS || {};
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const seen = new Set(["iron-man", "incredible-hulk", "iron-man-2", "thor", "first-avenger", "avengers", "guardians", "winter-soldier"]);

const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const released = (t) => new Date(t.released + "T00:00:00") <= new Date();
const dateText = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const allTitles = () => Object.values(R).flatMap((r) => r.titles.map((t) => ({ ...t, reality: r.key })));
const pad = (n) => String(n).padStart(2, "0");

function poster(t, alt = "") {
  const src = POSTERS[t.wiki];
  return src
    ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">`
    : `<div class="fallback">${esc(t.title)}</div>`;
}

/* Split a title for the split-weight style:
   "Captain America: The Winter Soldier" -> light "Captain America", heavy "The Winter Soldier"
   "Iron Man" -> heavy "Iron", light "Man" (the reference's pattern) */
function splitTitle(title) {
  if (title.includes(":")) {
    const [a, b] = title.split(/:\s*/, 2);
    return `<span>${esc(a)}</span> <b>${esc(b)}</b>`;
  }
  const words = title.split(" ");
  if (words.length === 1) return `<b>${esc(title)}</b>`;
  return `<b>${esc(words[0])}</b> <span>${esc(words.slice(1).join(" "))}</span>`;
}

function masthead(active) {
  const links = [
    ["lobby", "Lobby", "index.html"], ["mcu", "Sacred Timeline", "mcu.html"], ["spider", "Spider-Verse", "#"],
    ["mutant", "Mutant", "#"], ["legacy", "Legacy", "#"], ["doomsday", "Doomsday", "#"], ["system", "Design system", "system.html"],
  ];
  const gems = Object.keys(R.mcu.phases).map((n) => {
    const inPhase = R.mcu.titles.filter((t) => t.phase == n && released(t));
    const full = inPhase.length && inPhase.every((t) => seen.has(t.id));
    return `<i class="${full ? "on" : ""}" style="--c: var(--stone-${n})"></i>`;
  }).join("");
  const done = allTitles().filter((t) => released(t) && seen.has(t.id)).length;
  const total = allTitles().filter(released).length;
  document.querySelector("[data-mast]").innerHTML = `
    <div class="wrap">
      <a class="brand" href="index.html" aria-label="The Marvel Archive, home"><span class="mark" aria-hidden="true">MA</span><span class="name">Marvel <span>Archive</span></span></a>
      <nav aria-label="Main">${links.map(([k, label, href]) =>
        `<a href="${href}"${k === active ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
      <a class="gems" href="#"><span aria-hidden="true">${gems}</span><span>${done} / ${total}<span class="sr-only"> released titles watched</span></span></a>
    </div>`;
}

function redactable(text) {
  return esc(text).replace(/\[\[(.+?)\]\]/g, (_, s) => `<span class="redact" role="button" tabindex="0" aria-label="Hidden spoiler. Select to reveal">${s}</span>`);
}
document.addEventListener("click", (e) => e.target.closest(".redact")?.classList.add("shown"));
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList?.contains("redact")) { e.preventDefault(); e.target.classList.add("shown"); }
});
