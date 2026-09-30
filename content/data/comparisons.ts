import type { RuleSlug, Word } from "./types";

/** "Which pronunciation to practise" — each row's examples get a Standard English and an American clip. */
export type QuickAnswer = {
  sound: string;
  examples: Word;
  americanNote?: string;
  britishNote?: string;
  /** Shown under the Standard English form, e.g. an easier alternative. */
  sayNote?: string;
  /** Both accents say it the same way. */
  same?: true;
  check: string;
  rule?: RuleSlug;
};

export const quickAnswers: QuickAnswer[] = [
  {
    sound: "*t* between vowels",
    examples: { id: "qa-t-vowels", word: "water, better", british: "**woo**-tə, **be**-tə", american: "**waa**-dər, **be**-dər" },
    americanNote: "tapped *t*",
    britishNote: "full *t*",
    check: "Your tongue stops the air completely",
    rule: "say-every-t",
  },
  {
    sound: "*t* after n",
    examples: { id: "qa-t-after-n", word: "twenty, internet", british: "**twen**-ti, **in**-tə-net", american: "**twe**-ni, **i**-nər-net" },
    americanNote: "*t* often dropped",
    britishNote: "full *t*",
    check: "You hear a *t* between the n and the vowel after it",
    rule: "say-every-t",
  },
  {
    sound: "*r* after a vowel",
    examples: { id: "qa-r-after-vowel", word: "car, hard", british: "kaa, haad", american: "kaar, haard" },
    americanNote: "*r* said",
    britishNote: "*r* silent",
    check: "You go straight from aa to the next sound, with no *r*",
    rule: "drop-the-r",
  },
  {
    sound: "The vowel in work",
    examples: { id: "qa-work-vowel", word: "work, first", british: "wəək, fəəst", american: "wərk, fərst" },
    check: "Hold the vowel longer, match the recording, and leave out the *r*",
    rule: "drop-the-r",
  },
  {
    sound: "The vowel in hot",
    examples: { id: "qa-hot-vowel", word: "hot, job", british: "hot, job", american: "haat, jaab" },
    check: "Start from a short Kinyarwanda o, then match the recording",
    rule: "short-o",
  },
  {
    sound: "can't",
    examples: { id: "qa-cant", word: "can't", british: "kaant", american: "kant", ipaGB: "kɑːnt", ipaUS: "kænt" },
    americanNote: "*t* often hard to hear",
    sayNote: "or say 'cannot'",
    check: "Match the aa sound and length to the recording, then say a full *t*",
    rule: "long-vowels",
  },
  {
    sound: "*r* and *l*",
    examples: { id: "qa-r-l", word: "right, light", british: "right, light", american: "right, light" },
    same: true,
    check: "*l*: the tongue tip touches the ridge and stays. *r*: keep the tip clear of the ridge and roof of your mouth",
    rule: "r-and-l",
  },
  {
    sound: "-teen and -ty",
    examples: { id: "qa-teen-ty", word: "thirteen, thirty", british: "thəə-**tiin**, **thəə**-ti", american: "thər-**tiin**, **thər**-di" },
    check: "-teen: last syllable stressed, long ii. -ty: first syllable stressed, full *t*",
    rule: "thirteen-vs-thirty",
  },
];

/**
 * "Everyday words where one sound changes the meaning". `say` gets a Standard English clip;
 * `mistake` is the same word said with the wrong sound, in the Standard English voice (its IPA forces the
 * mistake); `heard` is the word listeners may hear instead, or absent when it is not a real word.
 */
export type MeaningChange = {
  say: Word;
  mistake: Word;
  heard?: Word;
  rule: RuleSlug;
};

export const meaningChanges: MeaningChange[] = [
  { say: { id: "mc-thirteen", word: "thirteen", british: "thəə-**tiin**", ipaGB: "θɜːˈtiːn" }, mistake: { id: "mc-thirteen-mistake", word: "thirteen", british: "**thəə**-tin", ipaGB: "ˈθɜːtɪn" }, heard: { id: "mc-heard-thirty", word: "thirty", ipaGB: "ˈθɜːti" }, rule: "thirteen-vs-thirty" },
  { say: { id: "mc-fourteen", word: "fourteen", british: "foo-**tiin**", ipaGB: "fɔːˈtiːn" }, mistake: { id: "mc-fourteen-mistake", word: "fourteen", british: "**foo**-tin", ipaGB: "ˈfɔːtɪn" }, heard: { id: "mc-forty", word: "forty", ipaGB: "ˈfɔːti" }, rule: "thirteen-vs-thirty" },
  { say: { id: "mc-right", word: "right", british: "rait", ipaGB: "raɪt" }, mistake: { id: "mc-right-mistake", word: "right", british: "lait", ipaGB: "laɪt" }, heard: { id: "mc-light", word: "light", ipaGB: "laɪt" }, rule: "r-and-l" },
  { say: { id: "mc-correct", word: "correct", british: "kə-**rekt**", ipaGB: "kəˈrekt" }, mistake: { id: "mc-correct-mistake", word: "correct", british: "kə-**lekt**", ipaGB: "kəˈlɛkt" }, heard: { id: "mc-collect", word: "collect", ipaGB: "kəˈlekt" }, rule: "r-and-l" },
  { say: { id: "mc-work", word: "work", british: "wəək", ipaGB: "wɜːk" }, mistake: { id: "mc-work-mistake", word: "work", british: "wook", ipaGB: "wɔk" }, heard: { id: "mc-walk", word: "walk", ipaGB: "wɔːk" }, rule: "drop-the-r" },
  { say: { id: "mc-cant", word: "can't", british: "kaant", ipaGB: "kɑːnt" }, mistake: { id: "mc-cant-mistake", word: "can't", british: "kan", ipaGB: "kæn" }, heard: { id: "mc-can", word: "can", ipaGB: "kæn" }, rule: "long-vowels" },
  { say: { id: "mc-sheep", word: "sheep", british: "shiip", ipaGB: "ʃiːp" }, mistake: { id: "mc-sheep-mistake", word: "sheep", british: "ship", ipaGB: "ʃɪp" }, heard: { id: "mc-ship", word: "ship", ipaGB: "ʃɪp" }, rule: "long-vowels" },
  { say: { id: "mc-leave", word: "leave", british: "liiv", ipaGB: "liːv" }, mistake: { id: "mc-leave-mistake", word: "leave", british: "liv", ipaGB: "lɪv" }, heard: { id: "mc-live", word: "live", ipaGB: "lɪv" }, rule: "long-vowels" },
];

/**
 * "The *t* and the *o*" on Everyday words: words where the American form of one sound (a tapped *t*, an o
 * like a) can make listeners hear another word. `say` gets a Standard English clip, `american` an American
 * one; `heard` as above.
 * `alsoSpelt` is another spelling of the word, shown in brackets after it.
 */
export type TAndOWord = {
  say: Word;
  american: Word;
  heard?: Word;
  alsoSpelt?: string;
  rule: RuleSlug;
};

export const tAndOWords: TAndOWord[] = [
  { say: { id: "mc-little", word: "little", british: "**li**-təl", ipaGB: "ˈlɪtl" }, american: { id: "mc-little-us", word: "little", american: "**li**-dəl", ipaUS: "ˈlɪɾl" }, rule: "say-every-t" },
  { say: { id: "mc-litre", word: "litre", british: "**lii**-tə", ipaGB: "ˈliːtə" }, american: { id: "mc-litre-us", word: "litre", american: "**lii**-dər", ipaUS: "ˈliɾɚ" }, heard: { id: "mc-leader", word: "leader", ipaGB: "ˈliːdə" }, alsoSpelt: "liter", rule: "say-every-t" },
  { say: { id: "mc-literally", word: "literally", british: "**li**-tə-rə-li", ipaGB: "ˈlɪtərəli" }, american: { id: "mc-literally-us", word: "literally", american: "**li**-dər-ə-li", ipaUS: "ˈlɪɾɚəli" }, rule: "say-every-t" },
  { say: { id: "mc-writing", word: "writing", british: "**rai**-ting", ipaGB: "ˈraɪtɪŋ" }, american: { id: "mc-writing-us", word: "writing", american: "**rai**-ding", ipaUS: "ˈraɪɾɪŋ" }, heard: { id: "mc-riding", word: "riding", ipaGB: "ˈraɪdɪŋ" }, rule: "say-every-t" },
  { say: { id: "mc-putting", word: "putting", british: "**pu**-ting", ipaGB: "ˈpʊtɪŋ" }, american: { id: "mc-putting-us", word: "putting", american: "**pu**-ding", ipaUS: "ˈpʊɾɪŋ" }, heard: { id: "mc-pudding", word: "pudding", ipaGB: "ˈpʊdɪŋ" }, rule: "say-every-t" },
  { say: { id: "mc-metal", word: "metal", british: "**me**-təl", ipaGB: "ˈmetl" }, american: { id: "mc-metal-us", word: "metal", american: "**me**-dəl", ipaUS: "ˈmɛɾl" }, heard: { id: "mc-medal", word: "medal", ipaGB: "ˈmedl" }, rule: "say-every-t" },
  { say: { id: "mc-thirty", word: "thirty", british: "**thəə**-ti", ipaGB: "ˈθɜːti" }, american: { id: "mc-thirty-us", word: "thirty", american: "**thər**-di", ipaUS: "ˈθɝɾi" }, rule: "say-every-t" },
  { say: { id: "mc-hot", word: "hot", british: "hot", ipaGB: "hɒt" }, american: { id: "mc-hot-us", word: "hot", american: "haat", ipaUS: "hɑt" }, heard: { id: "mc-heart", word: "heart", ipaGB: "hɑːt" }, rule: "short-o" },
  { say: { id: "mc-not", word: "not", british: "not", ipaGB: "nɒt" }, american: { id: "mc-not-us", word: "not", american: "naat", ipaUS: "nɑt" }, heard: { id: "mc-nut", word: "nut", ipaGB: "nʌt" }, rule: "short-o" },
];
