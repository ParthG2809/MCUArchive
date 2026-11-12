/* Shared behaviour for every page of the V4 mockup.
   Depends on ../shared/data.js (MCU_SAMPLE, PHASE_STONES, loadPoster, hydratePosters, readWatched, saveWatched). */

const WATCH_KEY = "archive-v4-watched";
const watched = readWatched(WATCH_KEY);
const PHASE_WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six"];

/* Short, spoiler-guarded summaries. [[text]] = redacted until clicked. */
const DOSSIER = {
  "iron-man": { summary: "Weapons maker Tony Stark is captured, builds a suit to escape, and comes home determined to change his company, ending with [[a public admission that he is Iron Man]].", note: "Stay after the credits. This is where the whole universe starts.", links: ["avengers", "hulk"] },
  "hulk": { summary: "Bruce Banner hides from the army in Brazil while hunting for a cure, until [[Emil Blonsky becomes the Abomination]].", note: "The odd one out, but it still matters later.", links: ["avengers"] },
  "first-avenger": { summary: "Frail Steve Rogers becomes a super-soldier to fight HYDRA in the Second World War, and [[wakes up seventy years later]].", note: "Story-order viewers: start here.", links: ["avengers", "captain-marvel"] },
  "avengers": { summary: "Nick Fury assembles Earth's heroes when Loki arrives with an army, leading to [[the Battle of New York]].", note: "The Battle of New York is referenced for a decade afterwards.", links: ["iron-man", "first-avenger", "endgame", "loki"] },
  "gotg": { summary: "Peter Quill and a crew of outlaws team up to keep a mysterious Orb out of Ronan's hands. The Orb [[holds the Power Stone]].", note: "Bring the soundtrack.", links: ["endgame"] },
  "captain-marvel": { summary: "In 1995, Carol Danvers crash-lands on Earth and teams up with a young Nick Fury, uncovering [[the human past she was made to forget]].", note: "Set in the 90s, released in 2019. Watch it either way.", links: ["first-avenger", "endgame"] },
  "endgame": { summary: "Five years after the Snap, the remaining Avengers attempt one last plan, [[a heist through time to undo it]], at a heavy cost.", note: "No post-credit scene. Listen for the sound at the very end.", links: ["avengers", "captain-marvel", "loki"] },
  "loki": { summary: "A Loki variant is arrested by the Time Variance Authority and drawn into a hunt that [[breaks the Sacred Timeline open]].", note: "Nexus event. The Multiverse starts here.", links: ["avengers", "endgame", "dpw"] },
  "nwh": { summary: "When Peter Parker's identity goes public, a spell to fix it goes wrong and [[pulls in villains, and Spider-Men, from other universes]].", note: "Cross-reality file. See the Spider-Verse timeline.", links: ["endgame"] },
  "dpw": { summary: "The TVA comes for Deadpool's world, and he recruits [[a very reluctant Wolverine variant]] to save it.", note: "Cross-reality file. Fox's X-Men universe meets the MCU.", links: ["loki"] },
  "ff": { summary: "On the retro-futurist Earth-828, Marvel's First Family faces Galactus and the Silver Surfer.", note: "Opens Phase Six.", links: ["doomsday"] },
  "doomsday": { summary: "The Avengers face Doctor Doom. In cinemas December 18, 2026.", note: "File incomplete. Awaiting release.", links: ["ff"] },
};

const byId = (id) => MCU_SAMPLE.find((t) => t.id === id);
const fileNo = (t) => String(t.release).padStart(4, "0");
const stoneVar = (phase) => `var(--stone-${phase})`;

/* ---------- masthead + footer + gauntlet badge (same on every page) ---------- */
function renderChrome(activePage) {
  const nav = [
    ["index.html", "Lobby", "lobby"],
    ["mcu.html", "Sacred Timeline", "mcu"],
    ["#", "Spider-Verse", "spider"],
    ["#", "Mutant", "mutant"],
    ["#", "Legacy", "legacy"],
    ["#", "My Gauntlet", "tracker"],
  ];
  const header = document.createElement("header");
  header.className = "masthead";
  header.innerHTML = `
    <div class="wrap mast-row">
      <a class="cornerbox" href="index.html" aria-label="Archive home"><small>No.</small><b>616</b></a>
      <a class="logo misprint" href="index.html">The Marvel Archive<span>EVERY FILM &amp; SERIES SINCE 1998</span></a>
      <nav class="mast-nav" aria-label="Main">
        ${nav.map(([href, label, key]) => `<a href="${href}"${key === activePage ? ' aria-current="page"' : ""}${href === "#" ? ' class="soon" title="Not in this mockup"' : ""}>${label}</a>`).join("")}
      </nav>
    </div>
    <div class="dateline"><div class="wrap"><span>Fan-made archive · Vol. 1</span><span>Updated November 2026</span></div></div>`;
  document.body.prepend(header);

  const foot = document.createElement("footer");
  foot.className = "foot";
  foot.innerHTML = `<div class="wrap"><span>The Marvel Archive is a fan project. Characters and posters © Marvel / Disney, used with permission.</span><span>Excelsior.</span></div>`;
  document.body.append(foot);

  const badge = document.createElement("a");
  badge.className = "gauntlet-badge";
  badge.href = "#";
  badge.title = "Your watch progress";
  document.body.append(badge);
  renderBadge();
}

function renderBadge() {
  const badge = document.querySelector(".gauntlet-badge");
  if (!badge) return;
  const gems = Object.keys(PHASE_STONES).map((n) => {
    const inPhase = MCU_SAMPLE.filter((t) => t.phase == n);
    const full = inPhase.length && inPhase.every((t) => watched.has(t.id));
    return `<i class="${full ? "on" : ""}" style="--c:${stoneVar(n)}"></i>`;
  }).join("");
  badge.innerHTML = `<span class="gems">${gems}</span><span>${watched.size}/${MCU_SAMPLE.length}</span>`;
}

function toggleWatched(id) {
  watched.has(id) ? watched.delete(id) : watched.add(id);
  saveWatched(WATCH_KEY, watched);
  renderBadge();
  return watched.has(id);
}
