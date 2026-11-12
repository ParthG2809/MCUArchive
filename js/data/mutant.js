/* =========================================================
   Reality #3: Mutant Realities (X-Men)
   Fox's X-Men saga (Earth-10005), its TV spin-offs and the X-Men animation,
   plus a cross-reference to Deadpool & Wolverine (lives in mcu.js).
   Field reference: see the header of js/data/mcu.js.
   ========================================================= */

window.ARCHIVE = window.ARCHIVE || { realities: {} };

window.ARCHIVE.realities.mutant = {
  key: "mutant",
  name: "Mutant Realities",
  short: "Mutant",
  page: "mutant.html",
  earth: "Earth-10005",
  indexLabel: "SERIES",
  defaultCanon: "separate",
  showCanon: false,
  views: [
    { key: "series", label: "By series", hint: "Grouped by film series and show", grouped: true, sort: "release" },
    { key: "release", label: "Release order", hint: "Every mutant file as audiences saw it", sort: "release" },
  ],
  sections: {
    original:      { label: "The original trilogy", sub: "2000–2006",              color: "var(--yellow)" },
    "first-class": { label: "The First Class saga", sub: "1960s–1990s · 2011–2019", color: "var(--blue)" },
    wolverine:     { label: "Wolverine",            sub: "2009–2017",              color: "var(--red)" },
    deadpool:      { label: "Deadpool",             sub: "2016–2024",              color: "var(--stone-6)" },
    "spin-offs":   { label: "Spin-offs",            sub: "1996–2020",              color: "var(--stone-5)" },
    "live-tv":     { label: "Live-action TV",       sub: "2017–2019",              color: "var(--stone-4)" },
    "anim-tv":     { label: "Animated TV",          sub: "1989–",                  color: "var(--cyan)" },
  },
  refs: [
    { id: "deadpool-wolverine", section: "deadpool" },
  ],

  titles: [
    /* ---------- Original trilogy ---------- */
    { id: "x-men-2000", title: "X-Men", format: "Film", released: "2000-07-14", section: "original", wiki: "X-Men_(film)", length: "104 min", crew: "Directed by Bryan Singer", group: "x-men-films",
      summary: "Wolverine and Rogue are drawn into the war between Professor X's X-Men and Magneto's Brotherhood of Mutants." },
    { id: "x2", title: "X2", format: "Film", released: "2003-05-02", section: "original", wiki: "X2_(film)", length: "134 min", crew: "Directed by Bryan Singer", group: "x-men-films",
      summary: "The X-Men join forces with Magneto against Colonel William Stryker, at [[the cost of Jean Grey]]." },
    { id: "last-stand", title: "X-Men: The Last Stand", format: "Film", released: "2006-05-26", section: "original", wiki: "X-Men:_The_Last_Stand", length: "104 min", crew: "Directed by Brett Ratner", group: "x-men-films",
      summary: "A 'cure' for mutation divides mutantkind as Jean Grey returns as the Phoenix." },

    /* ---------- First Class saga ---------- */
    { id: "first-class", title: "X-Men: First Class", format: "Film", released: "2011-06-03", section: "first-class", wiki: "X-Men:_First_Class", length: "132 min", crew: "Directed by Matthew Vaughn", setIn: "1962", group: "x-men-films",
      summary: "In 1962, young Charles Xavier and Erik Lehnsherr form the first X-Men during the Cuban Missile Crisis." },
    { id: "days-of-future-past", title: "X-Men: Days of Future Past", format: "Film", released: "2014-05-23", section: "first-class", wiki: "X-Men:_Days_of_Future_Past", length: "132 min", crew: "Directed by Bryan Singer", setIn: "1973 & the future", group: "x-men-films", nexus: true,
      summary: "In a dying future, Wolverine's mind is sent back to 1973 to stop the event that started it, [[rewriting the timeline]].",
      note: "Timeline split. Everything after this film runs on the rewritten timeline." },
    { id: "apocalypse", title: "X-Men: Apocalypse", format: "Film", released: "2016-05-27", section: "first-class", wiki: "X-Men:_Apocalypse", length: "144 min", crew: "Directed by Bryan Singer", setIn: "1983", group: "x-men-films",
      summary: "In 1983, the ancient mutant Apocalypse awakens and recruits four horsemen, including a grieving Magneto." },
    { id: "dark-phoenix", title: "Dark Phoenix", format: "Film", released: "2019-06-07", section: "first-class", wiki: "Dark_Phoenix_(film)", length: "114 min", crew: "Directed by Simon Kinberg", setIn: "1992", group: "x-men-films",
      summary: "A rescue mission in space leaves Jean Grey with a cosmic force she cannot control." },

    /* ---------- Wolverine ---------- */
    { id: "origins-wolverine", title: "X-Men Origins: Wolverine", format: "Film", released: "2009-05-01", section: "wolverine", wiki: "X-Men_Origins:_Wolverine", length: "107 min", crew: "Directed by Gavin Hood", group: "wolverine",
      summary: "Logan's early life, his rivalry with his brother Victor, and the Weapon X program that bonded adamantium to his bones." },
    { id: "the-wolverine", title: "The Wolverine", format: "Film", released: "2013-07-26", section: "wolverine", wiki: "The_Wolverine_(film)", length: "126 min", crew: "Directed by James Mangold", group: "wolverine",
      summary: "Logan travels to Japan, where a man whose life he once saved offers to take away his healing factor." },
    { id: "logan", title: "Logan", format: "Film", released: "2017-03-03", section: "wolverine", wiki: "Logan_(film)", length: "137 min", crew: "Directed by James Mangold", setIn: "2029", group: "wolverine",
      summary: "In 2029, an ailing Logan protects Laura, a young mutant girl, on a journey across America." },

    /* ---------- Deadpool ---------- */
    { id: "deadpool", title: "Deadpool", format: "Film", released: "2016-02-12", section: "deadpool", wiki: "Deadpool_(film)", length: "108 min", crew: "Directed by Tim Miller", group: "deadpool",
      summary: "Mercenary Wade Wilson survives an experiment that leaves him scarred and nearly unkillable, then hunts the man responsible." },
    { id: "deadpool-2", title: "Deadpool 2", format: "Film", released: "2018-05-18", section: "deadpool", wiki: "Deadpool_2", length: "119 min", crew: "Directed by David Leitch", group: "deadpool",
      summary: "Deadpool forms X-Force to protect a young mutant from Cable, a soldier from the future." },

    /* ---------- Spin-offs ---------- */
    { id: "generation-x", title: "Generation X", format: "Film", released: "1996-02-20", section: "spin-offs", wiki: "Generation_X_(film)", group: "mutant-spin-offs",
      summary: "A Fox TV movie following young mutants at Xavier's school, led by Emma Frost and Banshee." },
    { id: "new-mutants", title: "The New Mutants", format: "Film", released: "2020-08-28", section: "spin-offs", wiki: "The_New_Mutants_(film)", length: "94 min", crew: "Directed by Josh Boone", group: "mutant-spin-offs",
      summary: "Five young mutants held in a secret facility are haunted by their worst fears." },

    /* ---------- Live-action TV ---------- */
    { id: "legion", title: "Legion", format: "Series", released: "2017-02-08", section: "live-tv", wiki: "Legion_(TV_series)", length: "3 seasons", crew: "Created by Noah Hawley", group: "mutant-tv",
      summary: "David Haller, diagnosed with schizophrenia, discovers he may be one of the most powerful mutants alive." },
    { id: "the-gifted", title: "The Gifted", format: "Series", released: "2017-10-02", section: "live-tv", wiki: "The_Gifted_(American_TV_series)", length: "2 seasons", crew: "Created by Matt Nix", group: "mutant-tv",
      summary: "A suburban family goes on the run after their children's mutant abilities are revealed." },

    /* ---------- Animated TV ---------- */
    { id: "pryde-of-the-x-men", title: "Pryde of the X-Men", format: "Special", animated: true, released: "1989-09-16", section: "anim-tv", wiki: "Pryde_of_the_X-Men", group: "x-men-animated",
      summary: "An unsold pilot that brings Kitty Pryde into the X-Men, with a famously Australian Wolverine." },
    { id: "x-men-tas", title: "X-Men: The Animated Series", format: "Series", animated: true, released: "1992-10-31", section: "anim-tv", wiki: "X-Men:_The_Animated_Series", length: "5 seasons", group: "x-men-animated",
      summary: "The Fox Kids classic that brought the comics' biggest X-Men stories to television." },
    { id: "x-men-evolution", title: "X-Men: Evolution", format: "Series", animated: true, released: "2000-11-04", section: "anim-tv", wiki: "X-Men:_Evolution", length: "4 seasons", group: "x-men-animated",
      summary: "The X-Men reimagined as teenagers attending Bayville High." },
    { id: "wolverine-and-the-x-men", title: "Wolverine and the X-Men", format: "Series", animated: true, released: "2009-01-23", section: "anim-tv", wiki: "Wolverine_and_the_X-Men_(TV_series)", length: "26 episodes", group: "x-men-animated",
      summary: "After the Xavier Institute is destroyed, Wolverine reunites the scattered X-Men." },
    { id: "x-men-97", title: "X-Men '97 (Season 1)", format: "Series", animated: true, released: "2024-03-20", section: "anim-tv", wiki: "X-Men_'97", length: "10 episodes", crew: "Created by Beau DeMayo", group: "x-men-animated",
      summary: "A revival that picks up where X-Men: The Animated Series left off, with the team learning to live without Professor X.",
      note: "Made by Marvel Studios Animation, continuing the 1992 series' own universe." },
    { id: "x-men-97-s2", title: "X-Men '97 (Season 2)", format: "Series", animated: true, released: "2026-07-01", section: "anim-tv", wiki: "X-Men_'97", group: "x-men-animated",
      summary: "The X-Men '97 revival returns for a second season on Disney+." },
  ],
};
