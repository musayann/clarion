import type { RuleSlug, Word } from "./types";

/** "Which style to use: quick answers" — each row's examples get a Standard English and an American clip. */
export type QuickAnswer = {
  sound: string;
  examples: Word;
  americanNote?: string;
  britishNote?: string;
  say: string;
  check: string;
  rule?: RuleSlug;
};

export const quickAnswers: QuickAnswer[] = [
  {
    sound: "t between vowels",
    examples: { id: "qa-t-vowels", word: "water, better", british: "**woo**-tə, **be**-tə", american: "**waa**-dər, **be**-dər" },
    americanNote: "tapped t",
    britishNote: "full t",
    say: "Standard English",
    check: "Your tongue stops the air completely",
    rule: "say-every-t",
  },
  {
    sound: "t after n",
    examples: { id: "qa-t-after-n", word: "twenty, internet", british: "**twen**-ti, **in**-tə-net", american: "**twe**-ni, **i**-nər-net" },
    americanNote: "no t",
    britishNote: "full t",
    say: "Standard English",
    check: "You hear a t between the n and the vowel after it",
    rule: "say-every-t",
  },
  {
    sound: "r after a vowel",
    examples: { id: "qa-r-after-vowel", word: "car, hard", british: "kaa, haad", american: "kaar, haard" },
    americanNote: "r said",
    britishNote: "r silent",
    say: "Standard English",
    check: "You go straight from aa to the next sound, with no r",
    rule: "drop-the-r",
  },
  {
    sound: "The vowel in work",
    examples: { id: "qa-work-vowel", word: "work, first", british: "wəək, fəəst", american: "wərk, fərst" },
    say: "Standard English",
    check: "ə held twice as long, no r, lips do not move",
    rule: "drop-the-r",
  },
  {
    sound: "The vowel in hot",
    examples: { id: "qa-hot-vowel", word: "hot, job", british: "hot, job", american: "haat, jaab" },
    say: "Standard English",
    check: "You say Kinyarwanda o, not a",
    rule: "short-o",
  },
  {
    sound: "can't",
    examples: { id: "qa-cant", word: "can't", british: "kaant", american: "kant", ipaGB: "kɑːnt", ipaUS: "kænt" },
    americanNote: "t often silent",
    say: "Standard English, or say 'cannot'",
    check: "aa held twice as long as in can, then a full t",
    rule: "long-vowels",
  },
  {
    sound: "r and l",
    examples: { id: "qa-r-l", word: "right, light", british: "right, light", american: "right, light" },
    say: "Same in both",
    check: "l: tongue touches the ridge and stays. r: tongue touches nothing",
    rule: "r-and-l",
  },
  {
    sound: "-teen and -ty",
    examples: { id: "qa-teen-ty", word: "thirteen, thirty", british: "thəə-**tiin**, **thəə**-ti", american: "thər-**tiin**, **thər**-di" },
    say: "Standard English",
    check: "-teen: last syllable stressed. -ty: first syllable stressed, full t",
    rule: "thirteen-vs-thirty",
  },
];

/** "What to recognise when Americans speak" — American clips only. */
export type AmericanHabit = {
  habit: string;
  example: string;
  /** What you hear, as an American-only Word (no British clip). */
  heard: Word;
};

export const americanHabits: AmericanHabit[] = [
  { habit: "Tap the t between vowels", example: "water, better, data", heard: { id: "us-tap-t", word: "water, better, data", american: "**waa**-dər, **be**-dər, **dei**-də" } },
  { habit: "Drop the t after n", example: "twenty, internet, interview", heard: { id: "us-drop-t", word: "twenty, internet, interview", american: "**twe**-ni, **i**-nər-net, **i**-nər-vyuu" } },
  { habit: "Stop the t before n", example: "button, important, certain", heard: { id: "us-stop-t", word: "button, important, certain", american: "**ba**'n, im-**por**'nt, **sər**'n" } },
  { habit: "Shrink can to kən", example: "I can go, I can't go", heard: { id: "us-can", word: "I can go. I can't go.", american: "I kən **go**, I **kant** go" } },
  { habit: "Use aa for o", example: "hot, job, got", heard: { id: "us-aa-for-o", word: "hot, job, got", american: "haat, jaab, gaat" } },
  { habit: "Say r after vowels", example: "car, work, first", heard: { id: "us-r-after-vowel", word: "car, work, first", american: "kaar, wərk, fərst" } },
  {
    habit: "Join words together",
    example: "going to, want to, got to, let me, kind of, don't know",
    heard: { id: "us-join", word: "gonna, wanna, gotta, lemme, kinda, dunno", american: "gonna, wanna, gotta, lemme, kinda, dunno" },
  },
  { habit: "Say zee for Z", example: "Z", heard: { id: "us-zee", word: "Z", sayUS: "zee", american: "zii" } },
];
