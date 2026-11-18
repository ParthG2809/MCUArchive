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
     summary   original synopsis (2–4 sentences: the premise, not the ending; no spoiler markup)
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
      summary: "Billionaire weapons maker Tony Stark is captured by terrorists in Afghanistan and ordered to build them a missile. Instead, he secretly builds a crude suit of armour and breaks out. Back home, a changed Tony shuts down his company's weapons business and perfects the suit, putting him on a collision course with people who profit from the arms trade.",
      note: "Stay after the credits. This is where the whole universe starts." },
    { id: "incredible-hulk", title: "The Incredible Hulk", format: "Film", released: "2008-06-13", phase: 1, wiki: "The_Incredible_Hulk_(film)", length: "112 min", crew: "Directed by Louis Leterrier", setIn: "2011", group: "hulk",
      summary: "Scientist Bruce Banner lives in hiding in Brazil, learning to control his anger while he searches for a cure for the gamma exposure that turns him into the Hulk. General Thaddeus Ross wants the Hulk as a weapon and sends soldier Emil Blonsky to bring him in. Banner is forced back to the United States and back to Betty Ross, the woman he left behind." },
    { id: "iron-man-2", title: "Iron Man 2", format: "Film", released: "2010-05-07", phase: 1, wiki: "Iron_Man_2", length: "124 min", crew: "Directed by Jon Favreau", setIn: "2011", group: "iron-man",
      summary: "Tony Stark has told the world he is Iron Man, and now the US government wants his armour. While he fights to keep it, the arc reactor keeping him alive is slowly poisoning him. A Russian physicist with a grudge against the Stark family, Ivan Vanko, builds his own weapons to bring Tony down, with help from rival arms dealer Justin Hammer." },
    { id: "thor", title: "Thor", format: "Film", released: "2011-05-06", phase: 1, wiki: "Thor_(film)", length: "115 min", crew: "Directed by Kenneth Branagh", setIn: "2011", group: "thor",
      summary: "The god of thunder Thor is about to be crowned king of Asgard when his recklessness reignites an old war. His father Odin strips him of his powers and banishes him to Earth, where he lands in the New Mexico desert and meets scientist Jane Foster. Powerless and out of place, Thor must learn what it means to be worthy, while his brother Loki makes moves of his own at home." },
    { id: "first-avenger", title: "Captain America: The First Avenger", format: "Film", released: "2011-07-22", phase: 1, wiki: "Captain_America:_The_First_Avenger", length: "124 min", crew: "Directed by Joe Johnston", setIn: "1942–1945", group: "captain-america",
      summary: "In 1942, frail but determined Steve Rogers is turned down by the army again and again until a scientist picks him for a secret super-soldier programme. Transformed into a peak human, he becomes Captain America. Alongside his best friend Bucky Barnes and agent Peggy Carter, he takes the fight to HYDRA, a Nazi science division led by the Red Skull.",
      note: "Watching in story order? Start here." },
    { id: "avengers", title: "The Avengers", format: "Film", released: "2012-05-04", phase: 1, wiki: "The_Avengers_(2012_film)", length: "143 min", crew: "Directed by Joss Whedon", setIn: "2012", group: "avengers",
      summary: "Loki arrives on Earth, steals the Tesseract, an object of unlimited power, and plans to open the way for an alien army. S.H.I.E.L.D. director Nick Fury gathers Iron Man, Captain America, Thor, the Hulk, Black Widow and Hawkeye to stop him. First, though, this group of very different heroes has to learn to work together.",
      note: "The Battle of New York gets referenced for the next decade." },

    /* ---------- Phase Two ---------- */
    { id: "iron-man-3", title: "Iron Man 3", format: "Film", released: "2013-05-03", phase: 2, wiki: "Iron_Man_3", length: "130 min", crew: "Directed by Shane Black", setIn: "2012", group: "iron-man",
      summary: "Months after the battle in New York, Tony Stark cannot sleep and keeps building suits. When a terrorist known as the Mandarin launches a string of attacks and strikes Tony's own home, Tony is left stranded with little more than his wits. He has to track down the truth behind the attacks and protect Pepper Potts." },
    { id: "thor-dark-world", title: "Thor: The Dark World", format: "Film", released: "2013-11-08", phase: 2, wiki: "Thor:_The_Dark_World", length: "112 min", crew: "Directed by Alan Taylor", setIn: "2013", group: "thor",
      summary: "Jane Foster stumbles on the Aether, an ancient force of destruction, and wakes Malekith, leader of the Dark Elves, who wants to use it to plunge the universe into darkness. Thor brings Jane to Asgard to protect her. To stop Malekith, he has to turn to the one person he no longer trusts: his imprisoned brother Loki." },
    { id: "winter-soldier", title: "Captain America: The Winter Soldier", format: "Film", released: "2014-04-04", phase: 2, wiki: "Captain_America:_The_Winter_Soldier", length: "136 min", crew: "Directed by Anthony & Joe Russo", setIn: "2014", group: "captain-america",
      summary: "Captain America is working for S.H.I.E.L.D. in Washington and struggling to fit into the modern world. When Nick Fury is attacked, Steve and Black Widow find themselves on the run from the agency they serve. With new ally Sam Wilson, the Falcon, they uncover a conspiracy, and a mysterious assassin known as the Winter Soldier is sent to stop them." },
    { id: "guardians", title: "Guardians of the Galaxy", format: "Film", released: "2014-08-01", phase: 2, wiki: "Guardians_of_the_Galaxy_(film)", length: "121 min", crew: "Directed by James Gunn", setIn: "2014", group: "guardians",
      summary: "Taken from Earth as a boy, Peter Quill has grown up as a space outlaw, calling himself Star-Lord. He steals a mysterious orb that the fanatic Ronan wants, and suddenly everyone is after him. To survive, he forms an unlikely team with assassin Gamora, the talking raccoon Rocket, the tree-like Groot and the vengeful Drax." },
    { id: "age-of-ultron", title: "Avengers: Age of Ultron", format: "Film", released: "2015-05-01", phase: 2, wiki: "Avengers:_Age_of_Ultron", length: "141 min", crew: "Directed by Joss Whedon", setIn: "2015", group: "avengers",
      summary: "Tony Stark and Bruce Banner try to protect the world with Ultron, an artificial intelligence designed to keep the peace. Ultron decides that humanity itself is the problem. The Avengers have to face their own creation, along with two powerful new arrivals, the twins Wanda and Pietro Maximoff." },
    { id: "ant-man", title: "Ant-Man", format: "Film", released: "2015-07-17", phase: 2, wiki: "Ant-Man_(film)", length: "117 min", crew: "Directed by Peyton Reed", setIn: "2015", group: "ant-man",
      summary: "Just out of prison, Scott Lang wants to go straight and be a good father to his daughter Cassie. Instead, scientist Hank Pym recruits him to wear a suit that shrinks him to the size of an insect while making him stronger. With Hank and his daughter Hope, Scott has to pull off a heist to keep the shrinking technology out of the wrong hands." },

    /* ---------- Phase Three ---------- */
    { id: "civil-war", title: "Captain America: Civil War", format: "Film", released: "2016-05-06", phase: 3, wiki: "Captain_America:_Civil_War", length: "147 min", crew: "Directed by Anthony & Joe Russo", setIn: "2016", group: "captain-america",
      summary: "After an Avengers mission ends with civilian deaths, the world's governments demand that the team answer to the United Nations. Tony Stark agrees, while Steve Rogers refuses, and the Avengers split into two sides. When Steve's old friend Bucky Barnes is accused of a terrorist attack, the disagreement becomes a fight between friends, with Black Panther and Spider-Man drawn in." },
    { id: "doctor-strange", title: "Doctor Strange", format: "Film", released: "2016-11-04", phase: 3, wiki: "Doctor_Strange_(2016_film)", length: "115 min", crew: "Directed by Scott Derrickson", setIn: "2016–2017", group: "doctor-strange",
      summary: "Brilliant and arrogant surgeon Stephen Strange loses the use of his hands in a car crash. Desperate for a cure, he travels to Kathmandu and finds the Ancient One, who teaches him the mystic arts. As he learns to bend reality, Strange is pulled into a battle against a rogue sorcerer who wants to bring a dark power to Earth." },
    { id: "guardians-2", title: "Guardians of the Galaxy Vol. 2", format: "Film", released: "2017-05-05", phase: 3, wiki: "Guardians_of_the_Galaxy_Vol._2", length: "136 min", crew: "Directed by James Gunn", setIn: "2014", group: "guardians",
      summary: "The Guardians of the Galaxy are on the run after angering a powerful alien race when they are rescued by Ego, a mysterious being who says he is Peter Quill's father. As Peter gets to know the parent he never had, the rest of the team deals with old enemies, family rivalries and a mutiny among the Ravagers." },
    { id: "homecoming", title: "Spider-Man: Homecoming", format: "Film", released: "2017-07-07", phase: 3, wiki: "Spider-Man:_Homecoming", length: "133 min", crew: "Directed by Jon Watts", setIn: "2016", group: "spider-man",
      summary: "After his first adventure with the Avengers, fifteen-year-old Peter Parker is back at school in Queens, waiting for Tony Stark to call him up again. He tries to prove himself by tracking down Adrian Toomes, the Vulture, who is selling weapons made from alien technology. Peter has to balance homework, friends and a school dance with a villain far more dangerous than he expected." },
    { id: "ragnarok", title: "Thor: Ragnarok", format: "Film", released: "2017-11-03", phase: 3, wiki: "Thor:_Ragnarok", length: "130 min", crew: "Directed by Taika Waititi", setIn: "2017", group: "thor",
      summary: "Thor is stranded on the far side of the universe without his hammer, captured and forced to fight as a gladiator on the junk planet Sakaar, where his opponent turns out to be the Hulk. Meanwhile, Hela, the goddess of death, has taken over Asgard. Thor has to escape with a team of unlikely allies and get home before Ragnarok, the end of Asgard, arrives." },
    { id: "black-panther", title: "Black Panther", format: "Film", released: "2018-02-16", phase: 3, wiki: "Black_Panther_(film)", length: "134 min", crew: "Directed by Ryan Coogler", setIn: "2016", group: "wakanda",
      summary: "After his father's death, T'Challa returns home to Wakanda, a hidden and highly advanced African nation, to take the throne as king and Black Panther. His rule is soon tested by Erik Killmonger, a challenger with a claim of his own and a very different vision for Wakanda's future. T'Challa has to decide what kind of king, and what kind of nation, he wants to lead." },
    { id: "infinity-war", title: "Avengers: Infinity War", format: "Film", released: "2018-04-27", phase: 3, wiki: "Avengers:_Infinity_War", length: "149 min", crew: "Directed by Anthony & Joe Russo", setIn: "2018", group: "avengers",
      summary: "Thanos, a warlord determined to wipe out half of all life, sets out to collect the six Infinity Stones. The Avengers, still divided, and the Guardians of the Galaxy have to join forces to stop him. Battles break out from New York to Wakanda and across the galaxy as everyone races to keep the Stones out of his hands." },
    { id: "ant-man-wasp", title: "Ant-Man and the Wasp", format: "Film", released: "2018-07-06", phase: 3, wiki: "Ant-Man_and_the_Wasp", length: "118 min", crew: "Directed by Peyton Reed", setIn: "2018", group: "ant-man",
      summary: "Scott Lang is near the end of two years of house arrest when Hank Pym and Hope van Dyne ask for his help. They believe Hope's mother, Janet, may still be alive in the Quantum Realm, and they want to bring her home. Scott and Hope, now the Wasp, have to stay ahead of a black-market dealer and a mysterious, phasing enemy called Ghost." },
    { id: "captain-marvel", title: "Captain Marvel", format: "Film", released: "2019-03-08", phase: 3, wiki: "Captain_Marvel_(film)", length: "123 min", crew: "Directed by Anna Boden & Ryan Fleck", setIn: "1995", group: "captain-marvel",
      summary: "In 1995, Vers, a warrior for the alien Kree with no memory of her past, crash-lands on Earth while fighting the shape-shifting Skrulls. She teams up with a young S.H.I.E.L.D. agent named Nick Fury. Together they follow clues to her forgotten life as Carol Danvers, a US Air Force pilot, and to the truth about where her powers came from." },
    { id: "endgame", title: "Avengers: Endgame", format: "Film", released: "2019-04-26", phase: 3, wiki: "Avengers:_Endgame", length: "181 min", crew: "Directed by Anthony & Joe Russo", setIn: "2018–2023", group: "avengers", links: ["loki-s1"],
      summary: "Thanos has succeeded, and half of all life is gone. The surviving Avengers, grieving and scattered, look for any way to reverse what happened. When an unexpected chance appears, they come together for one last mission to bring everyone back, whatever it costs.",
      note: "No post-credit scene. Listen for the sound at the very end." },
    { id: "far-from-home", title: "Spider-Man: Far From Home", format: "Film", released: "2019-07-02", phase: 3, wiki: "Spider-Man:_Far_From_Home", length: "129 min", crew: "Directed by Jon Watts", setIn: "2024", group: "spider-man",
      summary: "Peter Parker is grieving Tony Stark and just wants a normal school trip to Europe and a chance to tell MJ how he feels. Nick Fury has other plans. Peter is drafted to help Quentin Beck, a hero called Mysterio who says he is from another Earth, against giant monsters made of the elements." },

    /* ---------- Phase Four ---------- */
    { id: "wandavision", title: "WandaVision", format: "Series", released: "2021-01-15", phase: 4, wiki: "WandaVision", length: "9 episodes", crew: "Directed by Matt Shakman", setIn: "2023", group: "wanda", links: ["multiverse-of-madness"],
      summary: "Wanda Maximoff and Vision live as newlyweds in the town of Westview, inside what looks like a classic television sitcom that changes decade with every episode. The picture-perfect suburban life starts to crack, and outside the town, a government agency is trying to work out what is going on. Wanda and Vision begin to question what is real." },
    { id: "falcon-winter-soldier", title: "The Falcon and the Winter Soldier", format: "Series", released: "2021-03-19", phase: 4, wiki: "The_Falcon_and_the_Winter_Soldier", length: "6 episodes", crew: "Directed by Kari Skogland", setIn: "2024", group: "captain-america",
      summary: "Six months after Steve Rogers handed over his shield, Sam Wilson is unsure he should carry it. He and Bucky Barnes, two very different partners, team up against the Flag Smashers, a group of super-strong rebels. At the same time, the government names a new Captain America, which forces Sam to think about what the shield means." },
    { id: "loki-s1", title: "Loki (Season 1)", format: "Series", released: "2021-06-09", phase: 4, wiki: "Loki_season_1", length: "6 episodes", crew: "Directed by Kate Herron", setIn: "Outside time", group: "loki", nexus: true, links: ["deadpool-wolverine"],
      summary: "A version of Loki who escaped with the Tesseract is arrested by the Time Variance Authority, an agency that guards the flow of time. Agent Mobius offers him a deal: help them catch a dangerous fugitive who is killing their agents. Loki is drawn into a hunt across time that makes him question who he is and what the TVA really is.",
      note: "Nexus event. The Multiverse starts here." },
    { id: "black-widow", title: "Black Widow", format: "Film", released: "2021-07-09", phase: 4, wiki: "Black_Widow_(2021_film)", length: "134 min", crew: "Directed by Cate Shortland", setIn: "2016", group: "black-widow",
      summary: "Between Civil War and Infinity War, Natasha Romanoff is on the run. She is forced to confront her past when she reunites with Yelena Belova, the sister she grew up with, and the rest of the fake family she had as a child. Together they have to face the Red Room, the secret programme that trained them as assassins." },
    { id: "what-if-s1", title: "What If…? (Season 1)", format: "Series", animated: true, released: "2021-08-11", phase: 4, wiki: "What_If...?_season_1", length: "9 episodes", crew: "Directed by Bryan Andrews", setIn: "The Multiverse", group: "what-if",
      summary: "The Watcher, a cosmic being who observes the Multiverse, shows what might have happened if key moments of the MCU had gone differently. Peggy Carter takes the super-soldier serum instead of Steve Rogers, T'Challa becomes Star-Lord, and Doctor Strange makes a different choice after his accident. Each animated episode tells a different story." },
    { id: "shang-chi", title: "Shang-Chi and the Legend of the Ten Rings", format: "Film", released: "2021-09-03", phase: 4, wiki: "Shang-Chi_and_the_Legend_of_the_Ten_Rings", length: "132 min", crew: "Directed by Destin Daniel Cretton", setIn: "2024", group: "shang-chi",
      summary: "Shang-Chi is living a quiet life in San Francisco as a parking valet when the Ten Rings organisation comes after him. He is forced to face the past he ran from and his father Wenwu, the ruler of the Ten Rings. With his best friend Katy and his estranged sister, Shang-Chi travels to a hidden world to stop his father's dangerous plan." },
    { id: "eternals", title: "Eternals", format: "Film", released: "2021-11-05", phase: 4, wiki: "Eternals_(film)", length: "156 min", crew: "Directed by Chloé Zhao", setIn: "2024", group: "eternals",
      summary: "The Eternals, immortal beings who came to Earth 7,000 years ago, have quietly protected humanity from creatures called the Deviants. Now living separate lives around the world, they reunite when the Deviants return. Sersi and the others must decide whether their mission is what they believed it to be." },
    { id: "hawkeye", title: "Hawkeye", format: "Series", released: "2021-11-24", phase: 4, wiki: "Hawkeye_(2021_TV_series)", length: "6 episodes", crew: "Directed by Rhys Thomas and Bert & Bertie", setIn: "2024", group: "street-level",
      summary: "Clint Barton just wants to spend Christmas in New York with his children. His plans fall apart when he meets Kate Bishop, a young archer who has idolised him since childhood and has stumbled into trouble linked to his past as the vigilante Ronin. Together they have a few days to deal with the criminals after them and make it home for the holiday." },
    { id: "no-way-home", title: "Spider-Man: No Way Home", format: "Film", released: "2021-12-17", phase: 4, wiki: "Spider-Man:_No_Way_Home", length: "148 min", crew: "Directed by Jon Watts", setIn: "2024", group: "spider-man", nexus: true,
      summary: "Peter Parker's secret identity has been revealed to the world, turning his life and his friends' lives upside down. He asks Doctor Strange to help him fix it with a spell, but something goes wrong. Dangerous visitors from other universes start to arrive, and Peter has to learn what it really means to be Spider-Man.",
      note: "Three Spider-Men, three film series, one night. Watch the Raimi and Webb films first." },
    { id: "moon-knight", title: "Moon Knight", format: "Series", released: "2022-03-30", phase: 4, wiki: "Moon_Knight_(TV_series)", length: "6 episodes", crew: "Directed by Mohamed Diab, Justin Benson & Aaron Moorhead", setIn: "2025", group: "moon-knight",
      summary: "Steven Grant, a mild-mannered gift-shop worker in London, keeps waking up in strange places with no memory of how he got there. He discovers he shares a body with Marc Spector, a former mercenary who serves the Egyptian moon god Khonshu. The two have to work together as they are pulled into a deadly mystery involving the gods of Egypt." },
    { id: "multiverse-of-madness", title: "Doctor Strange in the Multiverse of Madness", format: "Film", released: "2022-05-06", phase: 4, wiki: "Doctor_Strange_in_the_Multiverse_of_Madness", length: "126 min", crew: "Directed by Sam Raimi", setIn: "2024", group: "doctor-strange", nexus: true, links: ["wandavision"],
      summary: "Doctor Strange rescues America Chavez, a teenager who can travel between universes, from the monsters hunting her. To protect her, he asks Wanda Maximoff for help. The search for answers sends Strange across the Multiverse, where he meets other versions of himself and faces a powerful new enemy." },
    { id: "ms-marvel", title: "Ms. Marvel", format: "Series", released: "2022-06-08", phase: 4, wiki: "Ms._Marvel_(TV_series)", length: "6 episodes", crew: "Directed by Adil & Bilall, Meera Menon and Sharmeen Obaid-Chinoy", setIn: "2025", group: "captain-marvel",
      summary: "Kamala Khan is a Pakistani-American teenager in Jersey City who writes fan fiction about her hero, Captain Marvel. When she puts on an old family bangle, she gains powers of her own. Kamala has to deal with high school, a loving but strict family, and the mysterious history of the bangle." },
    { id: "love-and-thunder", title: "Thor: Love and Thunder", format: "Film", released: "2022-07-08", phase: 4, wiki: "Thor:_Love_and_Thunder", length: "119 min", crew: "Directed by Taika Waititi", setIn: "2025", group: "thor",
      summary: "Thor is trying to find inner peace when a new threat appears: Gorr the God Butcher, who has sworn to kill every god. Thor turns to King Valkyrie, Korg and his ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they set out on a cosmic adventure to stop Gorr." },
    { id: "i-am-groot-s1", title: "I Am Groot (Season 1)", format: "Series", animated: true, released: "2022-08-10", phase: 4, wiki: "I_Am_Groot", length: "5 shorts", crew: "Directed by Kirsten Lepore", setIn: "2014–2017", group: "guardians",
      summary: "A set of five short animated episodes follows Baby Groot, the little sapling of the Guardians of the Galaxy, getting into trouble on his own. With almost no dialogue beyond his own name, he causes chaos aboard the ship and on alien worlds." },
    { id: "she-hulk", title: "She-Hulk: Attorney at Law", format: "Series", released: "2022-08-18", phase: 4, wiki: "She-Hulk:_Attorney_at_Law", length: "9 episodes", crew: "Directed by Kat Coiro and Anu Valia", setIn: "2025", group: "hulk",
      summary: "Lawyer Jennifer Walters gains the powers of her cousin, Bruce Banner, after an accident and becomes the green, six-and-a-half-foot She-Hulk. She would much rather keep practising law than be a superhero. Hired to lead a new superhuman law division, she takes on the strange cases of powered clients while trying to keep a normal life." },
    { id: "werewolf-by-night", title: "Werewolf by Night", format: "Special", released: "2022-10-07", phase: 4, wiki: "Werewolf_by_Night_(film)", length: "53 min", crew: "Directed by Michael Giacchino", group: "werewolf",
      summary: "After the death of a legendary monster hunter, a group of hunters gathers at his gloomy mansion for a ceremony. They will compete in a deadly hunt for a powerful relic, the Bloodstone. Among them are the hunter's estranged daughter Elsa and a mysterious man named Jack Russell, who has his own reasons for being there." },
    { id: "wakanda-forever", title: "Black Panther: Wakanda Forever", format: "Film", released: "2022-11-11", phase: 4, wiki: "Black_Panther:_Wakanda_Forever", length: "161 min", crew: "Directed by Ryan Coogler", setIn: "2025", group: "wakanda",
      summary: "After the death of King T'Challa, Queen Ramonda, Princess Shuri and the warriors of Wakanda fight to protect their nation as other countries try to take its vibranium. A new threat rises from the sea: Namor, the king of a hidden underwater nation called Talokan. Wakanda has to find a way forward through grief and war." },
    { id: "guardians-holiday", title: "The Guardians of the Galaxy Holiday Special", format: "Special", released: "2022-11-25", phase: 4, wiki: "The_Guardians_of_the_Galaxy_Holiday_Special", length: "44 min", crew: "Directed by James Gunn", group: "guardians",
      summary: "Mantis and Drax want to give Peter Quill the perfect Christmas present to cheer him up. They decide that the best gift is his childhood hero, actor Kevin Bacon, and fly to Hollywood to find him. Their plan does not go smoothly." },

    /* ---------- Phase Five ---------- */
    { id: "quantumania", title: "Ant-Man and the Wasp: Quantumania", format: "Film", released: "2023-02-17", phase: 5, wiki: "Ant-Man_and_the_Wasp:_Quantumania", length: "125 min", crew: "Directed by Peyton Reed", setIn: "Post-Blip", group: "ant-man",
      summary: "Scott Lang and Hope van Dyne are enjoying life as heroes when the whole family, including Hank Pym, Janet van Dyne and Scott's daughter Cassie, is pulled into the Quantum Realm. In this strange world they meet bizarre new creatures. They also face Kang the Conqueror, a man with a terrifying past, whom Janet has been hiding from for years." },
    { id: "guardians-3", title: "Guardians of the Galaxy Vol. 3", format: "Film", released: "2023-05-05", phase: 5, wiki: "Guardians_of_the_Galaxy_Vol._3", length: "150 min", crew: "Directed by James Gunn", setIn: "Post-Blip", group: "guardians",
      summary: "The Guardians of the Galaxy have settled on Knowhere, but Rocket's dark past comes back to haunt them. When Rocket is badly hurt, Peter Quill, who is still mourning Gamora, leads the team on a dangerous mission to save his life. It brings them face to face with the High Evolutionary, the scientist who made Rocket." },
    { id: "secret-invasion", title: "Secret Invasion", format: "Series", released: "2023-06-21", phase: 5, wiki: "Secret_Invasion_(TV_series)", length: "6 episodes", crew: "Directed by Ali Selim", setIn: "Post-Blip", group: "captain-marvel",
      summary: "Nick Fury returns to Earth after years in space when he learns that a group of shape-shifting Skrulls has secretly infiltrated positions of power. Working with his old ally Talos, Fury has to find out who can be trusted. The rebels plan to start a war that could put the whole planet in danger." },
    { id: "i-am-groot-s2", title: "I Am Groot (Season 2)", format: "Series", animated: true, released: "2023-09-06", phase: 5, wiki: "I_Am_Groot", length: "5 shorts", crew: "Directed by Kirsten Lepore", group: "guardians",
      summary: "Five more short, almost wordless animated episodes follow Baby Groot as he wanders into trouble. He explores alien worlds and meets strange creatures, with his only line still being his own name." },
    { id: "loki-s2", title: "Loki (Season 2)", format: "Series", released: "2023-10-05", phase: 5, wiki: "Loki_season_2", length: "6 episodes", crew: "Directed by Justin Benson & Aaron Moorhead, Dan DeLeeuw and Kasra Farahani", setIn: "Outside time", group: "loki", nexus: true, links: ["deadpool-wolverine"],
      summary: "Loki is back at the Time Variance Authority, but he has started slipping uncontrollably through time. With Mobius, he looks for the TVA's engineer, Ouroboros, to fix the problem. At the same time, the TVA is in chaos and the timeline itself is under threat." },
    { id: "the-marvels", title: "The Marvels", format: "Film", released: "2023-11-10", phase: 5, wiki: "The_Marvels", length: "105 min", crew: "Directed by Nia DaCosta", setIn: "Post-Blip", group: "captain-marvel",
      summary: "Carol Danvers, Monica Rambeau and Kamala Khan discover that their powers have become linked, so they swap places every time they use them at the same moment. Forced to work together, they have to stop Dar-Benn, a Kree leader seeking revenge on Carol. The three heroes have to learn to fight as a team." },
    { id: "what-if-s2", title: "What If…? (Season 2)", format: "Series", animated: true, released: "2023-12-22", phase: 5, wiki: "What_If...?_season_2", length: "9 episodes", crew: "Directed by Bryan Andrews", setIn: "The Multiverse", group: "what-if",
      summary: "The Watcher returns with more animated stories of the Multiverse, showing new versions of familiar heroes and events. Nebula joins the Nova Corps, Happy Hogan saves a Christmas party, and Kahhori, a young Mohawk woman, gains power from the Tesseract. Each episode tells a different story." },
    { id: "echo", title: "Echo", format: "Series", released: "2024-01-09", phase: 5, wiki: "Echo_(TV_series)", length: "5 episodes", crew: "Directed by Sydney Freeland and Catriona McKenzie", setIn: "Post-Blip", group: "street-level",
      summary: "Maya Lopez, a deaf Choctaw fighter, has been on the run since she turned against the crime lord Wilson Fisk. She returns to her hometown in Oklahoma, hoping to hide. There she has to face the family and community she left behind and the legacy of her ancestors, while Fisk's reach follows her home." },
    { id: "deadpool-wolverine", title: "Deadpool & Wolverine", format: "Film", released: "2024-07-26", phase: 5, wiki: "Deadpool_&_Wolverine", length: "128 min", crew: "Directed by Shawn Levy", setIn: "Earth-10005 & the Void", group: "deadpool", nexus: true, links: ["loki-s1", "loki-s2"],
      summary: "Wade Wilson has hung up his Deadpool suit and is selling used cars when the Time Variance Authority tells him his world is in danger. To save it, he recruits a reluctant, grumpy Wolverine from another universe. The two heroes, who can barely stand each other, are thrown together on a mission across the Multiverse.",
      note: "Cross-reality file. Fox's X-Men universe meets the MCU." },
    { id: "agatha", title: "Agatha All Along", format: "Series", released: "2024-09-18", phase: 5, wiki: "Agatha_All_Along", length: "9 episodes", crew: "Directed by Jac Schaeffer, Rachel Goldberg and Gandja Monteiro", setIn: "Post-Blip", group: "wanda",
      summary: "Three years after the events of WandaVision, Agatha Harkness is stuck in a spell and has lost her powers. With the help of a mysterious teenager, she breaks free and sets out on the legendary Witches' Road, a dangerous series of trials said to reward those who complete it. She gathers a new coven of witches to walk it with her." },
    { id: "what-if-s3", title: "What If…? (Season 3)", format: "Series", animated: true, released: "2024-12-22", phase: 5, wiki: "What_If...?_season_3", length: "8 episodes", crew: "Directed by Bryan Andrews", setIn: "The Multiverse", group: "what-if",
      summary: "The final season of the Watcher's animated anthology tells more stories from across the Multiverse. It mixes familiar heroes with unexpected versions of them, as each episode imagines another way events could have gone." },
    { id: "brave-new-world", title: "Captain America: Brave New World", format: "Film", released: "2025-02-14", phase: 5, wiki: "Captain_America:_Brave_New_World", length: "118 min", crew: "Directed by Julius Onah", setIn: "Post-Blip", group: "captain-america",
      summary: "Sam Wilson has taken up the shield as the new Captain America. When he is invited to the White House by newly elected President Thaddeus Ross, an international incident threatens to spiral into a global crisis. Sam has to uncover who is behind a plot that reaches the highest levels of government." },
    { id: "born-again-s1", title: "Daredevil: Born Again (Season 1)", format: "Series", released: "2025-03-04", phase: 5, wiki: "Daredevil:_Born_Again_season_1", length: "9 episodes", crew: "Directed by Justin Benson & Aaron Moorhead, Michael Cuesta and Jeffrey Nachmanoff", setIn: "Post-Blip", group: "street-level",
      summary: "Matt Murdock has put away the Daredevil mask and is focused on his law practice in New York. His old enemy Wilson Fisk is back, this time running for mayor and claiming to have left crime behind. As their paths cross again, Matt is pulled back towards the life he tried to leave." },
    { id: "thunderbolts", title: "Thunderbolts*", format: "Film", released: "2025-05-02", phase: 5, wiki: "Thunderbolts*", length: "127 min", crew: "Directed by Jake Schreier", setIn: "Post-Blip", group: "black-widow",
      summary: "Yelena Belova is still grieving her sister Natasha when she is sent on a mission that traps her with a group of other mercenaries and outcasts. They include John Walker, Ghost, Taskmaster and the Red Guardian, with Bucky Barnes in the mix. These very different misfits have to work together to survive a deadly trap and face their own pasts." },
    { id: "ironheart", title: "Ironheart", format: "Series", released: "2025-06-24", phase: 5, wiki: "Ironheart_(miniseries)", length: "6 episodes", crew: "Directed by Sam Bailey and Angela Barnes", setIn: "Post-Blip", group: "wakanda",
      summary: "After the events of Wakanda Forever, young genius Riri Williams returns home to Chicago, determined to finish the suit of armour she has been building. To pay for it, she falls in with a crew of criminals led by Parker Robbins, known as the Hood. Riri's mix of technology and her new allies' dark magic leads her into danger." },

    /* ---------- Phase Six ---------- */
    { id: "first-steps", title: "The Fantastic Four: First Steps", format: "Film", released: "2025-07-25", phase: 6, wiki: "The_Fantastic_Four:_First_Steps", length: "115 min", crew: "Directed by Matt Shakman", setIn: "Earth-828", group: "fantastic-four", links: ["doomsday"],
      summary: "On a retro-futuristic Earth in the 1960s, Reed Richards, Sue Storm, Johnny Storm and Ben Grimm are celebrated heroes who gained their powers on a space mission. As Reed and Sue prepare to start a family, the Silver Surfer arrives with a warning: Galactus, a giant cosmic being who devours planets, is coming for Earth.",
      note: "Opens Phase Six, on a different Earth." },
    { id: "eyes-of-wakanda", title: "Eyes of Wakanda", format: "Series", animated: true, released: "2025-08-01", phase: 6, wiki: "Eyes_of_Wakanda", length: "4 episodes", crew: "Directed by Todd Harris", setIn: "Across history", group: "wakanda",
      summary: "An animated anthology follows the Hatut Zeraze, Wakanda's secret War Dogs, across different periods of history. Wakandan warriors travel the world on dangerous missions to recover stolen vibranium artifacts and keep their homeland's secret safe." },
    { id: "marvel-zombies", title: "Marvel Zombies", format: "Series", animated: true, released: "2025-09-24", phase: 6, wiki: "Marvel_Zombies_(miniseries)", length: "4 episodes", crew: "Directed by Bryan Andrews", setIn: "Alternate universe", group: "what-if",
      summary: "Set in the zombie universe first seen in What If...?, this animated series follows a band of survivors in a world where a plague has turned most of Earth's heroes into the undead. Young heroes including Kamala Khan, Kate Bishop and Riri Williams search for a way to end the outbreak, while zombified Avengers hunt them." },
    { id: "wonder-man", title: "Wonder Man", format: "Series", released: "2026-01-27", phase: 6, wiki: "Wonder_Man_(TV_series)", length: "8 episodes", crew: "Created by Destin Daniel Cretton and Andrew Guest", setIn: "Post-Blip", group: "wonder-man",
      summary: "Simon Williams is a struggling actor in Los Angeles who has kept his superpowers secret. He sets his heart on winning the lead role in a remake of an old superhero film called Wonder Man. Along the way he befriends Trevor Slattery, the actor once hired to play the Mandarin, in a comedy about Hollywood and fame." },
    { id: "born-again-s2", title: "Daredevil: Born Again (Season 2)", format: "Series", released: "2026-03-24", phase: 6, wiki: "Daredevil:_Born_Again_season_2", length: "8 episodes", setIn: "Post-Blip", group: "street-level",
      summary: "The second season continues the story of the first, with Mayor Wilson Fisk tightening his grip on New York and his task force hunting masked heroes. Matt Murdock, back in the Daredevil suit, resists him from the shadows. Krysten Ritter returns as Jessica Jones, alongside Charlie Cox and Vincent D'Onofrio." },
    { id: "brand-new-day", title: "Spider-Man: Brand New Day", format: "Film", released: "2026-07-31", phase: 6, wiki: "Spider-Man:_Brand_New_Day", crew: "Directed by Destin Daniel Cretton", setIn: "Post-Blip", group: "spider-man",
      summary: "Set after No Way Home, the film follows Peter Parker as a full-time, street-level Spider-Man in a New York where no one remembers who he is. Tom Holland returns as Peter, and Jon Bernthal reprises his role as Frank Castle, the Punisher. Directed by Destin Daniel Cretton, it is the fourth film in Holland's Spider-Man series." },
    { id: "visionquest", title: "VisionQuest", format: "Series", released: "2026-10-14", phase: 6, wiki: "VisionQuest", crew: "Showrunner: Terry Matalas", setIn: "Post-Blip", group: "wanda",
      summary: "Paul Bettany returns as the white Vision, the version of the synthezoid who regained his memories at the end of WandaVision, in a series about his search for his own identity and humanity. Created by Terry Matalas, it completes the trilogy of series that began with WandaVision and continued with Agatha All Along." },
    { id: "doomsday", title: "Avengers: Doomsday", format: "Film", released: "2026-12-18", phase: 6, wiki: "Avengers:_Doomsday", crew: "Directed by Anthony & Joe Russo", group: "avengers", links: ["first-steps"],
      summary: "The fifth Avengers film, directed by Anthony and Joe Russo, sees the Avengers and their allies face Victor von Doom, played by Robert Downey Jr. The announced cast brings together heroes from across the Multiverse, including members of the Avengers, the Thunderbolts, the Fantastic Four, Wakanda and Fox's X-Men. Plot details have not been released." },
    { id: "secret-wars", title: "Avengers: Secret Wars", format: "Film", released: "2027-12-17", phase: 6, wiki: "Avengers:_Secret_Wars", crew: "Directed by Anthony & Joe Russo", group: "avengers",
      summary: "The sixth Avengers film, again directed by Anthony and Joe Russo, follows Doomsday and is planned as the finale of the Multiverse Saga. Plot details have not been released." },
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
