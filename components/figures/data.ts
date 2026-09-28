/** Data behind the figures, shared by the React figures and their markdown versions. */

export const figureText = {
  effectEffort: {
    title: "Where each rule sits: effect versus effort",
    caption:
      "Start with the quick wins. Practise rules 3 and 4 every day: they take longest but make the biggest difference.",
  },
  tRule: {
    title: "The t rule: one decision",
    caption: "There is only one question to ask about a t in the spelling.",
  },
  teenTy: {
    title: "Stress in -teen and -ty numbers",
    caption:
      "The stressed syllable is louder, longer and higher. In -teen numbers it is the last one, and its ii is long.",
  },
  soundCount: {
    title: "Sounds per word: without the r, Standard English words are shorter",
    caption:
      "Counted from the sound spellings in this guide; a long vowel counts as one sound. ● marks words that end in a vowel in Standard English, just like Kinyarwanda words.",
  },
  vowelMap: {
    title: "Which Kinyarwanda vowel each style lands on",
    caption:
      "The Standard English o in hot is a contrast you already make in Kinyarwanda. The American vowel sits on top of the a you use for hut.",
  },
};

export type QuadrantItem = { label: string; href?: string };
export type Quadrant = { title: string; tone: "quick-win" | "default" | "skip"; items: QuadrantItem[] };

// Row by row: high effect (easier, harder), then low effect (easier, harder).
export const quadrants: Quadrant[] = [
  {
    title: "Quick wins: start here",
    tone: "quick-win",
    items: [
      { label: "Rule 1: the full t (twenty, water)", href: "/rules/say-every-t" },
      { label: "Rule 2: thirteen versus thirty", href: "/rules/thirteen-vs-thirty" },
      { label: "Rule 5: o in hot, job, stop", href: "/rules/short-o" },
      { label: "Rule 6: long vowels (can't, sheep)", href: "/rules/long-vowels" },
    ],
  },
  {
    title: "Practise every day",
    tone: "default",
    items: [
      { label: "Rule 3: r versus l (right, light)", href: "/rules/r-and-l" },
      { label: "Rule 4: the əə vowel (work, first)", href: "/rules/drop-the-r" },
    ],
  },
  {
    title: "Nice to have",
    tone: "default",
    items: [
      { label: "Rule 4: drop r after a vowel (car)", href: "/rules/drop-the-r" },
      { label: "Rule 4: r before a vowel (far away)", href: "/rules/drop-the-r" },
    ],
  },
  {
    title: "Skip",
    tone: "skip",
    items: [{ label: "The American r sound" }, { label: "A native accent, American or British" }],
  },
];

export const stressPairs: { n: string; syllables: [string, string]; stress: 0 | 1 }[][] = [
  [
    { n: "13", syllables: ["thəə", "tiin"], stress: 1 },
    { n: "30", syllables: ["thəə", "ti"], stress: 0 },
  ],
  [
    { n: "14", syllables: ["foo", "tiin"], stress: 1 },
    { n: "40", syllables: ["foo", "ti"], stress: 0 },
  ],
  [
    { n: "15", syllables: ["fif", "tiin"], stress: 1 },
    { n: "50", syllables: ["fif", "ti"], stress: 0 },
  ],
];

// Counted from the guide's sound spellings: a long vowel (aa, oo, əə …) is one sound.
export const soundCounts: { word: string; gb: string; us: string; gbN: number; usN: number; endsInVowel: boolean }[] = [
  { word: "car", gb: "kaa", us: "kaar", gbN: 2, usN: 3, endsInVowel: true },
  { word: "more", gb: "moo", us: "moor", gbN: 2, usN: 3, endsInVowel: true },
  { word: "hard", gb: "haad", us: "haard", gbN: 3, usN: 4, endsInVowel: false },
  { word: "work", gb: "wəək", us: "wərk", gbN: 3, usN: 4, endsInVowel: false },
  { word: "first", gb: "fəəst", us: "fərst", gbN: 4, usN: 5, endsInVowel: false },
  { word: "water", gb: "woo-tə", us: "waa-dər", gbN: 4, usN: 5, endsInVowel: true },
  { word: "better", gb: "be-tə", us: "be-dər", gbN: 4, usN: 5, endsInVowel: true },
  { word: "computer", gb: "kəm-pyuu-tə", us: "kəm-pyuu-dər", gbN: 8, usN: 9, endsInVowel: true },
];

export const kinyaVowels = ["i", "e", "a", "o", "u"];
export const vowelLandings: { label: string; vowel: string; note: string; tone: "good" | "avoid" | "neutral" }[] = [
  { label: "hot (Standard English)", vowel: "o", note: "short o, a different vowel from hut", tone: "good" },
  { label: "hot (American)", vowel: "a", note: "a held longer: only length separates hot from hut", tone: "avoid" },
  { label: "hut, nut, cup", vowel: "a", note: "how Kinyarwanda speakers usually say it", tone: "neutral" },
];
