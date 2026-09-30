import type { RuleSlug, Word } from "./types";

/** "Which pronunciation to practise" — each row's examples get a Standard English and an American clip. */
export type QuickAnswer = {
  sound: string;
  examples: Word;
  respellUSNote?: string;
  respellNote?: string;
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
    examples: { id: "qa-t-vowels", word: "water, better", respell: "**woo**-tə, **be**-tə", respellUS: "**waa**-dər, **be**-dər" },
    respellUSNote: "tapped *t*",
    respellNote: "full *t*",
    check: "Your tongue stops the air completely",
    rule: "say-every-t",
  },
  {
    sound: "*t* after n",
    examples: { id: "qa-t-after-n", word: "twenty, internet", respell: "**twen**-ti, **in**-tə-net", respellUS: "**twe**-ni, **i**-nər-net" },
    respellUSNote: "*t* often dropped",
    respellNote: "full *t*",
    check: "You hear a *t* between the n and the vowel after it",
    rule: "say-every-t",
  },
  {
    sound: "*r* after a vowel",
    examples: { id: "qa-r-after-vowel", word: "car, hard", respell: "kaa, haad", respellUS: "kaar, haard" },
    respellUSNote: "*r* said",
    respellNote: "*r* silent",
    check: "You go straight from aa to the next sound, with no *r*",
    rule: "drop-the-r",
  },
  {
    sound: "The vowel in work",
    examples: { id: "qa-work-vowel", word: "work, first", respell: "wəək, fəəst", respellUS: "wərk, fərst" },
    check: "Hold the vowel longer, match the recording, and leave out the *r*",
    rule: "drop-the-r",
  },
  {
    sound: "The vowel in hot",
    examples: { id: "qa-hot-vowel", word: "hot, job", respell: "hot, job", respellUS: "haat, jaab" },
    check: "Start from a short Kinyarwanda o, then match the recording",
    rule: "short-o",
  },
  {
    sound: "can't",
    examples: { id: "qa-cant", word: "can't", respell: "kaant", respellUS: "kant", ipa: "kɑːnt", ipaUS: "kænt" },
    respellUSNote: "*t* often hard to hear",
    sayNote: "or say 'cannot'",
    check: "Match the aa sound and length to the recording, then say a full *t*",
    rule: "long-vowels",
  },
  {
    sound: "*r* and *l*",
    examples: { id: "qa-r-l", word: "right, light", respell: "right, light", respellUS: "right, light" },
    same: true,
    check: "*l*: the tongue tip touches the ridge and stays. *r*: keep the tip clear of the ridge and roof of your mouth",
    rule: "r-and-l",
  },
  {
    sound: "-teen and -ty",
    examples: { id: "qa-teen-ty", word: "thirteen, thirty", respell: "thəə-**tiin**, **thəə**-ti", respellUS: "thər-**tiin**, **thər**-di" },
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
  { say: { id: "mc-thirteen", word: "thirteen", respell: "thəə-**tiin**", ipa: "θɜːˈtiːn" }, mistake: { id: "mc-thirteen-mistake", word: "thirteen", respell: "**thəə**-tin", ipa: "ˈθɜːtɪn" }, heard: { id: "mc-heard-thirty", word: "thirty", ipa: "ˈθɜːti" }, rule: "thirteen-vs-thirty" },
  { say: { id: "mc-fourteen", word: "fourteen", respell: "foo-**tiin**", ipa: "fɔːˈtiːn" }, mistake: { id: "mc-fourteen-mistake", word: "fourteen", respell: "**foo**-tin", ipa: "ˈfɔːtɪn" }, heard: { id: "mc-forty", word: "forty", ipa: "ˈfɔːti" }, rule: "thirteen-vs-thirty" },
  { say: { id: "mc-right", word: "right", respell: "rait", ipa: "raɪt" }, mistake: { id: "mc-right-mistake", word: "right", respell: "lait", ipa: "laɪt" }, heard: { id: "mc-light", word: "light", ipa: "laɪt" }, rule: "r-and-l" },
  { say: { id: "mc-correct", word: "correct", respell: "kə-**rekt**", ipa: "kəˈrekt" }, mistake: { id: "mc-correct-mistake", word: "correct", respell: "kə-**lekt**", ipa: "kəˈlɛkt" }, heard: { id: "mc-collect", word: "collect", ipa: "kəˈlekt" }, rule: "r-and-l" },
  { say: { id: "mc-work", word: "work", respell: "wəək", ipa: "wɜːk" }, mistake: { id: "mc-work-mistake", word: "work", respell: "wook", ipa: "wɔk" }, heard: { id: "mc-walk", word: "walk", ipa: "wɔːk" }, rule: "drop-the-r" },
  { say: { id: "mc-cant", word: "can't", respell: "kaant", ipa: "kɑːnt" }, mistake: { id: "mc-cant-mistake", word: "can't", respell: "kan", ipa: "kæn" }, heard: { id: "mc-can", word: "can", ipa: "kæn" }, rule: "long-vowels" },
  { say: { id: "mc-sheep", word: "sheep", respell: "shiip", ipa: "ʃiːp" }, mistake: { id: "mc-sheep-mistake", word: "sheep", respell: "ship", ipa: "ʃɪp" }, heard: { id: "mc-ship", word: "ship", ipa: "ʃɪp" }, rule: "long-vowels" },
  { say: { id: "mc-leave", word: "leave", respell: "liiv", ipa: "liːv" }, mistake: { id: "mc-leave-mistake", word: "leave", respell: "liv", ipa: "lɪv" }, heard: { id: "mc-live", word: "live", ipa: "lɪv" }, rule: "long-vowels" },
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
  { say: { id: "mc-little", word: "little", respell: "**li**-təl", ipa: "ˈlɪtl" }, american: { id: "mc-little-us", word: "little", respellUS: "**li**-dəl", ipaUS: "ˈlɪɾl" }, rule: "say-every-t" },
  { say: { id: "mc-litre", word: "litre", respell: "**lii**-tə", ipa: "ˈliːtə" }, american: { id: "mc-litre-us", word: "litre", respellUS: "**lii**-dər", ipaUS: "ˈliɾɚ" }, heard: { id: "mc-leader", word: "leader", ipa: "ˈliːdə" }, alsoSpelt: "liter", rule: "say-every-t" },
  { say: { id: "mc-literally", word: "literally", respell: "**li**-tə-rə-li", ipa: "ˈlɪtərəli" }, american: { id: "mc-literally-us", word: "literally", respellUS: "**li**-dər-ə-li", ipaUS: "ˈlɪɾɚəli" }, rule: "say-every-t" },
  { say: { id: "mc-writing", word: "writing", respell: "**rai**-ting", ipa: "ˈraɪtɪŋ" }, american: { id: "mc-writing-us", word: "writing", respellUS: "**rai**-ding", ipaUS: "ˈraɪɾɪŋ" }, heard: { id: "mc-riding", word: "riding", ipa: "ˈraɪdɪŋ" }, rule: "say-every-t" },
  { say: { id: "mc-putting", word: "putting", respell: "**pu**-ting", ipa: "ˈpʊtɪŋ" }, american: { id: "mc-putting-us", word: "putting", respellUS: "**pu**-ding", ipaUS: "ˈpʊɾɪŋ" }, heard: { id: "mc-pudding", word: "pudding", ipa: "ˈpʊdɪŋ" }, rule: "say-every-t" },
  { say: { id: "mc-metal", word: "metal", respell: "**me**-təl", ipa: "ˈmetl" }, american: { id: "mc-metal-us", word: "metal", respellUS: "**me**-dəl", ipaUS: "ˈmɛɾl" }, heard: { id: "mc-medal", word: "medal", ipa: "ˈmedl" }, rule: "say-every-t" },
  { say: { id: "mc-thirty", word: "thirty", respell: "**thəə**-ti", ipa: "ˈθɜːti" }, american: { id: "mc-thirty-us", word: "thirty", respellUS: "**thər**-di", ipaUS: "ˈθɝɾi" }, rule: "say-every-t" },
  { say: { id: "mc-hot", word: "hot", respell: "hot", ipa: "hɒt" }, american: { id: "mc-hot-us", word: "hot", respellUS: "haat", ipaUS: "hɑt" }, heard: { id: "mc-heart", word: "heart", ipa: "hɑːt" }, rule: "short-o" },
  { say: { id: "mc-not", word: "not", respell: "not", ipa: "nɒt" }, american: { id: "mc-not-us", word: "not", respellUS: "naat", ipaUS: "nɑt" }, heard: { id: "mc-nut", word: "nut", ipa: "nʌt" }, rule: "short-o" },
];
