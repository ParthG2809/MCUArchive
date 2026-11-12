/* =========================================================
   Reality #1: The Sacred Timeline (Marvel Cinematic Universe)

   Title fields
     id        unique slug (used in title.html?id=)
     title     display title
     format    "Film" | "Series" | "Special"
     animated  true for animated titles
     released  ISO date of first release (US). Upcoming status is computed from this.
     phase     1–6
     wiki      English Wikipedia article name (poster source)
     length    "126 min" / "6 episodes" (omit if unknown)
     crew      credit line (omit if unknown)
     setIn     when the story takes place (omit if unknown)
     group     franchise key; titles sharing a group are linked as connections
     links     extra connections (ids)
     nexus     true for multiverse-defining events
     summary   original 1–2 sentences; [[...]] marks a spoiler
     note      optional "agent's note"
   ========================================================= */

window.ARCHIVE = window.ARCHIVE || { realities: {} };

window.ARCHIVE.realities.mcu = {
  key: "mcu",
  name: "The Sacred Timeline",
  short: "MCU",
  page: "mcu.html",
  earth: "Earth-616",
  defaultCanon: "confirmed",
  showCanon: false,
  indexLabel: "PHASES",
  views: [
    { key: "release", label: "Release order", hint: "Filed as audiences saw them", sort: "release", grouped: true },
    { key: "chrono", label: "Story order", hint: "Filed by when the story happens", sort: "chrono" },
  ],
  phases: {
    1: { word: "One",   stone: "Space",   span: "2008–2012" },
    2: { word: "Two",   stone: "Mind",    span: "2013–2015" },
    3: { word: "Three", stone: "Reality", span: "2016–2019" },
    4: { word: "Four",  stone: "Power",   span: "2021–2022" },
    5: { word: "Five",  stone: "Time",    span: "2023–2025" },
    6: { word: "Six",   stone: "Soul",    span: "2025–2027" },
  },

  titles: [
    /* ---------- Phase One ---------- */
    { id: "iron-man", title: "Iron Man", format: "Film", released: "2008-05-02", phase: 1, wiki: "Iron_Man_(2008_film)", length: "126 min", crew: "Directed by Jon Favreau", setIn: "2010", group: "iron-man",
      summary: "Weapons maker Tony Stark is taken captive, builds an armoured suit to escape, and comes home to shut down his company's arms business, ending with [[his public admission that he is Iron Man]].",
      note: "Stay after the credits. This is where the whole universe starts." },
    { id: "incredible-hulk", title: "The Incredible Hulk", format: "Film", released: "2008-06-13", phase: 1, wiki: "The_Incredible_Hulk_(film)", length: "112 min", crew: "Directed by Louis Leterrier", setIn: "2011", group: "hulk",
      summary: "Bruce Banner hides from General Ross in Brazil while searching for a cure, until [[soldier Emil Blonsky becomes the Abomination]]." },
    { id: "iron-man-2", title: "Iron Man 2", format: "Film", released: "2010-05-07", phase: 1, wiki: "Iron_Man_2", length: "124 min", crew: "Directed by Jon Favreau", setIn: "2011", group: "iron-man",
      summary: "Tony refuses to hand his suit to the government while the arc reactor slowly poisons him, and [[Ivan Vanko turns Stark technology against him]]." },
    { id: "thor", title: "Thor", format: "Film", released: "2011-05-06", phase: 1, wiki: "Thor_(film)", length: "115 min", crew: "Directed by Kenneth Branagh", setIn: "2011", group: "thor",
      summary: "Banished to Earth without his hammer, Thor must prove himself worthy while [[his brother Loki seizes the throne of Asgard]]." },
    { id: "first-avenger", title: "Captain America: The First Avenger", format: "Film", released: "2011-07-22", phase: 1, wiki: "Captain_America:_The_First_Avenger", length: "124 min", crew: "Directed by Joe Johnston", setIn: "1942–1945", group: "captain-america",
      summary: "Frail Steve Rogers becomes a super-soldier to fight HYDRA in the Second World War, and [[wakes up nearly seventy years later]].",
      note: "Watching in story order? Start here." },
    { id: "avengers", title: "The Avengers", format: "Film", released: "2012-05-04", phase: 1, wiki: "The_Avengers_(2012_film)", length: "143 min", crew: "Directed by Joss Whedon", setIn: "2012", group: "avengers",
      summary: "Nick Fury assembles Earth's heroes when Loki arrives with the Tesseract and an alien army, leading to [[the Battle of New York]].",
      note: "The Battle of New York gets referenced for the next decade." },

    /* ---------- Phase Two ---------- */
    { id: "iron-man-3", title: "Iron Man 3", format: "Film", released: "2013-05-03", phase: 2, wiki: "Iron_Man_3", length: "130 min", crew: "Directed by Shane Black", setIn: "2012", group: "iron-man",
      summary: "Haunted by New York, Tony faces a terrorist called the Mandarin, who [[turns out to be an actor fronting for Aldrich Killian]]." },
    { id: "thor-dark-world", title: "Thor: The Dark World", format: "Film", released: "2013-11-08", phase: 2, wiki: "Thor:_The_Dark_World", length: "112 min", crew: "Directed by Alan Taylor", setIn: "2013", group: "thor",
      summary: "Thor must stop the Dark Elf Malekith from using the Aether, [[one of the Infinity Stones]], to plunge the universe into darkness." },
    { id: "winter-soldier", title: "Captain America: The Winter Soldier", format: "Film", released: "2014-04-04", phase: 2, wiki: "Captain_America:_The_Winter_Soldier", length: "136 min", crew: "Directed by Anthony & Joe Russo", setIn: "2014", group: "captain-america",
      summary: "Steve uncovers a conspiracy inside S.H.I.E.L.D. and faces a deadly assassin who [[turns out to be Bucky Barnes]]." },
    { id: "guardians", title: "Guardians of the Galaxy", format: "Film", released: "2014-08-01", phase: 2, wiki: "Guardians_of_the_Galaxy_(film)", length: "121 min", crew: "Directed by James Gunn", setIn: "2014", group: "guardians",
      summary: "Peter Quill and a crew of outlaws team up to keep a mysterious Orb, [[which holds the Power Stone]], out of Ronan's hands." },
    { id: "age-of-ultron", title: "Avengers: Age of Ultron", format: "Film", released: "2015-05-01", phase: 2, wiki: "Avengers:_Age_of_Ultron", length: "141 min", crew: "Directed by Joss Whedon", setIn: "2015", group: "avengers",
      summary: "Tony and Bruce build a peacekeeping AI that [[decides humanity is the threat]], and the Avengers have to stop it." },
    { id: "ant-man", title: "Ant-Man", format: "Film", released: "2015-07-17", phase: 2, wiki: "Ant-Man_(film)", length: "117 min", crew: "Directed by Peyton Reed", setIn: "2015", group: "ant-man",
      summary: "Ex-convict Scott Lang is recruited by Hank Pym to wear a shrinking suit and pull off a heist." },

    /* ---------- Phase Three ---------- */
    { id: "civil-war", title: "Captain America: Civil War", format: "Film", released: "2016-05-06", phase: 3, wiki: "Captain_America:_Civil_War", length: "147 min", crew: "Directed by Anthony & Joe Russo", setIn: "2016", group: "captain-america",
      summary: "A government act to control the Avengers splits the team in two, and [[a secret about Tony's parents]] makes the fight personal." },
    { id: "doctor-strange", title: "Doctor Strange", format: "Film", released: "2016-11-04", phase: 3, wiki: "Doctor_Strange_(2016_film)", length: "115 min", crew: "Directed by Scott Derrickson", setIn: "2016–2017", group: "doctor-strange",
      summary: "After a crash ends his career, surgeon Stephen Strange seeks a cure in Kathmandu and finds the mystic arts, including [[the Time Stone]]." },
    { id: "guardians-2", title: "Guardians of the Galaxy Vol. 2", format: "Film", released: "2017-05-05", phase: 3, wiki: "Guardians_of_the_Galaxy_Vol._2", length: "136 min", crew: "Directed by James Gunn", setIn: "2014", group: "guardians",
      summary: "The Guardians meet Quill's father, Ego, who [[plans to remake the universe in his own image]]." },
    { id: "homecoming", title: "Spider-Man: Homecoming", format: "Film", released: "2017-07-07", phase: 3, wiki: "Spider-Man:_Homecoming", length: "133 min", crew: "Directed by Jon Watts", setIn: "2016", group: "spider-man",
      summary: "Peter Parker juggles high school and being Spider-Man while hunting the Vulture, who [[turns out to be his date's father]]." },
    { id: "ragnarok", title: "Thor: Ragnarok", format: "Film", released: "2017-11-03", phase: 3, wiki: "Thor:_Ragnarok", length: "130 min", crew: "Directed by Taika Waititi", setIn: "2017", group: "thor",
      summary: "Stranded on a gladiator planet, Thor must escape and stop his sister Hela, ending in [[the destruction of Asgard]]." },
    { id: "black-panther", title: "Black Panther", format: "Film", released: "2018-02-16", phase: 3, wiki: "Black_Panther_(film)", length: "134 min", crew: "Directed by Ryan Coogler", setIn: "2016", group: "wakanda",
      summary: "T'Challa returns home to take Wakanda's throne and is challenged by Erik Killmonger, [[his own cousin]]." },
    { id: "infinity-war", title: "Avengers: Infinity War", format: "Film", released: "2018-04-27", phase: 3, wiki: "Avengers:_Infinity_War", length: "149 min", crew: "Directed by Anthony & Joe Russo", setIn: "2018", group: "avengers",
      summary: "Thanos hunts the six Infinity Stones while every hero tries to stop him, and [[he wins with a snap]]." },
    { id: "ant-man-wasp", title: "Ant-Man and the Wasp", format: "Film", released: "2018-07-06", phase: 3, wiki: "Ant-Man_and_the_Wasp", length: "118 min", crew: "Directed by Peyton Reed", setIn: "2018", group: "ant-man",
      summary: "Scott and Hope van Dyne race to rescue Janet from the Quantum Realm, and [[Scott is left stranded there by the Snap]]." },
    { id: "captain-marvel", title: "Captain Marvel", format: "Film", released: "2019-03-08", phase: 3, wiki: "Captain_Marvel_(film)", length: "123 min", crew: "Directed by Anna Boden & Ryan Fleck", setIn: "1995", group: "captain-marvel",
      summary: "In 1995, Carol Danvers crash-lands on Earth and teams up with a young Nick Fury, uncovering [[the human past she was made to forget]]." },
    { id: "endgame", title: "Avengers: Endgame", format: "Film", released: "2019-04-26", phase: 3, wiki: "Avengers:_Endgame", length: "181 min", crew: "Directed by Anthony & Joe Russo", setIn: "2018–2023", group: "avengers", links: ["loki-s1"],
      summary: "Five years after the Snap, the surviving Avengers try one last plan, [[a heist through time to undo it]], at a heavy cost.",
      note: "No post-credit scene. Listen for the sound at the very end." },
    { id: "far-from-home", title: "Spider-Man: Far From Home", format: "Film", released: "2019-07-02", phase: 3, wiki: "Spider-Man:_Far_From_Home", length: "129 min", crew: "Directed by Jon Watts", setIn: "2024", group: "spider-man",
      summary: "On a school trip to Europe, Peter teams up with Mysterio, [[who is staging the threats himself]]." },

    /* ---------- Phase Four ---------- */
    { id: "wandavision", title: "WandaVision", format: "Series", released: "2021-01-15", phase: 4, wiki: "WandaVision", length: "9 episodes", crew: "Directed by Matt Shakman", setIn: "2023", group: "wanda", links: ["multiverse-of-madness"],
      summary: "Wanda and Vision live in a sitcom suburb that jumps a decade every episode, and [[the town is a reality Wanda built out of grief]]." },
    { id: "falcon-winter-soldier", title: "The Falcon and the Winter Soldier", format: "Series", released: "2021-03-19", phase: 4, wiki: "The_Falcon_and_the_Winter_Soldier", length: "6 episodes", crew: "Directed by Kari Skogland", setIn: "2024", group: "captain-america",
      summary: "Sam Wilson and Bucky Barnes take on the Flag Smashers while Sam decides whether to [[take up Steve's shield]]." },
    { id: "loki-s1", title: "Loki (Season 1)", format: "Series", released: "2021-06-09", phase: 4, wiki: "Loki_season_1", length: "6 episodes", crew: "Directed by Kate Herron", setIn: "Outside time", group: "loki", nexus: true, links: ["deadpool-wolverine"],
      summary: "A Loki variant is arrested by the Time Variance Authority and drawn into a hunt that [[breaks the Sacred Timeline open]].",
      note: "Nexus event. The Multiverse starts here." },
    { id: "black-widow", title: "Black Widow", format: "Film", released: "2021-07-09", phase: 4, wiki: "Black_Widow_(2021_film)", length: "134 min", crew: "Directed by Cate Shortland", setIn: "2016", group: "black-widow",
      summary: "On the run after Civil War, Natasha Romanoff confronts her past and the Red Room that trained her." },
    { id: "what-if-s1", title: "What If…? (Season 1)", format: "Series", animated: true, released: "2021-08-11", phase: 4, wiki: "What_If...?_season_1", length: "9 episodes", crew: "Directed by Bryan Andrews", setIn: "The Multiverse", group: "what-if",
      summary: "The Watcher shows alternate versions of familiar stories, such as Peggy Carter taking the super-soldier serum instead of Steve." },
    { id: "shang-chi", title: "Shang-Chi and the Legend of the Ten Rings", format: "Film", released: "2021-09-03", phase: 4, wiki: "Shang-Chi_and_the_Legend_of_the_Ten_Rings", length: "132 min", crew: "Directed by Destin Daniel Cretton", setIn: "2024", group: "shang-chi",
      summary: "Shang-Chi is pulled back into the world of his father, Wenwu, and the Ten Rings organisation he leads." },
    { id: "eternals", title: "Eternals", format: "Film", released: "2021-11-05", phase: 4, wiki: "Eternals_(film)", length: "156 min", crew: "Directed by Chloé Zhao", setIn: "2024", group: "eternals",
      summary: "Immortal beings who have guarded Earth for 7,000 years reunite against the Deviants and learn [[the real reason they were sent here]]." },
    { id: "hawkeye", title: "Hawkeye", format: "Series", released: "2021-11-24", phase: 4, wiki: "Hawkeye_(2021_TV_series)", length: "6 episodes", crew: "Directed by Rhys Thomas and Bert & Bertie", setIn: "2024", group: "street-level",
      summary: "Clint Barton teams up with young archer Kate Bishop to settle his past as Ronin before Christmas." },
    { id: "no-way-home", title: "Spider-Man: No Way Home", format: "Film", released: "2021-12-17", phase: 4, wiki: "Spider-Man:_No_Way_Home", length: "148 min", crew: "Directed by Jon Watts", setIn: "2024", group: "spider-man", nexus: true,
      summary: "When Peter's identity goes public, a spell to fix it goes wrong and [[pulls in villains, and Spider-Men, from other universes]].",
      note: "Three Spider-Men, three film series, one night. Watch the Raimi and Webb films first." },
    { id: "moon-knight", title: "Moon Knight", format: "Series", released: "2022-03-30", phase: 4, wiki: "Moon_Knight_(TV_series)", length: "6 episodes", crew: "Directed by Mohamed Diab, Justin Benson & Aaron Moorhead", setIn: "2025", group: "moon-knight",
      summary: "Gift-shop worker Steven Grant discovers he shares a body with mercenary Marc Spector, the avatar of the Egyptian god Khonshu." },
    { id: "multiverse-of-madness", title: "Doctor Strange in the Multiverse of Madness", format: "Film", released: "2022-05-06", phase: 4, wiki: "Doctor_Strange_in_the_Multiverse_of_Madness", length: "126 min", crew: "Directed by Sam Raimi", setIn: "2024", group: "doctor-strange", nexus: true, links: ["wandavision"],
      summary: "Doctor Strange protects America Chavez, a teenager who can travel the Multiverse, from [[Wanda as the Scarlet Witch]]." },
    { id: "ms-marvel", title: "Ms. Marvel", format: "Series", released: "2022-06-08", phase: 4, wiki: "Ms._Marvel_(TV_series)", length: "6 episodes", crew: "Directed by Adil & Bilall, Meera Menon and Sharmeen Obaid-Chinoy", setIn: "2025", group: "captain-marvel",
      summary: "Jersey City teen Kamala Khan gains powers from a family bangle and [[learns she is a mutant]]." },
    { id: "love-and-thunder", title: "Thor: Love and Thunder", format: "Film", released: "2022-07-08", phase: 4, wiki: "Thor:_Love_and_Thunder", length: "119 min", crew: "Directed by Taika Waititi", setIn: "2025", group: "thor",
      summary: "Thor's retirement is interrupted by Gorr the God Butcher and the return of Jane Foster as the Mighty Thor." },
    { id: "i-am-groot-s1", title: "I Am Groot (Season 1)", format: "Series", animated: true, released: "2022-08-10", phase: 4, wiki: "I_Am_Groot", length: "5 shorts", crew: "Directed by Kirsten Lepore", setIn: "2014–2017", group: "guardians",
      summary: "Short, wordless adventures of Baby Groot getting into trouble." },
    { id: "she-hulk", title: "She-Hulk: Attorney at Law", format: "Series", released: "2022-08-18", phase: 4, wiki: "She-Hulk:_Attorney_at_Law", length: "9 episodes", crew: "Directed by Kat Coiro and Anu Valia", setIn: "2025", group: "hulk",
      summary: "Lawyer Jennifer Walters gains her cousin Bruce's powers and becomes the go-to attorney for superhuman cases." },
    { id: "werewolf-by-night", title: "Werewolf by Night", format: "Special", released: "2022-10-07", phase: 4, wiki: "Werewolf_by_Night_(film)", length: "53 min", crew: "Directed by Michael Giacchino", group: "werewolf",
      summary: "Monster hunters gather after their leader's death to compete for a powerful relic, and one of them [[is a werewolf]]." },
    { id: "wakanda-forever", title: "Black Panther: Wakanda Forever", format: "Film", released: "2022-11-11", phase: 4, wiki: "Black_Panther:_Wakanda_Forever", length: "161 min", crew: "Directed by Ryan Coogler", setIn: "2025", group: "wakanda",
      summary: "Wakanda mourns King T'Challa while facing Namor and the hidden undersea nation of Talokan." },
    { id: "guardians-holiday", title: "The Guardians of the Galaxy Holiday Special", format: "Special", released: "2022-11-25", phase: 4, wiki: "The_Guardians_of_the_Galaxy_Holiday_Special", length: "44 min", crew: "Directed by James Gunn", group: "guardians",
      summary: "Mantis and Drax fly to Earth to find Peter Quill the perfect Christmas present: Kevin Bacon." },

    /* ---------- Phase Five ---------- */
    { id: "quantumania", title: "Ant-Man and the Wasp: Quantumania", format: "Film", released: "2023-02-17", phase: 5, wiki: "Ant-Man_and_the_Wasp:_Quantumania", length: "125 min", crew: "Directed by Peyton Reed", setIn: "Post-Blip", group: "ant-man",
      summary: "Scott, Hope and their family are pulled into the Quantum Realm, where they meet Kang the Conqueror." },
    { id: "guardians-3", title: "Guardians of the Galaxy Vol. 3", format: "Film", released: "2023-05-05", phase: 5, wiki: "Guardians_of_the_Galaxy_Vol._3", length: "150 min", crew: "Directed by James Gunn", setIn: "Post-Blip", group: "guardians",
      summary: "The Guardians race to save Rocket's life, which means facing [[the High Evolutionary, the scientist who created him]]." },
    { id: "secret-invasion", title: "Secret Invasion", format: "Series", released: "2023-06-21", phase: 5, wiki: "Secret_Invasion_(TV_series)", length: "6 episodes", crew: "Directed by Ali Selim", setIn: "Post-Blip", group: "captain-marvel",
      summary: "Nick Fury returns to Earth to stop a faction of shape-shifting Skrulls from starting a world war." },
    { id: "i-am-groot-s2", title: "I Am Groot (Season 2)", format: "Series", animated: true, released: "2023-09-06", phase: 5, wiki: "I_Am_Groot", length: "5 shorts", crew: "Directed by Kirsten Lepore", group: "guardians",
      summary: "More short, wordless misadventures of Baby Groot." },
    { id: "loki-s2", title: "Loki (Season 2)", format: "Series", released: "2023-10-05", phase: 5, wiki: "Loki_season_2", length: "6 episodes", crew: "Directed by Justin Benson & Aaron Moorhead, Dan DeLeeuw and Kasra Farahani", setIn: "Outside time", group: "loki", nexus: true, links: ["deadpool-wolverine"],
      summary: "Loki slips through time as the TVA falls apart, and [[takes his place at the heart of the Multiverse]]." },
    { id: "the-marvels", title: "The Marvels", format: "Film", released: "2023-11-10", phase: 5, wiki: "The_Marvels", length: "105 min", crew: "Directed by Nia DaCosta", setIn: "Post-Blip", group: "captain-marvel",
      summary: "Carol Danvers, Monica Rambeau and Kamala Khan swap places every time they use their powers at the same moment." },
    { id: "what-if-s2", title: "What If…? (Season 2)", format: "Series", animated: true, released: "2023-12-22", phase: 5, wiki: "What_If...?_season_2", length: "9 episodes", crew: "Directed by Bryan Andrews", setIn: "The Multiverse", group: "what-if",
      summary: "The Watcher returns with more alternate stories from across the Multiverse." },
    { id: "echo", title: "Echo", format: "Series", released: "2024-01-09", phase: 5, wiki: "Echo_(TV_series)", length: "5 episodes", crew: "Directed by Sydney Freeland and Catriona McKenzie", setIn: "Post-Blip", group: "street-level",
      summary: "Maya Lopez returns to her Choctaw hometown while Wilson Fisk's criminal empire comes after her." },
    { id: "deadpool-wolverine", title: "Deadpool & Wolverine", format: "Film", released: "2024-07-26", phase: 5, wiki: "Deadpool_&_Wolverine", length: "128 min", crew: "Directed by Shawn Levy", setIn: "Earth-10005 & the Void", group: "deadpool", nexus: true, links: ["loki-s1", "loki-s2"],
      summary: "The TVA comes for Deadpool's world, and he recruits [[a very reluctant Wolverine variant]] to save it.",
      note: "Cross-reality file. Fox's X-Men universe meets the MCU." },
    { id: "agatha", title: "Agatha All Along", format: "Series", released: "2024-09-18", phase: 5, wiki: "Agatha_All_Along", length: "9 episodes", crew: "Directed by Jac Schaeffer, Rachel Goldberg and Gandja Monteiro", setIn: "Post-Blip", group: "wanda",
      summary: "Freed from Wanda's spell, Agatha Harkness sets out on the Witches' Road with a brand-new coven." },
    { id: "what-if-s3", title: "What If…? (Season 3)", format: "Series", animated: true, released: "2024-12-22", phase: 5, wiki: "What_If...?_season_3", length: "8 episodes", crew: "Directed by Bryan Andrews", setIn: "The Multiverse", group: "what-if",
      summary: "The final season of the Watcher's stories from across the Multiverse." },
    { id: "brave-new-world", title: "Captain America: Brave New World", format: "Film", released: "2025-02-14", phase: 5, wiki: "Captain_America:_Brave_New_World", length: "118 min", crew: "Directed by Julius Onah", setIn: "Post-Blip", group: "captain-america",
      summary: "Sam Wilson, the new Captain America, is caught in an international incident involving President Thaddeus Ross." },
    { id: "born-again-s1", title: "Daredevil: Born Again (Season 1)", format: "Series", released: "2025-03-04", phase: 5, wiki: "Daredevil:_Born_Again_season_1", length: "9 episodes", crew: "Directed by Justin Benson & Aaron Moorhead, Michael Cuesta and Jeffrey Nachmanoff", setIn: "Post-Blip", group: "street-level",
      summary: "Matt Murdock's lives as a lawyer and as Daredevil collide with Wilson Fisk, who [[has become Mayor of New York]]." },
    { id: "thunderbolts", title: "Thunderbolts*", format: "Film", released: "2025-05-02", phase: 5, wiki: "Thunderbolts*", length: "127 min", crew: "Directed by Jake Schreier", setIn: "Post-Blip", group: "black-widow",
      summary: "A team of antiheroes led by Yelena Belova is set up to be eliminated, and has to work together to survive." },
    { id: "ironheart", title: "Ironheart", format: "Series", released: "2025-06-24", phase: 5, wiki: "Ironheart_(miniseries)", length: "6 episodes", crew: "Directed by Sam Bailey and Angela Barnes", setIn: "Post-Blip", group: "wakanda",
      summary: "Young inventor Riri Williams returns to Chicago and builds her armour with help from a mysterious figure who uses magic." },

    /* ---------- Phase Six ---------- */
    { id: "first-steps", title: "The Fantastic Four: First Steps", format: "Film", released: "2025-07-25", phase: 6, wiki: "The_Fantastic_Four:_First_Steps", length: "115 min", crew: "Directed by Matt Shakman", setIn: "Earth-828", group: "fantastic-four", links: ["doomsday"],
      summary: "On the retro-futurist Earth-828, Marvel's First Family faces Galactus and the Silver Surfer.",
      note: "Opens Phase Six, on a different Earth." },
    { id: "eyes-of-wakanda", title: "Eyes of Wakanda", format: "Series", animated: true, released: "2025-08-01", phase: 6, wiki: "Eyes_of_Wakanda", length: "4 episodes", crew: "Directed by Todd Harris", setIn: "Across history", group: "wakanda",
      summary: "Wakandan warriors travel the world across the centuries to recover stolen vibranium artifacts." },
    { id: "marvel-zombies", title: "Marvel Zombies", format: "Series", animated: true, released: "2025-09-24", phase: 6, wiki: "Marvel_Zombies_(miniseries)", length: "4 episodes", crew: "Directed by Bryan Andrews", setIn: "Alternate universe", group: "what-if",
      summary: "In a universe overrun by zombified heroes, a band of survivors fights to stop the outbreak." },
    { id: "wonder-man", title: "Wonder Man", format: "Series", released: "2026-01-27", phase: 6, wiki: "Wonder_Man_(TV_series)", length: "8 episodes", crew: "Created by Destin Daniel Cretton and Andrew Guest", setIn: "Post-Blip", group: "wonder-man",
      summary: "Struggling actor Simon Williams, who secretly has powers, auditions for the lead in a superhero remake called Wonder Man." },
    { id: "born-again-s2", title: "Daredevil: Born Again (Season 2)", format: "Series", released: "2026-03-24", phase: 6, wiki: "Daredevil:_Born_Again_season_2", length: "8 episodes", setIn: "Post-Blip", group: "street-level",
      summary: "Daredevil fights back against Mayor Fisk's tightening grip on New York." },
    { id: "brand-new-day", title: "Spider-Man: Brand New Day", format: "Film", released: "2026-07-31", phase: 6, wiki: "Spider-Man:_Brand_New_Day", crew: "Directed by Destin Daniel Cretton", setIn: "Post-Blip", group: "spider-man",
      summary: "Spider-Man starts over in a world that no longer remembers Peter Parker." },
    { id: "visionquest", title: "VisionQuest", format: "Series", released: "2026-10-14", phase: 6, wiki: "VisionQuest", crew: "Showrunner: Terry Matalas", setIn: "Post-Blip", group: "wanda",
      summary: "Vision's story continues in the final chapter of the trilogy that began with WandaVision." },
    { id: "doomsday", title: "Avengers: Doomsday", format: "Film", released: "2026-12-18", phase: 6, wiki: "Avengers:_Doomsday", crew: "Directed by Anthony & Joe Russo", group: "avengers", links: ["first-steps"],
      summary: "The Avengers and their allies face Doctor Doom." },
    { id: "secret-wars", title: "Avengers: Secret Wars", format: "Film", released: "2027-12-17", phase: 6, wiki: "Avengers:_Secret_Wars", crew: "Directed by Anthony & Joe Russo", group: "avengers",
      summary: "The finale of the Multiverse Saga." },
  ],

  /* In-universe (story) order. Alternate-universe titles sit where they are usually placed in viewing guides. */
  chrono: [
    "first-avenger", "captain-marvel", "iron-man", "iron-man-2", "incredible-hulk", "thor", "avengers",
    "thor-dark-world", "iron-man-3", "winter-soldier", "guardians", "guardians-2", "i-am-groot-s1", "i-am-groot-s2",
    "age-of-ultron", "ant-man", "civil-war", "black-widow", "black-panther", "homecoming", "doctor-strange",
    "ragnarok", "ant-man-wasp", "infinity-war", "endgame", "loki-s1", "what-if-s1", "wandavision", "shang-chi",
    "falcon-winter-soldier", "far-from-home", "eternals", "no-way-home", "multiverse-of-madness", "hawkeye",
    "moon-knight", "wakanda-forever", "echo", "she-hulk", "ms-marvel", "love-and-thunder", "werewolf-by-night",
    "guardians-holiday", "quantumania", "guardians-3", "secret-invasion", "the-marvels", "loki-s2", "what-if-s2",
    "what-if-s3", "marvel-zombies", "eyes-of-wakanda", "deadpool-wolverine", "agatha", "born-again-s1",
    "brave-new-world", "thunderbolts", "ironheart", "wonder-man", "born-again-s2", "brand-new-day", "visionquest",
    "first-steps", "doomsday", "secret-wars",
  ],
};
