/* Lobby: marquee (next film), countdown, now-streaming ticket, reality doors */

renderChrome("lobby");

const now = new Date();
const byDate = [...ALL_TITLES].sort((a, b) => a.released.localeCompare(b.released));

/* ---------- marquee: the next film in cinemas, or the latest one if nothing is scheduled ---------- */
const nextFilm = byDate.find((t) => t.format === "Film" && !isReleased(t, now));
const featured = nextFilm || [...byDate].reverse().find((t) => t.format === "Film");
const board = document.getElementById("board");
board.href = `title.html?id=${featured.id}`;

// Split "Avengers: Doomsday" into two big rows, otherwise one row.
const [lineOne, lineTwo] = featured.title.includes(":") ? featured.title.split(/:\s*/, 2) : [featured.title, ""];
board.innerHTML = `
  <p data-letters>${nextFilm ? "Next on the big screen" : "Last on the big screen"}</p>
  <p class="big" data-letters>${escapeHTML(lineOne)}</p>
  ${lineTwo ? `<p class="big red" data-letters>${escapeHTML(lineTwo)}</p>` : ""}
  <p data-letters>${nextFilm ? "Opens" : "Opened"} ${escapeHTML(formatDate(featured.released))}</p>`;
board.setAttribute("aria-label", `${featured.title}, ${nextFilm ? "opens" : "opened"} ${formatDate(featured.released)}`);

// Letterboard: each character becomes a slightly crooked tile.
board.querySelectorAll("[data-letters]").forEach((p) => {
  p.setAttribute("aria-hidden", "true");
  p.innerHTML = [...p.textContent].map((ch) => ch === " " ? "&nbsp;" :
    `<span class="ch" style="transform: rotate(${(Math.random() * 4 - 2).toFixed(1)}deg) translateY(${(Math.random() * 2 - 1).toFixed(1)}px)">${escapeHTML(ch)}</span>`).join("");
});

document.querySelectorAll(".bulbs").forEach((row) => (row.innerHTML = "<i></i>".repeat(22)));

/* ---------- countdown ---------- */
const countdown = document.getElementById("countdown");
if (nextFilm) {
  const target = new Date(nextFilm.released + "T00:00:00").getTime();
  const units = { d: 86400000, h: 3600000, m: 60000, s: 1000 };
  const tick = () => {
    let left = Math.max(0, target - Date.now());
    for (const [unit, ms] of Object.entries(units)) {
      const value = Math.floor(left / ms);
      left -= value * ms;
      countdown.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, "0");
    }
  };
  tick();
  setInterval(tick, 1000);
} else {
  countdown.hidden = true;
}

/* ---------- ticket: the most recent series that premiered in the last 120 days ---------- */
const recentSeries = [...byDate].reverse().find((t) =>
  t.format === "Series" && isReleased(t, now) && (now - new Date(t.released + "T00:00:00")) / 86400000 <= 120);
if (recentSeries) {
  const ticket = document.getElementById("ticket");
  ticket.href = `title.html?id=${recentSeries.id}`;
  document.getElementById("ticketTitle").textContent = recentSeries.title;
  document.getElementById("ticketSince").textContent = `Premiered ${formatDate(recentSeries.released)}`;
  ticket.hidden = false;
}

/* ---------- archive in numbers (shown by the Command Deck theme only), computed from the data ---------- */
const releasedFilmMinutes = REALITIES.mcu.titles
  .filter((t) => t.format === "Film" && isReleased(t, now) && /min/.test(t.length || ""))
  .reduce((sum, t) => sum + parseInt(t.length, 10), 0);
const firstYear = Math.min(...ALL_TITLES.map((t) => +releaseYear(t)));
document.getElementById("deckStats").innerHTML = [
  [ALL_TITLES.length, "films & series on file"],
  [Object.keys(REALITIES).length, "realities, each with its own continuity"],
  [Math.round(releasedFilmMinutes / 60), "hours of MCU films released so far"],
  [now.getFullYear() - firstYear, `years of Marvel on screen, since ${firstYear}`],
].map(([n, label]) => `<div class="deck-stat"><b>${n}</b><span>${escapeHTML(label)}</span></div>`).join("");

/* ---------- doors ---------- */
document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = entriesOf(REALITIES[el.dataset.count]).length));
hydratePosters();

if (!prefersReducedMotion) {
  gsap.from(".board .ch", { opacity: 0, y: -8, duration: 0.25, stagger: 0.012, ease: "power1.out" });
  gsap.from(".cover", { y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2, clearProps: "opacity,transform" });
}
