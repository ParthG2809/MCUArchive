/* =========================================================
   Reality #4: Legacy Files
   Marvel on screen before and beside the MCU: early adaptations, Blade,
   the 2000s films, Marvel Television (ABC/Freeform/Hulu), the Netflix
   Defenders saga and other Marvel animation.

   canon: "recognised" = listed on Disney+'s official MCU timeline (Netflix shows, January 2024)
          "disputed"   = made as MCU tie-ins but never confirmed by Marvel Studios
          "separate"   = its own continuity (default)
   Field reference: see the header of js/data/mcu.js.
   ========================================================= */

window.ARCHIVE = window.ARCHIVE || { realities: {} };

window.ARCHIVE.realities.legacy = {
  key: "legacy",
  name: "Legacy Files",
  short: "Legacy",
  page: "legacy.html",
  earth: "Various",
  indexLabel: "LANES",
  defaultCanon: "separate",
  showCanon: true,
  views: [
    { key: "lanes", label: "By lane", hint: "Grouped by era and studio", grouped: true, sort: "release" },
    { key: "release", label: "Release order", hint: "Every legacy file as audiences saw it", sort: "release" },
  ],
  sections: {
    pioneers:  { label: "Early adaptations",      sub: "Serials and TV movies · 1944–1998", color: "var(--stone-6)" },
    blade:     { label: "Blade",                  sub: "1998–2006",                         color: "var(--red)" },
    films2000: { label: "The 2000s films",        sub: "Fox, Sony, Universal & Lionsgate · 2003–2015", color: "var(--blue)" },
    abc:       { label: "Marvel Television",      sub: "ABC, Freeform & Hulu · 2013–2020",  color: "var(--stone-5)" },
    netflix:   { label: "The Defenders saga",     sub: "Netflix · 2015–2019, revived 2025", color: "var(--stone-4)" },
    animation: { label: "Animated series",        sub: "1966–",                             color: "var(--cyan)" },
  },
  refs: [
    { id: "born-again-s1", section: "netflix" },
    { id: "born-again-s2", section: "netflix" },
  ],

  titles: [
    /* ---------- Early adaptations ---------- */
    { id: "captain-america-1944", title: "Captain America (1944 serial)", format: "Series", released: "1944-02-05", section: "pioneers", wiki: "Captain_America_(serial)", length: "15 chapters", group: "captain-america-classic",
      summary: "Republic Pictures' 15-chapter cinema serial, the first time a Marvel (then Timely) character reached the screen." },
    { id: "incredible-hulk-1977", title: "The Incredible Hulk (1977)", format: "Series", released: "1977-11-04", section: "pioneers", wiki: "The_Incredible_Hulk_(1977_TV_series)", length: "5 seasons", group: "hulk-classic",
      summary: "Bill Bixby plays Dr. David Banner, drifting across America, with Lou Ferrigno as the Hulk." },
    { id: "doctor-strange-1978", title: "Dr. Strange (1978)", format: "Film", released: "1978-09-06", section: "pioneers", wiki: "Dr._Strange_(1978_film)", group: "classic-tv-movies",
      summary: "A CBS TV-movie pilot in which psychiatrist Stephen Strange is chosen to become a sorcerer." },
    { id: "captain-america-1979", title: "Captain America (1979)", format: "Film", released: "1979-01-19", section: "pioneers", wiki: "Captain_America_(1979_film)", group: "captain-america-classic",
      summary: "A CBS TV movie in which former Marine Steve Rogers takes up his father's legacy as Captain America." },
    { id: "howard-the-duck", title: "Howard the Duck", format: "Film", released: "1986-08-01", section: "pioneers", wiki: "Howard_the_Duck_(film)", length: "110 min", crew: "Directed by Willard Huyck", group: "classic-tv-movies",
      summary: "A duck from another planet is pulled to Cleveland, where he falls in with rock singer Beverly Switzler.",
      note: "Howard later turns up in the MCU, starting with a cameo in Guardians of the Galaxy." },
    { id: "nick-fury-1998", title: "Nick Fury: Agent of S.H.I.E.L.D.", format: "Film", released: "1998-05-26", section: "pioneers", wiki: "Nick_Fury:_Agent_of_S.H.I.E.L.D._(film)", group: "classic-tv-movies",
      summary: "David Hasselhoff plays Nick Fury, pulled out of retirement to stop HYDRA in a Fox TV movie." },

    /* ---------- Blade ---------- */
    { id: "blade", title: "Blade", format: "Film", released: "1998-08-21", section: "blade", wiki: "Blade_(1998_film)", length: "120 min", crew: "Directed by Stephen Norrington", group: "blade",
      summary: "Half-vampire Blade hunts the creatures that killed his mother and stops a plot to summon a blood god.",
      note: "Marvel's first big box-office hit, ten years before Iron Man." },
    { id: "blade-2", title: "Blade II", format: "Film", released: "2002-03-22", section: "blade", wiki: "Blade_II", length: "117 min", crew: "Directed by Guillermo del Toro", group: "blade",
      summary: "Blade forms an uneasy alliance with vampires against the Reapers, a new breed that feeds on vampires." },
    { id: "blade-trinity", title: "Blade: Trinity", format: "Film", released: "2004-12-08", section: "blade", wiki: "Blade:_Trinity", length: "113 min", crew: "Directed by David S. Goyer", group: "blade",
      summary: "Framed for murder, Blade teams up with the Nightstalkers to face Dracula himself." },
    { id: "blade-the-series", title: "Blade: The Series", format: "Series", released: "2006-06-28", section: "blade", wiki: "Blade:_The_Series", length: "12 episodes", group: "blade",
      summary: "Kirk \"Sticky Fingaz\" Jones takes over as Blade in a Spike TV series set in Detroit." },

    /* ---------- The 2000s films ---------- */
    { id: "daredevil-2003", title: "Daredevil (2003)", format: "Film", released: "2003-02-14", section: "films2000", wiki: "Daredevil_(film)", length: "103 min", crew: "Directed by Mark Steven Johnson", group: "daredevil-film",
      summary: "Blind lawyer Matt Murdock fights crime as Daredevil and clashes with the Kingpin and Bullseye." },
    { id: "hulk-2003", title: "Hulk", format: "Film", released: "2003-06-20", section: "films2000", wiki: "Hulk_(film)", length: "138 min", crew: "Directed by Ang Lee", group: "hulk-classic",
      summary: "An accident in Bruce Banner's lab unlocks the Hulk, and a buried secret about his father." },
    { id: "punisher-2004", title: "The Punisher (2004)", format: "Film", released: "2004-04-16", section: "films2000", wiki: "The_Punisher_(2004_film)", length: "124 min", crew: "Directed by Jonathan Hensleigh", group: "punisher",
      summary: "After his family is murdered, former agent Frank Castle becomes the Punisher." },
    { id: "elektra", title: "Elektra", format: "Film", released: "2005-01-14", section: "films2000", wiki: "Elektra_(2005_film)", length: "97 min", crew: "Directed by Rob Bowman", group: "daredevil-film",
      summary: "The assassin Elektra protects a father and daughter from the ninja clan known as the Hand." },
    { id: "fantastic-four-2005", title: "Fantastic Four (2005)", format: "Film", released: "2005-07-08", section: "films2000", wiki: "Fantastic_Four_(2005_film)", length: "106 min", crew: "Directed by Tim Story", group: "fantastic-four-fox",
      summary: "Four astronauts gain powers from a cosmic storm and face Victor von Doom." },
    { id: "ghost-rider", title: "Ghost Rider", format: "Film", released: "2007-02-16", section: "films2000", wiki: "Ghost_Rider_(2007_film)", length: "110 min", crew: "Directed by Mark Steven Johnson", group: "ghost-rider",
      summary: "Stunt rider Johnny Blaze sells his soul to save his father and becomes the Ghost Rider." },
    { id: "rise-of-the-silver-surfer", title: "Fantastic Four: Rise of the Silver Surfer", format: "Film", released: "2007-06-15", section: "films2000", wiki: "Fantastic_Four:_Rise_of_the_Silver_Surfer", length: "92 min", crew: "Directed by Tim Story", group: "fantastic-four-fox",
      summary: "The Fantastic Four face the Silver Surfer, herald of the planet-devouring Galactus." },
    { id: "punisher-war-zone", title: "Punisher: War Zone", format: "Film", released: "2008-12-05", section: "films2000", wiki: "Punisher:_War_Zone", length: "103 min", crew: "Directed by Lexi Alexander", group: "punisher",
      summary: "Frank Castle's war on the mob creates a new enemy: the disfigured gangster Jigsaw." },
    { id: "spirit-of-vengeance", title: "Ghost Rider: Spirit of Vengeance", format: "Film", released: "2012-02-17", section: "films2000", wiki: "Ghost_Rider:_Spirit_of_Vengeance", length: "96 min", crew: "Directed by Mark Neveldine & Brian Taylor", group: "ghost-rider",
      summary: "Hiding in Eastern Europe, Johnny Blaze is asked to protect a boy the Devil wants for himself." },
    { id: "fantastic-four-2015", title: "Fantastic Four (2015)", format: "Film", released: "2015-08-07", section: "films2000", wiki: "Fantastic_Four_(2015_film)", length: "100 min", crew: "Directed by Josh Trank", group: "fantastic-four-fox",
      summary: "Four young scientists gain powers after a teleportation experiment goes wrong." },

    /* ---------- Marvel Television ---------- */
    { id: "agents-of-shield", title: "Agents of S.H.I.E.L.D.", format: "Series", released: "2013-09-24", section: "abc", wiki: "Agents_of_S.H.I.E.L.D.", length: "7 seasons", group: "shield-tv", canon: "disputed", links: ["avengers", "winter-soldier"],
      summary: "Agent Phil Coulson, [[somehow alive after The Avengers]], leads a small S.H.I.E.L.D. team through seven seasons.",
      note: "Built to tie into the films, but Marvel Studios has never confirmed it." },
    { id: "agent-carter", title: "Agent Carter", format: "Series", released: "2015-01-06", section: "abc", wiki: "Agent_Carter_(TV_series)", length: "2 seasons", group: "shield-tv", canon: "disputed", links: ["first-avenger"],
      summary: "In 1946, Peggy Carter balances life at the Strategic Scientific Reserve with secret missions for Howard Stark." },
    { id: "inhumans", title: "Inhumans", format: "Series", released: "2017-09-29", section: "abc", wiki: "Inhumans_(TV_series)", length: "8 episodes", group: "shield-tv", canon: "disputed",
      summary: "Overthrown in a coup, the royal family of Attilan escapes to Hawaii." },
    { id: "runaways", title: "Runaways", format: "Series", released: "2017-11-21", section: "abc", wiki: "Runaways_(TV_series)", length: "3 seasons", group: "marvel-tv-youth", canon: "disputed",
      summary: "Six teenagers discover their parents are part of a secret criminal organisation called the Pride." },
    { id: "cloak-and-dagger", title: "Cloak & Dagger", format: "Series", released: "2018-06-07", section: "abc", wiki: "Cloak_&_Dagger_(TV_series)", length: "2 seasons", group: "marvel-tv-youth", canon: "disputed",
      summary: "Two teenagers from very different backgrounds in New Orleans discover their powers are linked." },
    { id: "helstrom", title: "Helstrom", format: "Series", released: "2020-10-16", section: "abc", wiki: "Helstrom_(TV_series)", length: "10 episodes", group: "marvel-tv-youth", canon: "disputed",
      summary: "Siblings Daimon and Ana Helstrom, children of a serial killer, hunt the worst of humanity." },

    /* ---------- Netflix Defenders saga ---------- */
    { id: "daredevil-netflix", title: "Daredevil (Netflix)", format: "Series", released: "2015-04-10", section: "netflix", wiki: "Daredevil_(TV_series)", length: "3 seasons", group: "street-level", canon: "recognised",
      summary: "Blind lawyer Matt Murdock fights for Hell's Kitchen by night, against the rising crime lord Wilson Fisk.",
      note: "Its story continues in the MCU's Daredevil: Born Again." },
    { id: "jessica-jones", title: "Jessica Jones", format: "Series", released: "2015-11-20", section: "netflix", wiki: "Jessica_Jones_(TV_series)", length: "3 seasons", group: "defenders", canon: "recognised",
      summary: "A former superhero turned private investigator is hunted by Kilgrave, the man who once controlled her mind." },
    { id: "luke-cage", title: "Luke Cage", format: "Series", released: "2016-09-30", section: "netflix", wiki: "Luke_Cage_(TV_series)", length: "2 seasons", group: "defenders", canon: "recognised",
      summary: "Unbreakable ex-con Luke Cage stands up for Harlem against its gangsters." },
    { id: "iron-fist", title: "Iron Fist", format: "Series", released: "2017-03-17", section: "netflix", wiki: "Iron_Fist_(TV_series)", length: "2 seasons", group: "defenders", canon: "recognised",
      summary: "Danny Rand returns to New York years after he was presumed dead, with the power of the Iron Fist." },
    { id: "the-defenders", title: "The Defenders", format: "Series", released: "2017-08-18", section: "netflix", wiki: "The_Defenders_(miniseries)", length: "8 episodes", group: "defenders", canon: "recognised", links: ["daredevil-netflix"],
      summary: "Daredevil, Jessica Jones, Luke Cage and Iron Fist team up against the Hand." },
    { id: "punisher-netflix", title: "The Punisher (Netflix)", format: "Series", released: "2017-11-17", section: "netflix", wiki: "The_Punisher_(TV_series)", length: "2 seasons", group: "defenders", canon: "recognised", links: ["daredevil-netflix"],
      summary: "Frank Castle, introduced in Daredevil, uncovers a conspiracy reaching far beyond the gangs that killed his family." },

    /* ---------- Animated series ---------- */
    { id: "marvel-super-heroes-1966", title: "The Marvel Super Heroes", format: "Series", animated: true, released: "1966-09-01", section: "animation", wiki: "The_Marvel_Super_Heroes", group: "classic-animation",
      summary: "Marvel's first cartoon, a limited-animation anthology starring Captain America, Iron Man, Hulk, Thor and Namor." },
    { id: "fantastic-four-1967", title: "Fantastic Four (1967)", format: "Series", animated: true, released: "1967-09-09", section: "animation", wiki: "Fantastic_Four_(1967_TV_series)", group: "classic-animation",
      summary: "Hanna-Barbera's take on the Fantastic Four." },
    { id: "iron-man-1994", title: "Iron Man (1994)", format: "Series", animated: true, released: "1994-09-24", section: "animation", wiki: "Iron_Man_(1994_TV_series)", length: "2 seasons", group: "classic-animation",
      summary: "Tony Stark leads Force Works against the Mandarin, as part of The Marvel Action Hour." },
    { id: "fantastic-four-1994", title: "Fantastic Four (1994)", format: "Series", animated: true, released: "1994-09-24", section: "animation", wiki: "Fantastic_Four_(1994_TV_series)", length: "2 seasons", group: "classic-animation",
      summary: "The First Family's 1990s cartoon, paired with Iron Man in The Marvel Action Hour." },
    { id: "incredible-hulk-1996", title: "The Incredible Hulk (1996)", format: "Series", animated: true, released: "1996-09-08", section: "animation", wiki: "The_Incredible_Hulk_(1996_TV_series)", length: "2 seasons", group: "classic-animation",
      summary: "Bruce Banner on the run, with Lou Ferrigno voicing the Hulk." },
    { id: "silver-surfer-1998", title: "Silver Surfer", format: "Series", animated: true, released: "1998-02-07", section: "animation", wiki: "Silver_Surfer_(TV_series)", length: "13 episodes", group: "classic-animation",
      summary: "Norrin Radd, freed from Galactus, searches the cosmos for his lost home planet." },
    { id: "armored-adventures", title: "Iron Man: Armored Adventures", format: "Series", animated: true, released: "2009-04-24", section: "animation", wiki: "Iron_Man:_Armored_Adventures", length: "2 seasons", group: "modern-animation",
      summary: "A teenage Tony Stark builds the Iron Man armour while still in high school." },
    { id: "earths-mightiest-heroes", title: "The Avengers: Earth's Mightiest Heroes", format: "Series", animated: true, released: "2010-09-22", section: "animation", wiki: "The_Avengers:_Earth's_Mightiest_Heroes", length: "2 seasons", group: "modern-animation",
      summary: "A mass supervillain breakout brings the Avengers together, in a series fans still rank among Marvel's best." },
    { id: "avengers-assemble", title: "Avengers Assemble", format: "Series", animated: true, released: "2013-05-26", section: "animation", wiki: "Avengers_Assemble_(TV_series)", length: "5 seasons", group: "modern-animation",
      summary: "Iron Man and Captain America rebuild the Avengers in a series styled after the films." },
    { id: "hulk-agents-of-smash", title: "Hulk and the Agents of S.M.A.S.H.", format: "Series", animated: true, released: "2013-08-11", section: "animation", wiki: "Hulk_and_the_Agents_of_S.M.A.S.H.", length: "2 seasons", group: "modern-animation",
      summary: "Hulk leads a team of gamma-powered heroes, filming their missions to win public trust." },
    { id: "guardians-animated", title: "Guardians of the Galaxy (2015)", format: "Series", animated: true, released: "2015-09-26", section: "animation", wiki: "Guardians_of_the_Galaxy_(TV_series)", length: "3 seasons", group: "modern-animation",
      summary: "The Guardians race Thanos to a map leading to the Cosmic Seed." },
    { id: "modok", title: "M.O.D.O.K.", format: "Series", animated: true, released: "2021-05-21", section: "animation", wiki: "M.O.D.O.K._(TV_series)", length: "10 episodes", group: "modern-animation",
      summary: "A stop-motion comedy about the supervillain M.O.D.O.K. losing his evil company and his family." },
    { id: "hit-monkey", title: "Hit-Monkey", format: "Series", animated: true, released: "2021-11-17", section: "animation", wiki: "Hit-Monkey_(TV_series)", length: "2 seasons", group: "modern-animation",
      summary: "A Japanese macaque, guided by the ghost of an American assassin, takes revenge on Tokyo's underworld." },
    { id: "moon-girl", title: "Moon Girl and Devil Dinosaur", format: "Series", animated: true, released: "2023-02-10", section: "animation", wiki: "Moon_Girl_and_Devil_Dinosaur_(TV_series)", length: "2 seasons", group: "modern-animation",
      summary: "Thirteen-year-old genius Lunella Lafayette protects the Lower East Side with a ten-ton T. rex." },
  ],
};
