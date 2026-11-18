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
      summary: "Republic Pictures' 15-chapter cinema serial was the first time a Marvel character, then published by Timely, reached the screen. This Captain America is District Attorney Grant Gardner, who fights crime in a mask. He battles the Scarab, a villain whose gang steals dangerous inventions, with each chapter ending on a cliffhanger." },
    { id: "incredible-hulk-1977", title: "The Incredible Hulk (1977)", format: "Series", released: "1977-11-04", section: "pioneers", wiki: "The_Incredible_Hulk_(1977_TV_series)", length: "5 seasons", group: "hulk-classic",
      summary: "Scientist Dr. David Banner, played by Bill Bixby, is exposed to a massive dose of gamma radiation during an experiment. From then on, anger or pain turns him into the Hulk, played by Lou Ferrigno. Believed dead, Banner drifts across America under false names, helping people he meets while searching for a cure and staying one step ahead of a reporter who is chasing the creature." },
    { id: "doctor-strange-1978", title: "Dr. Strange (1978)", format: "Film", released: "1978-09-06", section: "pioneers", wiki: "Dr._Strange_(1978_film)", group: "classic-tv-movies",
      summary: "An ageing sorcerer must find a successor before the evil sorceress Morgan le Fay can bring darkness into the world. His choice is Dr. Stephen Strange, a young psychiatrist in New York played by Peter Hooten. Strange is drawn into a mystic world he never knew existed." },
    { id: "captain-america-1979", title: "Captain America (1979)", format: "Film", released: "1979-01-19", section: "pioneers", wiki: "Captain_America_(1979_film)", group: "captain-america-classic",
      summary: "Former Marine and artist Steve Rogers is badly injured and saved by a super-steroid developed from his late father's research. It gives him heightened strength and reflexes, and he becomes Captain America, riding a motorcycle and carrying a shield. Reb Brown plays the hero in this CBS TV movie." },
    { id: "howard-the-duck", title: "Howard the Duck", format: "Film", released: "1986-08-01", section: "pioneers", wiki: "Howard_the_Duck_(film)", length: "110 min", crew: "Directed by Willard Huyck", group: "classic-tv-movies",
      summary: "A wisecracking duck from a planet of ducks is pulled across space to Cleveland by a laser experiment gone wrong. He befriends rock singer Beverly Switzler, who helps him look for a way home. Before long, Howard finds himself caught up in a much bigger cosmic threat.",
      note: "Howard later turns up in the MCU, starting with a cameo in Guardians of the Galaxy." },
    { id: "nick-fury-1998", title: "Nick Fury: Agent of S.H.I.E.L.D.", format: "Film", released: "1998-05-26", section: "pioneers", wiki: "Nick_Fury:_Agent_of_S.H.I.E.L.D._(film)", group: "classic-tv-movies",
      summary: "David Hasselhoff plays Nick Fury, a retired S.H.I.E.L.D. agent brought back to stop HYDRA. Viper, the daughter of HYDRA's late leader, threatens to release a deadly virus over Manhattan. Fury reunites with old colleagues to track down the threat in this Fox TV movie." },

    /* ---------- Blade ---------- */
    { id: "blade", title: "Blade", format: "Film", released: "1998-08-21", section: "blade", wiki: "Blade_(1998_film)", length: "120 min", crew: "Directed by Stephen Norrington", group: "blade",
      summary: "Blade is half human and half vampire: he has a vampire's strength and healing without its weakness to sunlight. With his mentor Whistler, he hunts the vampires who secretly rule the city's underworld. When a haematologist is attacked, Blade is drawn into a plot by the ambitious vampire Deacon Frost.",
      note: "Marvel's first big box-office hit, ten years before Iron Man." },
    { id: "blade-2", title: "Blade II", format: "Film", released: "2002-03-22", section: "blade", wiki: "Blade_II", length: "117 min", crew: "Directed by Guillermo del Toro", group: "blade",
      summary: "Vampires face a new threat: the Reapers, a mutated breed that feeds on humans and vampires alike and spreads fast. The vampire nation asks its worst enemy, Blade, for a truce. He agrees to lead an elite team of vampires originally trained to kill him." },
    { id: "blade-trinity", title: "Blade: Trinity", format: "Film", released: "2004-12-08", section: "blade", wiki: "Blade:_Trinity", length: "113 min", crew: "Directed by David S. Goyer", group: "blade",
      summary: "Framed for murder by vampires, Blade becomes a target for the FBI. He joins forces with the Nightstalkers, a group of young vampire hunters led by Hannibal King and Abigail Whistler. Together they face their greatest enemy yet, the first vampire, Dracula." },
    { id: "blade-the-series", title: "Blade: The Series", format: "Series", released: "2006-06-28", section: "blade", wiki: "Blade:_The_Series", length: "12 episodes", group: "blade",
      summary: "Kirk 'Sticky Fingaz' Jones takes over as Blade in a Spike TV series set in Detroit. Krista Starr, an Iraq War veteran investigating her twin brother's death, is drawn into the city's vampire underworld. She becomes Blade's ally inside the powerful House of Chthon." },

    /* ---------- The 2000s films ---------- */
    { id: "daredevil-2003", title: "Daredevil (2003)", format: "Film", released: "2003-02-14", section: "films2000", wiki: "Daredevil_(film)", length: "103 min", crew: "Directed by Mark Steven Johnson", group: "daredevil-film",
      summary: "Blinded by toxic waste as a boy, Matt Murdock develops heightened senses. He becomes a lawyer by day and the masked vigilante Daredevil by night. He falls for the skilled fighter Elektra Natchios, while the crime boss Kingpin hires the assassin Bullseye." },
    { id: "hulk-2003", title: "Hulk", format: "Film", released: "2003-06-20", section: "films2000", wiki: "Hulk_(film)", length: "138 min", crew: "Directed by Ang Lee", group: "hulk-classic",
      summary: "Scientist Bruce Banner survives a lab accident that should have killed him, but soon finds that anger turns him into a huge green creature. His estranged father reappears with secrets about Bruce's past. General Ross and the military begin to hunt the Hulk." },
    { id: "punisher-2004", title: "The Punisher (2004)", format: "Film", released: "2004-04-16", section: "films2000", wiki: "The_Punisher_(2004_film)", length: "124 min", crew: "Directed by Jonathan Hensleigh", group: "punisher",
      summary: "FBI agent Frank Castle's final undercover operation makes him an enemy of Tampa crime boss Howard Saint. In revenge, Saint has Castle's whole family murdered and Frank is left for dead. Frank survives and declares war on everyone responsible, as the Punisher." },
    { id: "elektra", title: "Elektra", format: "Film", released: "2005-01-14", section: "films2000", wiki: "Elektra_(2005_film)", length: "97 min", crew: "Directed by Rob Bowman", group: "daredevil-film",
      summary: "Elektra Natchios, brought back from death by her mentor Stick, now works as a hired assassin. Her new target is a father and his teenage daughter, but she decides to protect them instead. That puts her up against the Hand, a ninja clan with supernatural powers." },
    { id: "fantastic-four-2005", title: "Fantastic Four (2005)", format: "Film", released: "2005-07-08", section: "films2000", wiki: "Fantastic_Four_(2005_film)", length: "106 min", crew: "Directed by Tim Story", group: "fantastic-four-fox",
      summary: "Scientist Reed Richards, pilot Ben Grimm, Sue Storm and her brother Johnny travel to the space station of billionaire Victor von Doom. A cosmic storm hits the station and changes them all. The four gain extraordinary powers and become celebrities, while Victor's own changes take him down a darker road." },
    { id: "ghost-rider", title: "Ghost Rider", format: "Film", released: "2007-02-16", section: "films2000", wiki: "Ghost_Rider_(2007_film)", length: "110 min", crew: "Directed by Mark Steven Johnson", group: "ghost-rider",
      summary: "Teenage stunt rider Johnny Blaze sells his soul to the devil to save his father. Years later, the devil comes to collect, turning Johnny into the Ghost Rider, a flaming-skulled spirit of vengeance. He is sent to stop the devil's son, Blackheart." },
    { id: "rise-of-the-silver-surfer", title: "Fantastic Four: Rise of the Silver Surfer", format: "Film", released: "2007-06-15", section: "films2000", wiki: "Fantastic_Four:_Rise_of_the_Silver_Surfer", length: "92 min", crew: "Directed by Tim Story", group: "fantastic-four-fox",
      summary: "Reed Richards and Sue Storm are planning their wedding when a mysterious silver figure arrives on Earth and starts causing disasters around the world. The Fantastic Four are asked by the military to track him down. They learn the Silver Surfer is the herald of something far more dangerous." },
    { id: "punisher-war-zone", title: "Punisher: War Zone", format: "Film", released: "2008-12-05", section: "films2000", wiki: "Punisher:_War_Zone", length: "103 min", crew: "Directed by Lexi Alexander", group: "punisher",
      summary: "Years into his war on the mob, Frank Castle is haunted by a terrible mistake made during a raid. A gangster he leaves disfigured returns as the vengeful Jigsaw. Frank has to protect an innocent family from Jigsaw and his gang." },
    { id: "spirit-of-vengeance", title: "Ghost Rider: Spirit of Vengeance", format: "Film", released: "2012-02-17", section: "films2000", wiki: "Ghost_Rider:_Spirit_of_Vengeance", length: "96 min", crew: "Directed by Mark Neveldine & Brian Taylor", group: "ghost-rider",
      summary: "Johnny Blaze is hiding in Eastern Europe, still cursed as the Ghost Rider. A warrior monk asks him to protect a young boy whom the devil wants for himself. In return, the monk promises to free Johnny from his curse." },
    { id: "fantastic-four-2015", title: "Fantastic Four (2015)", format: "Film", released: "2015-08-07", section: "films2000", wiki: "Fantastic_Four_(2015_film)", length: "100 min", crew: "Directed by Josh Trank", group: "fantastic-four-fox",
      summary: "Childhood friends Reed Richards and Ben Grimm build a teleporter that can reach another dimension. Working with Sue Storm, her brother Johnny and Victor von Doom, they make the trip, and it changes them all. The young heroes have to learn to control their new powers and work as a team." },

    /* ---------- Marvel Television ---------- */
    { id: "agents-of-shield", title: "Agents of S.H.I.E.L.D.", format: "Series", released: "2013-09-24", section: "abc", wiki: "Agents_of_S.H.I.E.L.D.", length: "7 seasons", group: "shield-tv", canon: "disputed", links: ["avengers", "winter-soldier"],
      summary: "Agent Phil Coulson, somehow alive after the Battle of New York, leads a small S.H.I.E.L.D. team that includes Melinda May, Daisy Johnson, Leo Fitz and Jemma Simmons. They investigate strange and dangerous cases around the world. Over seven seasons, the team faces alien threats, secret organisations and even time travel.",
      note: "Built to tie into the films, but Marvel Studios has never confirmed it." },
    { id: "agent-carter", title: "Agent Carter", format: "Series", released: "2015-01-06", section: "abc", wiki: "Agent_Carter_(TV_series)", length: "2 seasons", group: "shield-tv", canon: "disputed", links: ["first-avenger"],
      summary: "In 1946, Peggy Carter works at the Strategic Scientific Reserve in New York, where her male colleagues treat her as a secretary. She secretly helps Howard Stark, who has been framed for selling weapons to enemies. With Stark's butler Edwin Jarvis, Peggy goes on dangerous missions while keeping her work a secret." },
    { id: "inhumans", title: "Inhumans", format: "Series", released: "2017-09-29", section: "abc", wiki: "Inhumans_(TV_series)", length: "8 episodes", group: "shield-tv", canon: "disputed",
      summary: "The Inhuman royal family rules Attilan, a city hidden on the Moon, led by King Black Bolt, whose voice is so powerful he must stay silent. When his brother Maximus seizes the throne, the royal family escapes to Hawaii. Separated on Earth, they have to find each other and plan their return." },
    { id: "runaways", title: "Runaways", format: "Series", released: "2017-11-21", section: "abc", wiki: "Runaways_(TV_series)", length: "3 seasons", group: "marvel-tv-youth", canon: "disputed",
      summary: "Six teenagers in Los Angeles who have drifted apart discover that their wealthy parents belong to the Pride, a secret group with a sinister purpose. They run away together and try to stop their parents. Along the way they discover powers and secrets of their own." },
    { id: "cloak-and-dagger", title: "Cloak & Dagger", format: "Series", released: "2018-06-07", section: "abc", wiki: "Cloak_&_Dagger_(TV_series)", length: "2 seasons", group: "marvel-tv-youth", canon: "disputed",
      summary: "Teenagers Tandy Bowen and Tyrone Johnson come from very different sides of New Orleans, but share a link from a disaster in their childhood. When they meet again, they find they have connected powers: Tandy controls light, while Tyrone can move through darkness. Together they look for answers about their past." },
    { id: "helstrom", title: "Helstrom", format: "Series", released: "2020-10-16", section: "abc", wiki: "Helstrom_(TV_series)", length: "10 episodes", group: "marvel-tv-youth", canon: "disputed",
      summary: "Siblings Daimon and Ana Helstrom are the children of a notorious serial killer. Their mother has spent years in a psychiatric hospital, haunted by a demonic presence. The two use their unusual abilities to track down and fight the worst of humanity." },

    /* ---------- Netflix Defenders saga ---------- */
    { id: "daredevil-netflix", title: "Daredevil (Netflix)", format: "Series", released: "2015-04-10", section: "netflix", wiki: "Daredevil_(TV_series)", length: "3 seasons", group: "street-level", canon: "recognised",
      summary: "Blinded as a child, Matt Murdock uses his heightened senses to fight crime in Hell's Kitchen as a masked vigilante. By day he runs a small law firm with his best friend Foggy Nelson and their assistant Karen Page. His work brings him up against Wilson Fisk, a powerful man building a criminal empire.",
      note: "Its story continues in the MCU's Daredevil: Born Again." },
    { id: "jessica-jones", title: "Jessica Jones", format: "Series", released: "2015-11-20", section: "netflix", wiki: "Jessica_Jones_(TV_series)", length: "3 seasons", group: "defenders", canon: "recognised",
      summary: "Jessica Jones, a former superhero with great strength, now works as a hard-drinking private investigator in Hell's Kitchen. A new case puts her on the trail of Kilgrave, a man who can control minds and who once forced her to do terrible things. Jessica has to face the trauma he left behind." },
    { id: "luke-cage", title: "Luke Cage", format: "Series", released: "2016-09-30", section: "netflix", wiki: "Luke_Cage_(TV_series)", length: "2 seasons", group: "defenders", canon: "recognised",
      summary: "Luke Cage, a former convict with unbreakable skin and great strength, is trying to live quietly in Harlem. When crime and corruption threaten the neighbourhood, he is pushed into standing up for it. His fight puts him against powerful gangsters and politicians." },
    { id: "iron-fist", title: "Iron Fist", format: "Series", released: "2017-03-17", section: "netflix", wiki: "Iron_Fist_(TV_series)", length: "2 seasons", group: "defenders", canon: "recognised",
      summary: "Danny Rand, presumed dead in a plane crash as a child, returns to New York fifteen years later. He was raised by warrior monks in the mystical city of K'un-Lun, where he gained the power of the Iron Fist. Danny tries to reclaim his family's company and his place in the world." },
    { id: "the-defenders", title: "The Defenders", format: "Series", released: "2017-08-18", section: "netflix", wiki: "The_Defenders_(miniseries)", length: "8 episodes", group: "defenders", canon: "recognised", links: ["daredevil-netflix"],
      summary: "Daredevil, Jessica Jones, Luke Cage and Iron Fist are four very different heroes, each fighting for their own part of New York. When an ancient organisation called the Hand threatens the city, they are forced together. They have to learn to trust each other to stop it." },
    { id: "punisher-netflix", title: "The Punisher (Netflix)", format: "Series", released: "2017-11-17", section: "netflix", wiki: "The_Punisher_(TV_series)", length: "2 seasons", group: "defenders", canon: "recognised", links: ["daredevil-netflix"],
      summary: "Frank Castle, introduced in Daredevil, has taken his revenge on the gangs he blamed for his family's murder. Then he learns that the truth goes much further. With a hacker called Micro, Frank uncovers a conspiracy linked to his time as a soldier." },

    /* ---------- Animated series ---------- */
    { id: "marvel-super-heroes-1966", title: "The Marvel Super Heroes", format: "Series", animated: true, released: "1966-09-01", section: "animation", wiki: "The_Marvel_Super_Heroes", group: "classic-animation",
      summary: "Marvel's first cartoon was an anthology starring Captain America, Iron Man, the Hulk, Thor and the Sub-Mariner, each with his own segments and theme song. It used art taken directly from the comics, with very limited movement, and adapted many of the original 1960s comic stories." },
    { id: "fantastic-four-1967", title: "Fantastic Four (1967)", format: "Series", animated: true, released: "1967-09-09", section: "animation", wiki: "Fantastic_Four_(1967_TV_series)", group: "classic-animation",
      summary: "Hanna-Barbera's animated series follows Reed Richards, Sue Storm, Johnny Storm and Ben Grimm as the Fantastic Four. It adapted stories from the original comics, with the team facing villains such as Doctor Doom, the Mole Man and Galactus." },
    { id: "iron-man-1994", title: "Iron Man (1994)", format: "Series", animated: true, released: "1994-09-24", section: "animation", wiki: "Iron_Man_(1994_TV_series)", length: "2 seasons", group: "classic-animation",
      summary: "Tony Stark leads the superhero team Force Works against the Mandarin and his allies. The series aired as part of The Marvel Action Hour, alongside Fantastic Four." },
    { id: "fantastic-four-1994", title: "Fantastic Four (1994)", format: "Series", animated: true, released: "1994-09-24", section: "animation", wiki: "Fantastic_Four_(1994_TV_series)", length: "2 seasons", group: "classic-animation",
      summary: "The First Family's 1990s cartoon aired alongside Iron Man in The Marvel Action Hour. It adapted classic comic stories, with Doctor Doom as the team's chief enemy." },
    { id: "incredible-hulk-1996", title: "The Incredible Hulk (1996)", format: "Series", animated: true, released: "1996-09-08", section: "animation", wiki: "The_Incredible_Hulk_(1996_TV_series)", length: "2 seasons", group: "classic-animation",
      summary: "Bruce Banner, voiced by Neal McDonough, is on the run from the military while trying to control the Hulk, voiced by Lou Ferrigno. He faces villains such as the Leader and the Abomination. Later episodes bring in his cousin Jennifer Walters, She-Hulk." },
    { id: "silver-surfer-1998", title: "Silver Surfer", format: "Series", animated: true, released: "1998-02-07", section: "animation", wiki: "Silver_Surfer_(TV_series)", length: "13 episodes", group: "classic-animation",
      summary: "Norrin Radd, once the herald of the planet-eating Galactus, breaks free of his master. As the Silver Surfer, he travels the cosmos searching for his lost home planet, Zenn-La. His journey brings him into conflict with powerful cosmic forces." },
    { id: "armored-adventures", title: "Iron Man: Armored Adventures", format: "Series", animated: true, released: "2009-04-24", section: "animation", wiki: "Iron_Man:_Armored_Adventures", length: "2 seasons", group: "modern-animation",
      summary: "Teenage Tony Stark loses his father in a plane crash and suspects that it was no accident. With his friends James Rhodes and Pepper Potts, he secretly builds the Iron Man armour while still going to high school. He uses it to uncover the truth and stop the villains threatening the city." },
    { id: "earths-mightiest-heroes", title: "The Avengers: Earth's Mightiest Heroes", format: "Series", animated: true, released: "2010-09-22", section: "animation", wiki: "The_Avengers:_Earth's_Mightiest_Heroes", length: "2 seasons", group: "modern-animation",
      summary: "A mass breakout from four high-security prisons brings together Iron Man, Thor, the Hulk, Ant-Man and the Wasp, who form the Avengers. They are soon joined by Captain America and other heroes. The series tells long, connected stories as the team faces some of Marvel's greatest threats." },
    { id: "avengers-assemble", title: "Avengers Assemble", format: "Series", animated: true, released: "2013-05-26", section: "animation", wiki: "Avengers_Assemble_(TV_series)", length: "5 seasons", group: "modern-animation",
      summary: "After a battle with the Red Skull leaves the team scattered, Iron Man and Captain America rebuild the Avengers. They are joined by Thor, the Hulk, Black Widow, Hawkeye and the Falcon. Styled after the films, the series follows the team through new threats season after season." },
    { id: "hulk-agents-of-smash", title: "Hulk and the Agents of S.M.A.S.H.", format: "Series", animated: true, released: "2013-08-11", section: "animation", wiki: "Hulk_and_the_Agents_of_S.M.A.S.H.", length: "2 seasons", group: "modern-animation",
      summary: "The Hulk leads a team of gamma-powered heroes, She-Hulk, Red Hulk, A-Bomb and Skaar, against monsters and supervillains. To win over a public that fears them, they film their missions and post them online." },
    { id: "guardians-animated", title: "Guardians of the Galaxy (2015)", format: "Series", animated: true, released: "2015-09-26", section: "animation", wiki: "Guardians_of_the_Galaxy_(TV_series)", length: "3 seasons", group: "modern-animation",
      summary: "The Guardians of the Galaxy, Star-Lord, Gamora, Drax, Rocket and Groot, find a map that leads to a powerful artefact. They race Thanos and his followers to find it first. The team's adventures take them to worlds across the galaxy." },
    { id: "modok", title: "M.O.D.O.K.", format: "Series", animated: true, released: "2021-05-21", section: "animation", wiki: "M.O.D.O.K._(TV_series)", length: "10 episodes", group: "modern-animation",
      summary: "A stop-motion comedy about the supervillain M.O.D.O.K., voiced by Patton Oswalt, who loses control of his evil organisation to a tech company. As his villainous career falls apart, his family life starts to crumble too." },
    { id: "hit-monkey", title: "Hit-Monkey", format: "Series", animated: true, released: "2021-11-17", section: "animation", wiki: "Hit-Monkey_(TV_series)", length: "2 seasons", group: "modern-animation",
      summary: "In the mountains of Japan, a snow monkey's troop is wiped out by assassins. The monkey is guided by the ghost of an American hitman and learns to become an assassin himself. He sets out for revenge on Tokyo's corrupt underworld." },
    { id: "moon-girl", title: "Moon Girl and Devil Dinosaur", format: "Series", animated: true, released: "2023-02-10", section: "animation", wiki: "Moon_Girl_and_Devil_Dinosaur_(TV_series)", length: "2 seasons", group: "modern-animation",
      summary: "Thirteen-year-old genius Lunella Lafayette accidentally opens a time portal and brings a ten-ton T. rex, Devil Dinosaur, into the present. Together they protect New York's Lower East Side as Moon Girl and Devil Dinosaur, while Lunella helps her family run their roller-skating rink." },
  ],
};
