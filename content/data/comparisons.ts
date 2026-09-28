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

/**
 * "Everyday words where one sound changes the meaning". `say` gets a Standard English clip;
 * `mistake` is the same word said with the wrong sound, in the American voice (its IPA forces the mistake);
 * `heard` is the word listeners may hear instead, or absent when it is not a real word.
 */
export type MeaningChange = {
  say: Word;
  mistake: Word;
  heard?: Word;
  rule: RuleSlug;
};

export const meaningChanges: MeaningChange[] = [
  { say: { id: "mc-little", word: "little", british: "**li**-təl", ipaGB: "ˈlɪtl" }, mistake: { id: "mc-little-mistake", word: "little", american: "**li**-dəl or **li**-rəl", ipaUS: "ˈlɪɾl" }, rule: "say-every-t" },
  { say: { id: "mc-litre", word: "litre", british: "**lii**-tə", ipaGB: "ˈliːtə" }, mistake: { id: "mc-litre-mistake", word: "litre", american: "**lii**-də", ipaUS: "ˈliɾɚ" }, heard: { id: "mc-leader", word: "leader", ipaGB: "ˈliːdə" }, rule: "say-every-t" },
  { say: { id: "mc-writing", word: "writing", british: "**rai**-ting", ipaGB: "ˈraɪtɪŋ" }, mistake: { id: "mc-writing-mistake", word: "writing", american: "**rai**-ding", ipaUS: "ˈraɪɾɪŋ" }, heard: { id: "mc-riding", word: "riding", ipaGB: "ˈraɪdɪŋ" }, rule: "say-every-t" },
  { say: { id: "mc-putting", word: "putting", british: "**pu**-ting", ipaGB: "ˈpʊtɪŋ" }, mistake: { id: "mc-putting-mistake", word: "putting", american: "**pu**-ding", ipaUS: "ˈpʊɾɪŋ" }, heard: { id: "mc-pudding", word: "pudding", ipaGB: "ˈpʊdɪŋ" }, rule: "say-every-t" },
  { say: { id: "mc-metal", word: "metal", british: "**me**-təl", ipaGB: "ˈmetl" }, mistake: { id: "mc-metal-mistake", word: "metal", american: "**me**-dəl", ipaUS: "ˈmɛɾl" }, heard: { id: "mc-medal", word: "medal", ipaGB: "ˈmedl" }, rule: "say-every-t" },
  { say: { id: "mc-thirty", word: "thirty", british: "**thəə**-ti", ipaGB: "ˈθɜːti" }, mistake: { id: "mc-thirty-mistake", word: "thirty", american: "**thər**-di", ipaUS: "ˈθɝɾi" }, rule: "say-every-t" },
  { say: { id: "mc-thirteen", word: "thirteen", british: "thəə-**tiin**", ipaGB: "θɜːˈtiːn" }, mistake: { id: "mc-thirteen-mistake", word: "thirteen", american: "**thəə**-tin", ipaUS: "ˈθɝtɪn" }, heard: { id: "mc-heard-thirty", word: "thirty", ipaGB: "ˈθɜːti" }, rule: "thirteen-vs-thirty" },
  { say: { id: "mc-fourteen", word: "fourteen", british: "foo-**tiin**", ipaGB: "fɔːˈtiːn" }, mistake: { id: "mc-fourteen-mistake", word: "fourteen", american: "**foo**-tin", ipaUS: "ˈfɔrtɪn" }, heard: { id: "mc-forty", word: "forty", ipaGB: "ˈfɔːti" }, rule: "thirteen-vs-thirty" },
  { say: { id: "mc-right", word: "right", british: "rait", ipaGB: "raɪt" }, mistake: { id: "mc-right-mistake", word: "right", american: "lait", ipaUS: "laɪt" }, heard: { id: "mc-light", word: "light", ipaGB: "laɪt" }, rule: "r-and-l" },
  { say: { id: "mc-correct", word: "correct", british: "kə-**rekt**", ipaGB: "kəˈrekt" }, mistake: { id: "mc-correct-mistake", word: "correct", american: "kə-**lekt**", ipaUS: "kəˈlɛkt" }, heard: { id: "mc-collect", word: "collect", ipaGB: "kəˈlekt" }, rule: "r-and-l" },
  { say: { id: "mc-work", word: "work", british: "wəək", ipaGB: "wɜːk" }, mistake: { id: "mc-work-mistake", word: "work", american: "wook", ipaUS: "wɔk" }, heard: { id: "mc-walk", word: "walk", ipaGB: "wɔːk" }, rule: "drop-the-r" },
  { say: { id: "mc-hot", word: "hot", british: "hot", ipaGB: "hɒt" }, mistake: { id: "mc-hot-mistake", word: "hot", american: "haat", ipaUS: "hɑt" }, heard: { id: "mc-heart", word: "heart", ipaGB: "hɑːt" }, rule: "short-o" },
  { say: { id: "mc-not", word: "not", british: "not", ipaGB: "nɒt" }, mistake: { id: "mc-not-mistake", word: "not", american: "nat", ipaUS: "nɑt" }, heard: { id: "mc-nut", word: "nut", ipaGB: "nʌt" }, rule: "short-o" },
  { say: { id: "mc-cant", word: "can't", british: "kaant", ipaGB: "kɑːnt" }, mistake: { id: "mc-cant-mistake", word: "can't", american: "kan", ipaUS: "kæn" }, heard: { id: "mc-can", word: "can", ipaGB: "kæn" }, rule: "long-vowels" },
  { say: { id: "mc-sheep", word: "sheep", british: "shiip", ipaGB: "ʃiːp" }, mistake: { id: "mc-sheep-mistake", word: "sheep", american: "ship", ipaUS: "ʃɪp" }, heard: { id: "mc-ship", word: "ship", ipaGB: "ʃɪp" }, rule: "long-vowels" },
  { say: { id: "mc-leave", word: "leave", british: "liiv", ipaGB: "liːv" }, mistake: { id: "mc-leave-mistake", word: "leave", american: "liv", ipaUS: "lɪv" }, heard: { id: "mc-live", word: "live", ipaGB: "lɪv" }, rule: "long-vowels" },
];

/**
 * "Habits to avoid, and what to say instead". Each row's `words` has an American clip
 * (what the habit sounds like) and a Standard English clip (what to say instead).
 */
export type AmericanHabit = {
  habit: string;
  example: string;
  words: Word;
};

export const americanHabits: AmericanHabit[] = [
  {
    habit: "Tapping the t between vowels",
    example: "water, better, little",
    words: { id: "habit-tap-t", word: "water, better, little", american: "**waa**-dər, **be**-dər, **li**-dəl", british: "**woo**-tə, **be**-tə, **li**-təl" },
  },
  {
    habit: "Tapping the t in -ty numbers",
    example: "thirty, forty, eighty",
    words: { id: "habit-ty-numbers", word: "thirty, forty, eighty", american: "**thər**-di, **for**-di, **ei**-di", british: "**thəə**-ti, **foo**-ti, **ei**-ti" },
  },
  {
    habit: "Dropping the t after n",
    example: "twenty, internet, interview",
    words: { id: "habit-drop-t", word: "twenty, internet, interview", american: "**twe**-ni, **i**-nər-net, **i**-nər-vyuu", british: "**twen**-ti, **in**-tə-net, **in**-tə-vyuu" },
  },
  {
    habit: "Stopping the t in the throat before n",
    example: "button, important, certain",
    words: { id: "habit-stop-t", word: "button, important, certain", american: "**ba**'n, im-**por**'nt, **sər**'n", british: "**ba**-tən, im-**poo**-tənt, **səə**-tən" },
  },
  {
    habit: "Dropping the t in can't",
    example: "I can't go",
    words: { id: "habit-cant", word: "I can't go", american: "I **kan'** go", british: "I **kaant** go, or I **ka**-not go" },
  },
  {
    habit: "Saying aa for o",
    example: "hot, job, got",
    words: { id: "habit-aa-for-o", word: "hot, job, got", american: "haat, jaab, gaat", british: "hot, job, got" },
  },
  {
    habit: "Saying r after vowels",
    example: "car, work, first",
    words: { id: "habit-r-after-vowel", word: "car, work, first", american: "kaar, wərk, fərst", british: "kaa, wəək, fəəst" },
  },
  {
    habit: "Joining words together",
    example: "going to, want to, let me, kind of, don't know",
    words: {
      id: "habit-join",
      word: "going to, want to, let me, kind of, don't know",
      sayUS: "gonna, wanna, lemme, kinda, dunno",
      american: "gonna, wanna, lemme, kinda, dunno",
      british: "Say every word: going to, want to, let me, kind of, don't know",
    },
  },
];
