/* Before Doomsday: Marvel's official pre-Avengers: Doomsday watchlist, with the visitor's progress.

   The 15 entries come from Marvel's "Countdown to Avengers: Doomsday" collection on Disney+ (published August 2026).
   Published copies of that list agree on the titles but not on the order, so they are shown in release order.
   "Loki" is one entry on Marvel's list and covers both seasons, so it maps to two archive ids.
   Each `why` note is our own; keep it to facts about the film and confirmed Doomsday cast. */

renderChrome("doomsday");

const BRIEFING = [
  { ids: ["x-men-2000"], why: "Meet the original X-Men. Patrick Stewart (Professor X), Ian McKellen (Magneto) and James Marsden (Cyclops) are all confirmed for Doomsday." },
  { ids: ["x2"], why: "Continues the same Fox X-Men story with the same core cast." },
  { ids: ["first-avenger"], why: "Steve Rogers becomes Captain America. Start here for the shield and everyone who has carried it since." },
  { ids: ["avengers"], why: "The team assembles for the first time, with Thor and Loki on opposite sides." },
  { ids: ["infinity-war"], why: "Thanos hunts the Infinity Stones in the first Avengers film from Anthony and Joe Russo, who also direct Doomsday." },
  { ids: ["endgame"], why: "Closes the Infinity Saga, the story that began with Iron Man in 2008." },
  { ids: ["loki-s1", "loki-s2"], title: "Loki (Seasons 1–2)", why: "The multiverse explained: the TVA, branching timelines and the variants of Kang. Tom Hiddleston is confirmed for Doomsday." },
  { ids: ["shang-chi"], why: "Introduces Shang-Chi (Simu Liu, confirmed for Doomsday), and the Ten Rings." },
  { ids: ["no-way-home"], why: "The multiverse cracks open, bringing visitors from other Spider-Man films." },
  { ids: ["multiverse-of-madness"], why: "Doctor Strange travels the multiverse and meets other versions of himself." },
  { ids: ["wakanda-forever"], why: "Wakanda after T'Challa, and the arrival of Namor. Letitia Wright and Tenoch Huerta Mejía are both confirmed for Doomsday." },
  { ids: ["deadpool-wolverine"], why: "The Fox mutant universe crashes into the MCU, and Channing Tatum's Gambit, confirmed for Doomsday, finally reaches the screen." },
  { ids: ["brave-new-world"], why: "Sam Wilson's first film as Captain America, with Joaquin Torres as the new Falcon." },
  { ids: ["thunderbolts"], why: "Yelena, Bucky, Red Guardian, Ghost, John Walker and Bob form an unlikely team." },
  { ids: ["first-steps"], why: "The Fantastic Four of Earth-828, all four confirmed for Doomsday." },
]
  .map((entry) => ({ ...entry, titles: entry.ids.map(titleById).filter(Boolean) }))
  .filter((entry) => {
    if (entry.titles.length === entry.ids.length) return true;
    console.warn("Before Doomsday: unknown id in", entry.ids);
    return false;
  })
  .sort((a, b) => a.titles[0].released.localeCompare(b.titles[0].released));

const doomsday = titleById("doomsday");
const entryDone = (entry) => entry.titles.every((t) => watched.has(t.id));

/* ---------- countdown ---------- */
const target = new Date(doomsday.released + "T00:00:00").getTime();
document.getElementById("clockDate").textContent = `In cinemas ${formatDate(doomsday.released)}`;
const clockTitle = document.getElementById("clock-title");
function tick() {
  let left = target - Date.now();
  if (left <= 0) {
    clockTitle.textContent = "Doomsday is here";
    document.getElementById("clockDigits").hidden = true;
    return false;
  }
  clockTitle.textContent = "Time left to prepare";
  for (const [unit, ms] of [["d", 86400000], ["h", 3600000], ["m", 60000]]) {
    const value = Math.floor(left / ms);
    left -= value * ms;
    document.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, "0");
  }
  return true;
}
if (tick()) setInterval(tick, 30000);

/* ---------- viewing time (from the data; titles without a runtime are skipped) ---------- */
function viewingTime() {
  const minutes = BRIEFING.flatMap((e) => e.titles).reduce((sum, t) => sum + (parseInt(t.length, 10) && /min/.test(t.length) ? parseInt(t.length, 10) : 0), 0);
  const episodes = BRIEFING.flatMap((e) => e.titles).filter((t) => /episodes/.test(t.length || "")).reduce((sum, t) => sum + parseInt(t.length, 10), 0);
  return `About ${Math.round(minutes / 60)} hours of film${episodes ? ` plus ${episodes} episodes of Loki` : ""}.`;
}

/* ---------- progress ---------- */
function renderProgress() {
  const done = BRIEFING.filter(entryDone).length;
  document.getElementById("readyDone").textContent = done;
  document.getElementById("readyTotal").textContent = BRIEFING.length;
  document.getElementById("readyTrack").innerHTML = BRIEFING.map((e) => `<li class="${entryDone(e) ? "on" : ""}"></li>`).join("");
  document.getElementById("readyNote").textContent = done === BRIEFING.length
    ? "Briefing complete. You're cleared for Doomsday."
    : viewingTime();
}

/* ---------- the list ---------- */
function metaLine(entry) {
  const first = entry.titles[0];
  const years = [...new Set(entry.titles.map(releaseYear))].join("–");
  const length = entry.titles.length > 1 ? `${entry.titles.length} seasons` : first.length;
  const home = first.reality === "mcu" ? "" : `From the ${REALITIES[first.reality].short} timeline`;
  return [years, first.format, length, home].filter(Boolean).map(escapeHTML).join(" · ");
}

function renderList() {
  const box = document.getElementById("dossiers");
  box.innerHTML = BRIEFING.map((entry, i) => {
    const first = entry.titles[0];
    const done = entryDone(entry);
    const title = entry.title || first.title;
    return `<li class="dossier${done ? " done" : ""}" style="--stone: var(--stone-${first.phase || 3})">
      <span class="dossier-no" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
      <a class="dossier-poster" href="title.html?id=${first.id}" tabindex="-1" aria-hidden="true">${posterHTML(first)}</a>
      <div class="dossier-body">
        <h3><a href="title.html?id=${first.id}">${escapeHTML(title)}</a></h3>
        <p class="dossier-meta">${metaLine(entry)}</p>
        <p class="dossier-why">${escapeHTML(entry.why)}</p>
      </div>
      <button class="btn dossier-mark" type="button" data-mark="${entry.ids.join(" ")}" aria-pressed="${done}">
        ${done ? "Watched ✓" : "Stamp watched"}<span class="sr-only">: ${escapeHTML(title)}</span>
      </button>
      ${done ? '<span class="stamp dossier-stamp" aria-hidden="true">Cleared</span>' : ""}
    </li>`;
  }).join("");
  hydratePosters(box);
}

function renderAll() {
  renderProgress();
  renderList();
}

const list = document.getElementById("dossiers");
list.addEventListener("click", (e) => {
  const button = e.target.closest("[data-mark]");
  if (!button) return;
  const ids = button.dataset.mark.split(" ");
  const markAll = !ids.every((id) => watched.has(id)); // Loki: one click marks (or clears) both seasons
  ids.forEach((id) => (markAll ? watched.add(id) : watched.delete(id)));
  saveWatched();
  renderAll();
  list.querySelector(`[data-mark="${ids.join(" ")}"]`)?.focus();
});

renderAll();
document.addEventListener("watchedchange", renderAll); // signed in/out, or the account list arrived
if (!prefersReducedMotion) {
  gsap.from(".dossier", { x: -24, opacity: 0, duration: 0.5, stagger: 0.04, ease: "power2.out", clearProps: "opacity,transform" });
  gsap.from(".ready-track li", { scaleY: 0, duration: 0.4, stagger: 0.03, ease: "back.out(2)", delay: 0.2, clearProps: "transform" });
}
