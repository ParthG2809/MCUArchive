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
      summary: "Shy high-school student Peter Parker is bitten by a genetically engineered spider and gains incredible strength, agility and the ability to shoot webs. After a personal tragedy teaches him that great power brings great responsibility, he becomes Spider-Man. Peter has to balance his double life and his feelings for Mary Jane Watson as a deadly new villain, the Green Goblin, terrorises New York." },
    { id: "spider-man-2", title: "Spider-Man 2", format: "Film", released: "2004-06-30", section: "raimi", wiki: "Spider-Man_2", length: "127 min", crew: "Directed by Sam Raimi", group: "raimi",
      summary: "Two years into life as Spider-Man, Peter Parker is struggling to keep up with college, work and the people he loves, and his powers start to fail. Meanwhile, a fusion experiment goes wrong and turns scientist Otto Octavius into Doctor Octopus, a man controlled by four mechanical arms. Peter has to decide whether he can keep being Spider-Man at all." },
    { id: "spider-man-3", title: "Spider-Man 3", format: "Film", released: "2007-05-04", section: "raimi", wiki: "Spider-Man_3", length: "139 min", crew: "Directed by Sam Raimi", group: "raimi",
      summary: "Life is finally going well for Peter Parker when an alien substance attaches itself to him, giving him a new black suit and bringing out his darker side. At the same time, he faces Sandman, a criminal with a link to his past, and his former best friend Harry Osborn. Peter has to fight his own worst instincts as much as his enemies." },

    /* ---------- Webb ---------- */
    { id: "amazing-spider-man", title: "The Amazing Spider-Man", format: "Film", released: "2012-07-03", section: "webb", wiki: "The_Amazing_Spider-Man_(film)", length: "136 min", crew: "Directed by Marc Webb", group: "webb", links: ["no-way-home"],
      summary: "Peter Parker, raised by his aunt and uncle after his parents vanished, finds clues about his father's work that lead him to Oscorp and the scientist Curt Connors. A spider bite there gives him extraordinary powers. As Peter becomes Spider-Man and falls for classmate Gwen Stacy, Connors's experiments turn him into a dangerous creature, the Lizard." },
    { id: "amazing-spider-man-2", title: "The Amazing Spider-Man 2", format: "Film", released: "2014-05-02", section: "webb", wiki: "The_Amazing_Spider-Man_2", length: "142 min", crew: "Directed by Marc Webb", group: "webb",
      summary: "Peter Parker loves being Spider-Man, but his relationship with Gwen Stacy is complicated by a promise he made. A lonely Oscorp engineer, Max Dillon, becomes the powerful Electro, and Peter's old friend Harry Osborn returns with a desperate secret. Peter also keeps digging into the truth about his parents." },

    /* ---------- Spider-Verse animation ---------- */
    { id: "into-the-spider-verse", title: "Spider-Man: Into the Spider-Verse", format: "Film", animated: true, released: "2018-12-14", section: "animated", wiki: "Spider-Man:_Into_the_Spider-Verse", length: "117 min", crew: "Directed by Bob Persichetti, Peter Ramsey and Rodney Rothman", group: "spider-verse",
      summary: "Brooklyn teenager Miles Morales is bitten by a radioactive spider just as the Kingpin's experiment tears open the walls between universes. Spider-People from other dimensions are pulled into Miles's world, including an older Peter Parker and Gwen Stacy. Miles has to learn to be Spider-Man, fast, and help them get home.",
      note: "Won the Academy Award for Best Animated Feature." },
    { id: "across-the-spider-verse", title: "Spider-Man: Across the Spider-Verse", format: "Film", animated: true, released: "2023-06-02", section: "animated", wiki: "Spider-Man:_Across_the_Spider-Verse", length: "140 min", crew: "Directed by Joaquim Dos Santos, Kemp Powers and Justin K. Thompson", group: "spider-verse", nexus: true,
      summary: "More than a year after becoming Spider-Man, Miles Morales is reunited with Gwen Stacy and swept across the Multiverse. He meets the Spider-Society, a team of Spider-People led by Miguel O'Hara who protect the Multiverse. When the heroes disagree about how to deal with a new threat, Miles has to decide what being a hero means to him." },
    { id: "beyond-the-spider-verse", title: "Spider-Man: Beyond the Spider-Verse", format: "Film", animated: true, released: "2027-06-18", section: "animated", wiki: "Spider-Man:_Beyond_the_Spider-Verse", group: "spider-verse",
      summary: "The final film in Sony Pictures Animation's Spider-Verse trilogy continues the story left on a cliffhanger by Across the Spider-Verse. Miles Morales is trapped in another universe, while Gwen Stacy and a band of Spider-People set out to find him. Further plot details have not been released." },

    /* ---------- Sony's Spider-Man Universe ---------- */
    { id: "venom", title: "Venom", format: "Film", released: "2018-10-05", section: "ssu", wiki: "Venom_(2018_film)", length: "112 min", crew: "Directed by Ruben Fleischer", group: "venom",
      summary: "Investigative journalist Eddie Brock loses his job and his fiancée after he goes after the Life Foundation, a company secretly testing alien life forms on people. When he breaks into its lab, Eddie bonds with an alien symbiote called Venom, which gives him great powers and a voice in his head. The two have to learn to live together." },
    { id: "let-there-be-carnage", title: "Venom: Let There Be Carnage", format: "Film", released: "2021-10-01", section: "ssu", wiki: "Venom:_Let_There_Be_Carnage", length: "97 min", crew: "Directed by Andy Serkis", group: "venom", links: ["no-way-home"],
      summary: "Eddie Brock and Venom are still struggling to share one body. When Eddie interviews serial killer Cletus Kasady, the killer gains a symbiote of his own and becomes Carnage. Eddie and Venom have to put their differences aside to stop him.",
      note: "The mid-credits scene briefly pulls Eddie into the MCU." },
    { id: "morbius", title: "Morbius", format: "Film", released: "2022-04-01", section: "ssu", wiki: "Morbius_(film)", length: "104 min", crew: "Directed by Daniel Espinosa", group: "ssu",
      summary: "Biochemist Michael Morbius has suffered from a rare blood disease all his life. Desperate to save himself and others like him, he tries a dangerous cure using vampire bat DNA. It gives him incredible abilities, but also a terrible hunger for blood that he has to fight to control." },
    { id: "madame-web", title: "Madame Web", format: "Film", released: "2024-02-14", section: "ssu", wiki: "Madame_Web_(film)", length: "116 min", crew: "Directed by S. J. Clarkson", group: "ssu",
      summary: "In 2003, New York paramedic Cassandra Webb starts having visions of the future. When she sees three young women being hunted by a mysterious man with spider-like powers, she steps in to protect them. As she learns to use her gift, Cassie discovers a link to her own past and her mother's research in the Amazon." },
    { id: "the-last-dance", title: "Venom: The Last Dance", format: "Film", released: "2024-10-25", section: "ssu", wiki: "Venom:_The_Last_Dance", length: "109 min", crew: "Directed by Kelly Marcel", group: "venom",
      summary: "Eddie Brock and Venom are on the run, wanted by the military and hunted by enemies from Venom's home world. With danger closing in from both sides, the two have to rely on each other more than ever. This is their final film together." },
    { id: "kraven", title: "Kraven the Hunter", format: "Film", released: "2024-12-13", section: "ssu", wiki: "Kraven_the_Hunter_(film)", length: "127 min", crew: "Directed by J. C. Chandor", group: "ssu",
      summary: "Sergei Kravinoff is the son of a ruthless Russian gangster. After a lion attack gives him animal-like strength, speed and senses, he rejects his father's world and becomes a hunter of criminals. His quest puts him and his younger brother Dmitri in danger." },

    /* ---------- Live-action TV ---------- */
    { id: "amazing-spider-man-1977", title: "The Amazing Spider-Man (1977)", format: "Series", released: "1977-09-14", section: "live-tv", wiki: "The_Amazing_Spider-Man_(TV_series)", length: "2 seasons", group: "spider-tv",
      summary: "CBS's live-action series stars Nicholas Hammond as Peter Parker, a college student and freelance photographer for J. Jonah Jameson's Daily Bugle who gains his powers from a radioactive spider. Spider-Man mostly faces kidnappers, extortionists and other criminal schemers rather than costumed villains." },
    { id: "toei-spider-man", title: "Spider-Man (Toei, 1978)", format: "Series", released: "1978-05-17", section: "live-tv", wiki: "Spider-Man_(Japanese_TV_series)", length: "41 episodes", group: "spider-tv",
      summary: "In Toei's Japanese live-action series, motorcycle racer Takuya Yamashiro gains spider powers from a dying alien after his father is killed by the evil Iron Cross Army. He fights the army's monsters as Spider-Man, and when they grow to giant size he battles them in the giant robot Leopardon.",
      note: "Its giant-robot idea went on to shape the Super Sentai shows." },
    { id: "spider-noir", title: "Spider-Noir", format: "Series", released: "2026-05-25", section: "live-tv", wiki: "Spider-Noir", length: "8 episodes", group: "spider-tv",
      summary: "In 1930s New York, Nicolas Cage plays Ben Reilly, an ageing, down-on-his-luck private investigator haunted by his past as the city's only superhero. The live-action series was made in two versions, one in black and white and one in colour." },

    /* ---------- Animated TV ---------- */
    { id: "spider-man-1967", title: "Spider-Man (1967)", format: "Series", animated: true, released: "1967-09-09", section: "anim-tv", wiki: "Spider-Man_(1967_TV_series)", length: "3 seasons", group: "spider-tv",
      summary: "The first animated Spider-Man series ran for three seasons on ABC, with Paul Soles voicing Peter Parker. Spider-Man swings through New York to face classic villains such as the Green Goblin, Doctor Octopus and Mysterio, while Peter works as a photographer for the Daily Bugle. It is best remembered for its theme song." },
    { id: "spider-man-1981", title: "Spider-Man (1981)", format: "Series", animated: true, released: "1981-09-12", section: "anim-tv", wiki: "Spider-Man_(1981_TV_series)", length: "26 episodes", group: "spider-tv",
      summary: "A syndicated Spider-Man cartoon from Marvel Productions. Peter Parker balances college and photography for the Daily Bugle while facing a series of classic villains, including several stories that pit him against Doctor Doom." },
    { id: "amazing-friends", title: "Spider-Man and His Amazing Friends", format: "Series", animated: true, released: "1981-09-12", section: "anim-tv", wiki: "Spider-Man_and_His_Amazing_Friends", length: "3 seasons", group: "spider-tv",
      summary: "Spider-Man teams up with Iceman and Firestar, college students who share Aunt May's house and a hidden high-tech base. Firestar, who controls heat and fire, was created for the show and later joined the comics. Together the three heroes face many of Marvel's villains." },
    { id: "spider-man-tas", title: "Spider-Man: The Animated Series", format: "Series", animated: true, released: "1994-11-19", section: "anim-tv", wiki: "Spider-Man:_The_Animated_Series", length: "5 seasons", group: "spider-tv",
      summary: "Fox Kids' series follows Peter Parker as a college student and Spider-Man, with Christopher Daniel Barnes voicing the hero. It tells long, connected stories adapted from the comics, as Spider-Man faces the Kingpin, Venom, the Hobgoblin and many more of his classic villains." },
    { id: "spider-man-unlimited", title: "Spider-Man Unlimited", format: "Series", animated: true, released: "1999-10-02", section: "anim-tv", wiki: "Spider-Man_Unlimited", length: "13 episodes", group: "spider-tv",
      summary: "Spider-Man follows Venom and Carnage to Counter-Earth, a planet hidden on the far side of the Sun. Wearing a new high-tech suit, he finds a world ruled by the High Evolutionary and his part-animal Beastials, and joins the humans who are fighting back." },
    { id: "new-animated-series", title: "Spider-Man: The New Animated Series", format: "Series", animated: true, released: "2003-07-11", section: "anim-tv", wiki: "Spider-Man:_The_New_Animated_Series", length: "13 episodes", group: "spider-tv",
      summary: "A computer-animated MTV series that loosely follows the 2002 film, with Neil Patrick Harris voicing Peter Parker. Peter, Mary Jane and Harry Osborn are in college as Spider-Man faces a mix of new and classic villains." },
    { id: "spectacular-spider-man", title: "The Spectacular Spider-Man", format: "Series", animated: true, released: "2008-03-08", section: "anim-tv", wiki: "The_Spectacular_Spider-Man_(TV_series)", length: "2 seasons", group: "spider-tv",
      summary: "Josh Keaton voices a teenage Peter Parker in his early days as Spider-Man, juggling high school, a lab internship and photographs for the Daily Bugle. Developed by Greg Weisman, the series builds a connected story in which classic villains such as the Vulture, Doctor Octopus and the Green Goblin emerge one by one." },
    { id: "ultimate-spider-man", title: "Ultimate Spider-Man", format: "Series", animated: true, released: "2012-04-01", section: "anim-tv", wiki: "Ultimate_Spider-Man_(TV_series)", length: "4 seasons", group: "spider-tv",
      summary: "Nick Fury recruits a young Spider-Man, voiced by Drake Bell, to train with S.H.I.E.L.D. alongside a team of teenage heroes: Nova, Power Man, Iron Fist and White Tiger. The comedy series is known for Peter's fourth-wall-breaking jokes and cutaways." },
    { id: "spider-man-2017", title: "Marvel's Spider-Man (2017)", format: "Series", animated: true, released: "2017-08-19", section: "anim-tv", wiki: "Spider-Man_(2017_TV_series)", length: "3 seasons", group: "spider-tv",
      summary: "Peter Parker, voiced by Robbie Daymond, is a newly bitten Spider-Man and a student at Horizon High, a school for young geniuses. He learns to be a hero while dealing with classes, friends and villains who often come from closer to home than he expects." },
    { id: "spidey-amazing-friends", title: "Spidey and His Amazing Friends", format: "Series", animated: true, released: "2021-08-06", section: "anim-tv", wiki: "Spidey_and_His_Amazing_Friends", group: "spider-tv",
      summary: "A preschool series in which Peter Parker, Miles Morales and Gwen Stacy team up as Spidey, Spin and Ghost-Spider. From their secret base, with their robot helper TRACE-E, they stop villains such as the Green Goblin, Doc Ock and Rhino, learning about teamwork along the way." },
    { id: "friendly-neighborhood", title: "Your Friendly Neighborhood Spider-Man", format: "Series", animated: true, released: "2025-01-29", section: "anim-tv", wiki: "Your_Friendly_Neighborhood_Spider-Man", length: "10 episodes", crew: "Created by Jeff Trammell", group: "spider-tv",
      summary: "In an animated series set apart from the main MCU timeline, Peter Parker, voiced by Hudson Thames, begins his first year as Spider-Man while starting high school. He takes an internship with Norman Osborn, voiced by Colman Domingo, who becomes his mentor, and makes new friends while learning how to be a hero.",
      note: "Made by Marvel Studios Animation, but set in its own alternate universe." },
  ],
};
