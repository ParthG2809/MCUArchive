/* Shared SAMPLE data for the design mockups only.
   The real site will use a complete, verified dataset. */

const PHASE_STONES = {
  1: { stone: "Space",   color: "#3D7BFF" },
  2: { stone: "Mind",    color: "#F2C230" },
  3: { stone: "Reality", color: "#E8333B" },
  4: { stone: "Power",   color: "#A35BFF" },
  5: { stone: "Time",    color: "#2BD47D" },
  6: { stone: "Soul",    color: "#FF8A2A" },
};

// release = release order, chrono = in-universe order (sample positions)
const MCU_SAMPLE = [
  { id: "iron-man", title: "Iron Man", wiki: "Iron_Man_(2008_film)", year: 2008, setIn: "2010", phase: 1, type: "Film", release: 1, chrono: 3, runtime: "126 min", director: "Jon Favreau" },
  { id: "hulk", title: "The Incredible Hulk", wiki: "The_Incredible_Hulk_(film)", year: 2008, setIn: "2010", phase: 1, type: "Film", release: 2, chrono: 4, runtime: "112 min", director: "Louis Leterrier" },
  { id: "first-avenger", title: "Captain America: The First Avenger", wiki: "Captain_America:_The_First_Avenger", year: 2011, setIn: "1942–45", phase: 1, type: "Film", release: 3, chrono: 1, runtime: "124 min", director: "Joe Johnston" },
  { id: "avengers", title: "The Avengers", wiki: "The_Avengers_(2012_film)", year: 2012, setIn: "2012", phase: 1, type: "Film", release: 4, chrono: 5, runtime: "143 min", director: "Joss Whedon" },
  { id: "gotg", title: "Guardians of the Galaxy", wiki: "Guardians_of_the_Galaxy_(film)", year: 2014, setIn: "2014", phase: 2, type: "Film", release: 5, chrono: 6, runtime: "121 min", director: "James Gunn" },
  { id: "captain-marvel", title: "Captain Marvel", wiki: "Captain_Marvel_(film)", year: 2019, setIn: "1995", phase: 3, type: "Film", release: 6, chrono: 2, runtime: "123 min", director: "Anna Boden & Ryan Fleck" },
  { id: "endgame", title: "Avengers: Endgame", wiki: "Avengers:_Endgame", year: 2019, setIn: "2018–23", phase: 3, type: "Film", release: 7, chrono: 7, runtime: "181 min", director: "Anthony & Joe Russo" },
  { id: "loki", title: "Loki", wiki: "Loki_(TV_series)", year: 2021, setIn: "Outside time", phase: 4, type: "Series", release: 8, chrono: 8, runtime: "2 seasons", director: "Kate Herron, Justin Benson & Aaron Moorhead", nexus: true },
  { id: "nwh", title: "Spider-Man: No Way Home", wiki: "Spider-Man:_No_Way_Home", year: 2021, setIn: "2024", phase: 4, type: "Film", release: 9, chrono: 9, runtime: "148 min", director: "Jon Watts", nexus: true },
  { id: "dpw", title: "Deadpool & Wolverine", wiki: "Deadpool_&_Wolverine", year: 2024, setIn: "2024", phase: 5, type: "Film", release: 10, chrono: 10, runtime: "128 min", director: "Shawn Levy", nexus: true },
  { id: "ff", title: "The Fantastic Four: First Steps", wiki: "The_Fantastic_Four:_First_Steps", year: 2025, setIn: "Earth-828", phase: 6, type: "Film", release: 11, chrono: 11, runtime: "115 min", director: "Matt Shakman" },
  { id: "doomsday", title: "Avengers: Doomsday", wiki: "Avengers:_Doomsday", year: 2026, setIn: "TBA", phase: 6, type: "Film", release: 12, chrono: 12, runtime: "TBA", director: "Anthony & Joe Russo", upcoming: true },
];

/* Poster loader: Wikipedia REST summary API (no key, CORS-enabled).
   Resolves to an image URL, or null so the card keeps its typographic fallback. */
const posterCache = new Map();
function loadPoster(wikiTitle) {
  if (posterCache.has(wikiTitle)) return posterCache.get(wikiTitle);
  const request = fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(wikiTitle))
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => (data && (data.originalimage || data.thumbnail) ? (data.originalimage || data.thumbnail).source : null))
    .catch(() => null);
  posterCache.set(wikiTitle, request);
  return request;
}

/* Fill every <img data-wiki="..."> on the page; mark its container once loaded. */
function hydratePosters(root = document) {
  root.querySelectorAll("img[data-wiki]").forEach((img) => {
    loadPoster(img.dataset.wiki).then((src) => {
      if (!src) return;
      img.addEventListener("load", () => img.closest("[data-poster]")?.classList.add("has-poster"), { once: true });
      img.src = src;
    });
  });
}

/* Watched-state helpers (localStorage may be unavailable). */
function readWatched(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch { return new Set(); }
}
function saveWatched(key, set) {
  try { localStorage.setItem(key, JSON.stringify([...set])); } catch { /* ignore */ }
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
