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
      summary: "In a near future where fear of mutants is growing, the drifter Logan, known as Wolverine, and the runaway Rogue are brought to Professor Charles Xavier's school for gifted youngsters. There they meet the X-Men, mutants who use their powers to protect a world that fears them. Xavier's old friend Magneto believes mutants must fight back, and he has a plan of his own." },
    { id: "x2", title: "X2", format: "Film", released: "2003-05-02", section: "original", wiki: "X2_(film)", length: "134 min", crew: "Directed by Bryan Singer", group: "x-men-films",
      summary: "After a mutant attack on the White House, military scientist William Stryker leads a campaign against mutants and raids Xavier's school. The X-Men are scattered and forced into an uneasy alliance with Magneto. Wolverine, meanwhile, finds that Stryker holds the key to his own forgotten past." },
    { id: "last-stand", title: "X-Men: The Last Stand", format: "Film", released: "2006-05-26", section: "original", wiki: "X-Men:_The_Last_Stand", length: "104 min", crew: "Directed by Brett Ratner", group: "x-men-films",
      summary: "A company announces a cure that can remove mutant powers permanently, and mutants are divided over whether to take it. Magneto raises an army to destroy the cure. At the same time, the X-Men are shaken by the return of Jean Grey, who now wields a power that may be too great to control." },

    /* ---------- First Class saga ---------- */
    { id: "first-class", title: "X-Men: First Class", format: "Film", released: "2011-06-03", section: "first-class", wiki: "X-Men:_First_Class", length: "132 min", crew: "Directed by Matthew Vaughn", setIn: "1962", group: "x-men-films",
      summary: "In 1962, the young telepath Charles Xavier and Erik Lehnsherr, a Holocaust survivor who can control metal, meet and become friends. They join the CIA to find other mutants and stop Sebastian Shaw, who wants to start a nuclear war during the Cuban Missile Crisis. Their very different views on humanity begin to pull them apart." },
    { id: "days-of-future-past", title: "X-Men: Days of Future Past", format: "Film", released: "2014-05-23", section: "first-class", wiki: "X-Men:_Days_of_Future_Past", length: "132 min", crew: "Directed by Bryan Singer", setIn: "1973 & the future", group: "x-men-films", nexus: true,
      summary: "In a dark future, giant robots called Sentinels hunt mutants and the humans who help them. Wolverine's mind is sent back to 1973 to change the event that led to their creation. He has to convince a broken young Charles Xavier and his rival Erik Lehnsherr to work together.",
      note: "Timeline split. Everything after this film runs on the rewritten timeline." },
    { id: "apocalypse", title: "X-Men: Apocalypse", format: "Film", released: "2016-05-27", section: "first-class", wiki: "X-Men:_Apocalypse", length: "144 min", crew: "Directed by Bryan Singer", setIn: "1983", group: "x-men-films",
      summary: "In 1983, En Sabah Nur, the world's first mutant, awakens after thousands of years and decides the modern world must be swept away. He gathers four powerful followers, including a grieving Magneto. Charles Xavier's young X-Men, including Jean Grey, Scott Summers and Storm, have to face him." },
    { id: "dark-phoenix", title: "Dark Phoenix", format: "Film", released: "2019-06-07", section: "first-class", wiki: "Dark_Phoenix_(film)", length: "114 min", crew: "Directed by Simon Kinberg", setIn: "1992", group: "x-men-films",
      summary: "In 1992, during a rescue mission in space, Jean Grey is hit by a mysterious cosmic force that makes her more powerful than ever. As her new power grows, so does her instability. The X-Men have to decide whether to save her or stop her, while a hostile alien race takes an interest in the force." },

    /* ---------- Wolverine ---------- */
    { id: "origins-wolverine", title: "X-Men Origins: Wolverine", format: "Film", released: "2009-05-01", section: "wolverine", wiki: "X-Men_Origins:_Wolverine", length: "107 min", crew: "Directed by Gavin Hood", group: "wolverine",
      summary: "Logan, known as Wolverine, and his half-brother Victor Creed fight side by side for more than a century, until Logan walks away. When tragedy strikes, he joins a secret military programme called Weapon X, which bonds an unbreakable metal to his skeleton. Logan sets out for revenge and the truth about what was done to him." },
    { id: "the-wolverine", title: "The Wolverine", format: "Film", released: "2013-07-26", section: "wolverine", wiki: "The_Wolverine_(film)", length: "126 min", crew: "Directed by James Mangold", group: "wolverine",
      summary: "Haunted by the past and living alone in the wilderness, Logan travels to Japan to say goodbye to a man whose life he saved in the Second World War. The dying man offers to take away Logan's healing power so he can finally live a mortal life. Logan is drawn into a deadly conflict that tests him like never before." },
    { id: "logan", title: "Logan", format: "Film", released: "2017-03-03", section: "wolverine", wiki: "Logan_(film)", length: "137 min", crew: "Directed by James Mangold", setIn: "2029", group: "wolverine",
      summary: "In 2029, mutants are almost extinct and an ageing Logan is caring for a frail Charles Xavier near the Mexican border. His quiet life ends when a mysterious young girl named Laura, who has powers very like his own, needs protection from powerful forces. Logan has to take her on a dangerous journey across America." },

    /* ---------- Deadpool ---------- */
    { id: "deadpool", title: "Deadpool", format: "Film", released: "2016-02-12", section: "deadpool", wiki: "Deadpool_(film)", length: "108 min", crew: "Directed by Tim Miller", group: "deadpool",
      summary: "Mercenary Wade Wilson is diagnosed with terminal cancer and agrees to an experimental treatment. It gives him the power to heal from anything, but leaves him badly scarred. As the foul-mouthed, wisecracking Deadpool, he hunts down the man who did this to him." },
    { id: "deadpool-2", title: "Deadpool 2", format: "Film", released: "2018-05-18", section: "deadpool", wiki: "Deadpool_2", length: "119 min", crew: "Directed by David Leitch", group: "deadpool",
      summary: "Deadpool has to protect Russell, a troubled young mutant, from Cable, a soldier who has travelled back from the future to stop him. To do it, Deadpool puts together his own team of heroes, X-Force. Things do not go to plan." },

    /* ---------- Spin-offs ---------- */
    { id: "generation-x", title: "Generation X", format: "Film", released: "1996-02-20", section: "spin-offs", wiki: "Generation_X_(film)", group: "mutant-spin-offs",
      summary: "In a Fox TV movie, Emma Frost and Banshee run a school for young mutants, where teenagers including Jubilee and Skin learn to control their powers. They face a scientist who has found a way to enter people's dreams and wants the mutants' powers for himself." },
    { id: "new-mutants", title: "The New Mutants", format: "Film", released: "2020-08-28", section: "spin-offs", wiki: "The_New_Mutants_(film)", length: "94 min", crew: "Directed by Josh Boone", group: "mutant-spin-offs",
      summary: "Five teenage mutants are held in an isolated hospital, where a doctor says she is helping them learn to control their powers. As they try to understand their abilities and their past, they are haunted by terrifying visions of their worst fears. The young mutants have to work together to escape." },

    /* ---------- Live-action TV ---------- */
    { id: "legion", title: "Legion", format: "Series", released: "2017-02-08", section: "live-tv", wiki: "Legion_(TV_series)", length: "3 seasons", crew: "Created by Noah Hawley", group: "mutant-tv",
      summary: "David Haller has spent years in psychiatric hospitals, diagnosed with schizophrenia. When he meets a fellow patient named Syd, he begins to suspect that the voices and visions he experiences may be something else. A group of mutants tells David he may be one of the most powerful mutants alive." },
    { id: "the-gifted", title: "The Gifted", format: "Series", released: "2017-10-02", section: "live-tv", wiki: "The_Gifted_(American_TV_series)", length: "2 seasons", crew: "Created by Matt Nix", group: "mutant-tv",
      summary: "Reed Strucker, a prosecutor who has spent his career pursuing mutants, discovers that his own teenage children have mutant powers. The family is forced to go on the run. They join an underground network of mutants hiding from the government's Sentinel Services." },

    /* ---------- Animated TV ---------- */
    { id: "pryde-of-the-x-men", title: "Pryde of the X-Men", format: "Special", animated: true, released: "1989-09-16", section: "anim-tv", wiki: "Pryde_of_the_X-Men", group: "x-men-animated",
      summary: "An animated pilot in which teenager Kitty Pryde, who can pass through solid objects, arrives at Xavier's school and joins the X-Men. Magneto and his Brotherhood have a dangerous plan, and the new recruit has to prove herself. The pilot is remembered for its Australian-accented Wolverine." },
    { id: "x-men-tas", title: "X-Men: The Animated Series", format: "Series", animated: true, released: "1992-10-31", section: "anim-tv", wiki: "X-Men:_The_Animated_Series", length: "5 seasons", group: "x-men-animated",
      summary: "Fox Kids' animated series follows the X-Men, Cyclops, Jean Grey, Wolverine, Storm, Rogue, Gambit, Beast, Jubilee and Professor X, as they protect a world that fears them. It adapts many of the comics' biggest stories and sets the team against Magneto, Apocalypse and the Sentinels. Its theme music made it one of the most famous superhero cartoons." },
    { id: "x-men-evolution", title: "X-Men: Evolution", format: "Series", animated: true, released: "2000-11-04", section: "anim-tv", wiki: "X-Men:_Evolution", length: "4 seasons", group: "x-men-animated",
      summary: "The X-Men are reimagined as teenagers who go to Bayville High while training at the Xavier Institute, including Cyclops, Jean Grey, Kitty Pryde, Nightcrawler and Rogue. Along with school drama, they face Mystique's rival students, the Brotherhood, and the threat of a world that is just learning about mutants." },
    { id: "wolverine-and-the-x-men", title: "Wolverine and the X-Men", format: "Series", animated: true, released: "2009-01-23", section: "anim-tv", wiki: "Wolverine_and_the_X-Men_(TV_series)", length: "26 episodes", group: "x-men-animated",
      summary: "After an explosion destroys the Xavier Institute and leaves Professor X and Jean Grey missing, the X-Men go their separate ways. A year later, Wolverine sets out to bring the team back together. They receive warnings of a dark future in which Sentinels rule the world." },
    { id: "x-men-97", title: "X-Men '97 (Season 1)", format: "Series", animated: true, released: "2024-03-20", section: "anim-tv", wiki: "X-Men_'97", length: "10 episodes", crew: "Created by Beau DeMayo", group: "x-men-animated",
      summary: "A revival that picks up after X-Men: The Animated Series. Professor X is gone, and the team, Cyclops, Jean Grey, Storm, Wolverine, Rogue, Gambit, Beast and Jubilee, has to carry on without him. They are surprised to learn who he has chosen to lead them, while the fight for mutant rights grows more dangerous.",
      note: "Made by Marvel Studios Animation, continuing the 1992 series' own universe." },
    { id: "x-men-97-s2", title: "X-Men '97 (Season 2)", format: "Series", animated: true, released: "2026-07-01", section: "anim-tv", wiki: "X-Men_'97", group: "x-men-animated",
      summary: "The second season of the X-Men '97 revival continues the story from the first, which left the team scattered. Further plot details have not been released by Marvel." },
  ],
};
