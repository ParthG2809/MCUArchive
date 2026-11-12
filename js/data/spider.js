/* =========================================================
   Reality #2: The Spider-Verse
   Every screen Spider-Man outside the MCU, plus cross-references
   to the MCU's Tom Holland films (they live in mcu.js).
   Field reference: see the header of js/data/mcu.js.
   ========================================================= */

window.ARCHIVE = window.ARCHIVE || { realities: {} };

window.ARCHIVE.realities.spider = {
  key: "spider",
  name: "The Spider-Verse",
  short: "Spider-Verse",
  page: "spider-verse.html",
  earth: "Multiple Earths",
  indexLabel: "SERIES",
  defaultCanon: "separate",
  showCanon: false,
  views: [
    { key: "series", label: "By series", hint: "Each Spider-Man in his own web", grouped: true, sort: "release" },
    { key: "release", label: "Release order", hint: "Every Spider-Man as audiences met him", sort: "release" },
  ],
  sections: {
    raimi:     { label: "The Raimi trilogy",        sub: "Tobey Maguire · 2002–2007",   color: "var(--red)" },
    webb:      { label: "The Amazing duology",      sub: "Andrew Garfield · 2012–2014", color: "var(--blue)" },
    holland:   { label: "The MCU Spider-Man",       sub: "Tom Holland · 2016–",         color: "var(--stone-4)" },
    animated:  { label: "Spider-Verse animation",   sub: "Miles Morales · 2018–",       color: "var(--stone-5)" },
    ssu:       { label: "Sony's Spider-Man Universe", sub: "Venom and friends · 2018–2024", color: "var(--ink-2)" },
    "live-tv": { label: "Live-action TV",           sub: "1977–",                       color: "var(--stone-6)" },
    "anim-tv": { label: "Animated TV",              sub: "1967–",                       color: "var(--cyan)" },
  },
  refs: [
    { id: "civil-war", section: "holland" },
    { id: "homecoming", section: "holland" },
    { id: "infinity-war", section: "holland" },
    { id: "endgame", section: "holland" },
    { id: "far-from-home", section: "holland" },
    { id: "no-way-home", section: "holland" },
    { id: "brand-new-day", section: "holland" },
  ],

  titles: [
    /* ---------- Raimi ---------- */
    { id: "spider-man-2002", title: "Spider-Man", format: "Film", released: "2002-05-03", section: "raimi", wiki: "Spider-Man_(2002_film)", length: "121 min", crew: "Directed by Sam Raimi", group: "raimi", links: ["no-way-home"],
      summary: "Bitten by a genetically engineered spider, Peter Parker becomes Spider-Man and faces the Green Goblin, [[who is his best friend's father]]." },
    { id: "spider-man-2", title: "Spider-Man 2", format: "Film", released: "2004-06-30", section: "raimi", wiki: "Spider-Man_2", length: "127 min", crew: "Directed by Sam Raimi", group: "raimi",
      summary: "Peter struggles to balance his life and his powers while Doctor Octopus, a scientist fused to his own mechanical arms, threatens New York." },
    { id: "spider-man-3", title: "Spider-Man 3", format: "Film", released: "2007-05-04", section: "raimi", wiki: "Spider-Man_3", length: "139 min", crew: "Directed by Sam Raimi", group: "raimi",
      summary: "An alien symbiote darkens Peter's personality as he faces Sandman, a new Goblin and [[Venom]]." },

    /* ---------- Webb ---------- */
    { id: "amazing-spider-man", title: "The Amazing Spider-Man", format: "Film", released: "2012-07-03", section: "webb", wiki: "The_Amazing_Spider-Man_(film)", length: "136 min", crew: "Directed by Marc Webb", group: "webb", links: ["no-way-home"],
      summary: "Peter Parker digs into his parents' disappearance, falls for Gwen Stacy, and faces Dr. Curt Connors, the Lizard." },
    { id: "amazing-spider-man-2", title: "The Amazing Spider-Man 2", format: "Film", released: "2014-05-02", section: "webb", wiki: "The_Amazing_Spider-Man_2", length: "142 min", crew: "Directed by Marc Webb", group: "webb",
      summary: "Peter faces Electro and Harry Osborn's Green Goblin, at [[the cost of Gwen Stacy's life]]." },

    /* ---------- Spider-Verse animation ---------- */
    { id: "into-the-spider-verse", title: "Spider-Man: Into the Spider-Verse", format: "Film", animated: true, released: "2018-12-14", section: "animated", wiki: "Spider-Man:_Into_the_Spider-Verse", length: "117 min", crew: "Directed by Bob Persichetti, Peter Ramsey and Rodney Rothman", group: "spider-verse",
      summary: "Brooklyn teenager Miles Morales becomes Spider-Man and teams up with Spider-People from other dimensions.",
      note: "Won the Academy Award for Best Animated Feature." },
    { id: "across-the-spider-verse", title: "Spider-Man: Across the Spider-Verse", format: "Film", animated: true, released: "2023-06-02", section: "animated", wiki: "Spider-Man:_Across_the_Spider-Verse", length: "140 min", crew: "Directed by Joaquim Dos Santos, Kemp Powers and Justin K. Thompson", group: "spider-verse", nexus: true,
      summary: "Miles follows Gwen Stacy into the Multiverse and clashes with the Spider-Society over [[a tragedy they say must happen to his father]]." },
    { id: "beyond-the-spider-verse", title: "Spider-Man: Beyond the Spider-Verse", format: "Film", animated: true, released: "2027-06-18", section: "animated", wiki: "Spider-Man:_Beyond_the_Spider-Verse", group: "spider-verse",
      summary: "The final chapter of Miles Morales's Spider-Verse trilogy." },

    /* ---------- Sony's Spider-Man Universe ---------- */
    { id: "venom", title: "Venom", format: "Film", released: "2018-10-05", section: "ssu", wiki: "Venom_(2018_film)", length: "112 min", crew: "Directed by Ruben Fleischer", group: "venom",
      summary: "Journalist Eddie Brock bonds with an alien symbiote and becomes Venom." },
    { id: "let-there-be-carnage", title: "Venom: Let There Be Carnage", format: "Film", released: "2021-10-01", section: "ssu", wiki: "Venom:_Let_There_Be_Carnage", length: "97 min", crew: "Directed by Andy Serkis", group: "venom", links: ["no-way-home"],
      summary: "Eddie and Venom face serial killer Cletus Kasady, who bonds with a symbiote of his own and becomes Carnage.",
      note: "The mid-credits scene briefly pulls Eddie into the MCU." },
    { id: "morbius", title: "Morbius", format: "Film", released: "2022-04-01", section: "ssu", wiki: "Morbius_(film)", length: "104 min", crew: "Directed by Daniel Espinosa", group: "ssu",
      summary: "Dr. Michael Morbius tries to cure his rare blood disease and turns himself into a living vampire." },
    { id: "madame-web", title: "Madame Web", format: "Film", released: "2024-02-14", section: "ssu", wiki: "Madame_Web_(film)", length: "116 min", crew: "Directed by S. J. Clarkson", group: "ssu",
      summary: "Paramedic Cassandra Webb starts seeing the future and protects three young women from a man hunting them." },
    { id: "the-last-dance", title: "Venom: The Last Dance", format: "Film", released: "2024-10-25", section: "ssu", wiki: "Venom:_The_Last_Dance", length: "109 min", crew: "Directed by Kelly Marcel", group: "venom",
      summary: "Hunted by forces from both their worlds, Eddie and Venom go on the run [[for one final time together]]." },
    { id: "kraven", title: "Kraven the Hunter", format: "Film", released: "2024-12-13", section: "ssu", wiki: "Kraven_the_Hunter_(film)", length: "127 min", crew: "Directed by J. C. Chandor", group: "ssu",
      summary: "After a lion attack gives him animal-like abilities, Sergei Kravinoff becomes a ruthless hunter of criminals." },

    /* ---------- Live-action TV ---------- */
    { id: "amazing-spider-man-1977", title: "The Amazing Spider-Man (1977)", format: "Series", released: "1977-09-14", section: "live-tv", wiki: "The_Amazing_Spider-Man_(TV_series)", length: "2 seasons", group: "spider-tv",
      summary: "Nicholas Hammond plays Peter Parker in CBS's live-action series, which began with a TV-movie pilot." },
    { id: "toei-spider-man", title: "Spider-Man (Toei, 1978)", format: "Series", released: "1978-05-17", section: "live-tv", wiki: "Spider-Man_(Japanese_TV_series)", length: "41 episodes", group: "spider-tv",
      summary: "Motorcycle racer Takuya Yamashiro gains spider powers and pilots a giant robot, Leopardon, in Toei's Japanese series.",
      note: "Its giant-robot idea went on to shape the Super Sentai shows." },
    { id: "spider-noir", title: "Spider-Noir", format: "Series", released: "2026-05-25", section: "live-tv", wiki: "Spider-Noir", length: "8 episodes", group: "spider-tv",
      summary: "In 1930s New York, Nicolas Cage plays Ben Reilly, a down-on-his-luck private investigator haunted by his past as the city's only superhero." },

    /* ---------- Animated TV ---------- */
    { id: "spider-man-1967", title: "Spider-Man (1967)", format: "Series", animated: true, released: "1967-09-09", section: "anim-tv", wiki: "Spider-Man_(1967_TV_series)", length: "3 seasons", group: "spider-tv",
      summary: "The first Spider-Man cartoon, now best remembered for its theme song." },
    { id: "spider-man-1981", title: "Spider-Man (1981)", format: "Series", animated: true, released: "1981-09-12", section: "anim-tv", wiki: "Spider-Man_(1981_TV_series)", length: "26 episodes", group: "spider-tv",
      summary: "A syndicated solo series pitting Spider-Man against his classic villains." },
    { id: "amazing-friends", title: "Spider-Man and His Amazing Friends", format: "Series", animated: true, released: "1981-09-12", section: "anim-tv", wiki: "Spider-Man_and_His_Amazing_Friends", length: "3 seasons", group: "spider-tv",
      summary: "Spider-Man shares a secret base with Iceman and Firestar, a hero created for the show." },
    { id: "spider-man-tas", title: "Spider-Man: The Animated Series", format: "Series", animated: true, released: "1994-11-19", section: "anim-tv", wiki: "Spider-Man:_The_Animated_Series", length: "5 seasons", group: "spider-tv",
      summary: "Fox Kids' long-running series, which [[ends with a team-up of Spider-Men from across the multiverse]]." },
    { id: "spider-man-unlimited", title: "Spider-Man Unlimited", format: "Series", animated: true, released: "1999-10-02", section: "anim-tv", wiki: "Spider-Man_Unlimited", length: "13 episodes", group: "spider-tv",
      summary: "Spider-Man follows Venom and Carnage to Counter-Earth, a world ruled by the High Evolutionary." },
    { id: "new-animated-series", title: "Spider-Man: The New Animated Series", format: "Series", animated: true, released: "2003-07-11", section: "anim-tv", wiki: "Spider-Man:_The_New_Animated_Series", length: "13 episodes", group: "spider-tv",
      summary: "A computer-animated MTV series that picks up after the 2002 film." },
    { id: "spectacular-spider-man", title: "The Spectacular Spider-Man", format: "Series", animated: true, released: "2008-03-08", section: "anim-tv", wiki: "The_Spectacular_Spider-Man_(TV_series)", length: "2 seasons", group: "spider-tv",
      summary: "Peter's second year of high school, much loved for its takes on the classic villains." },
    { id: "ultimate-spider-man", title: "Ultimate Spider-Man", format: "Series", animated: true, released: "2012-04-01", section: "anim-tv", wiki: "Ultimate_Spider-Man_(TV_series)", length: "4 seasons", group: "spider-tv",
      summary: "Spider-Man trains with S.H.I.E.L.D. alongside a team of young heroes." },
    { id: "spider-man-2017", title: "Marvel's Spider-Man (2017)", format: "Series", animated: true, released: "2017-08-19", section: "anim-tv", wiki: "Spider-Man_(2017_TV_series)", length: "3 seasons", group: "spider-tv",
      summary: "A newly bitten Peter Parker learns the ropes as a student at Horizon High." },
    { id: "spidey-amazing-friends", title: "Spidey and His Amazing Friends", format: "Series", animated: true, released: "2021-08-06", section: "anim-tv", wiki: "Spidey_and_His_Amazing_Friends", group: "spider-tv",
      summary: "A preschool series in which Peter, Miles and Gwen team up as young Spider-heroes." },
    { id: "friendly-neighborhood", title: "Your Friendly Neighborhood Spider-Man", format: "Series", animated: true, released: "2025-01-29", section: "anim-tv", wiki: "Your_Friendly_Neighborhood_Spider-Man", length: "10 episodes", crew: "Created by Jeff Trammell", group: "spider-tv",
      summary: "Peter Parker's first year as Spider-Man, in a universe where Norman Osborn becomes his mentor.",
      note: "Made by Marvel Studios Animation, but set in its own alternate universe." },
  ],
};
