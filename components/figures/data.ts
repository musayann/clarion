/** Data behind the figures, shared by the React figures and their markdown versions. */

import type { Word } from "@/content/data/types";

export const figureText = {
  effectEffort: {
    title: "Our suggested practice priorities",
    caption:
      "These priorities come from our own experience. Start with the easy ones and return to *r* and *l* and the vowel in work each day. Your pace may vary.",
  },
  tStart: {
    title: "Your Kinyarwanda *t* as a starting point",
    caption:
      "The full *t* starts from the *t* you already say in Kinyarwanda. Keep it apart from d, so writing and riding stay two words, and don't let it slide towards the Kinyarwanda *r*.",
  },
  tRule: {
    title: "Practise a clear *t*",
    caption: "Follow these steps with water, better and twenty.",
  },
  teenTy: {
    title: "Stress in -teen and -ty numbers",
    caption:
      "The stressed syllable is louder, longer and higher. In -teen numbers it is the last one, and its ii is long.",
  },
  silentR: {
    title: "The *r* you don't say",
    caption:
      "Each word is written with an *r*, but no vowel sound comes after it, so you don't say it. ● marks words that end in a vowel, just like Kinyarwanda words.",
  },
  vowelMap: {
    title: "Kinyarwanda vowels as starting points",
    caption:
      "These are rough learning approximations, not identical sounds. Listen to the recordings for the target sound and length.",
  },
  letterU: {
    title: "One letter u, two starting points",
    caption: "Most words spelt with u start from *a*. A short list starts from *u*. Listen to the recordings for the target sound.",
  },
};

export type QuadrantItem = { label: string; href?: string };
export type Quadrant = { title: string; tone: "easy-start" | "default" | "skip"; items: QuadrantItem[] };

// Row by row: high effect (easier, harder), then low effect (easier, harder).
export const quadrants: Quadrant[] = [
  {
    title: "Easy start: begin here",
    tone: "easy-start",
    items: [
      { label: "Rule 1: the full *t* (twenty, water)", href: "/rules/say-every-t" },
      { label: "Rule 2: thirteen versus thirty", href: "/rules/thirteen-vs-thirty" },
      { label: "Rule 5: o in hot, job, stop", href: "/rules/short-o" },
      { label: "Rule 6: long vowels (can't, sheep)", href: "/rules/long-vowels" },
    ],
  },
  {
    title: "Practise every day",
    tone: "default",
    items: [
      { label: "Rule 3: *r* versus *l* (right, light)", href: "/rules/r-and-l" },
      { label: "Rule 4: the əə vowel (work, first)", href: "/rules/drop-the-r" },
    ],
  },
  {
    title: "Nice to have",
    tone: "default",
    items: [
      { label: "Rule 4: drop *r* after a vowel (car)", href: "/rules/drop-the-r" },
      { label: "Rule 4: *r* before a vowel (far away)", href: "/rules/drop-the-r" },
    ],
  },
  {
    title: "Skip",
    tone: "skip",
    items: [{ label: "The American *r* sound" }, { label: "A native accent, American or British" }],
  },
];

export const stressPairs: { n: string; word: string; syllables: [string, string]; stress: 0 | 1 }[][] = [
  [
    { n: "13", word: "thirteen", syllables: ["thəə", "tiin"], stress: 1 },
    { n: "30", word: "thirty", syllables: ["thəə", "ti"], stress: 0 },
  ],
  [
    { n: "14", word: "fourteen", syllables: ["foo", "tiin"], stress: 1 },
    { n: "40", word: "forty", syllables: ["foo", "ti"], stress: 0 },
  ],
  [
    { n: "15", word: "fifteen", syllables: ["fif", "tiin"], stress: 1 },
    { n: "50", word: "fifty", syllables: ["fif", "ti"], stress: 0 },
  ],
];

/**
 * Every r in these words is silent in Standard English. Ids starting with sr- have their own
 * clips; the others reuse the clips of the same word in the pair and word tables.
 */
export const silentRWords: (Word & { respell: string; endsInVowel: boolean })[] = [
  { id: "sr-car", word: "car", respell: "kaa", ipa: "kɑː", endsInVowel: true },
  { id: "sr-more", word: "more", respell: "moo", ipa: "mɔː", endsInVowel: true },
  { id: "er-hard", word: "hard", respell: "haad", endsInVowel: false },
  { id: "er-work", word: "work", respell: "wəək", endsInVowel: false },
  { id: "er-first", word: "first", respell: "fəəst", endsInVowel: false },
  { id: "t-water", word: "water", respell: "**woo**-tə", endsInVowel: true },
  { id: "t-computer", word: "computer", respell: "kəm-**pyuu**-tə", endsInVowel: true },
];

/** An English sound and the Kinyarwanda sound closest to it. */
export type Landing = { label: string; sound: string; note: string; tone: "good" | "neutral"; clip?: string };

export const kinyaConsonants = ["t", "d", "r"];
export const tLandings: Landing[] = [
  { label: "writing, metal", sound: "t", note: "start from your Kinyarwanda *t*: the tongue stops the air completely", tone: "good", clip: "snd-t" },
  { label: "riding, medal", sound: "d", note: "start from your Kinyarwanda d: the same tongue position, with your voice on", tone: "neutral", clip: "snd-d" },
];

export const kinyaVowels = ["i", "e", "a", "o", "u"];
export const vowelLandings: Landing[] = [
  { label: "hot, job, stop", sound: "o", note: "start from a short o, then match the recording", tone: "good", clip: "snd-o" },
  { label: "hut, nut, cup", sound: "a", note: "a rough a-like starting point; match each recording", tone: "neutral", clip: "snd-uh" },
];

export const letterULandings: Landing[] = [
  { label: "but, bus, much", sound: "a", note: "a rough a-like starting point; match each recording", tone: "neutral", clip: "snd-uh" },
  { label: "put, push, full", sound: "u", note: "start from a short u, a little towards o; match the recording", tone: "good", clip: "snd-u" },
];
