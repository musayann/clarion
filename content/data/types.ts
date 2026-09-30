export type Accent = "gb" | "us";

export type RuleSlug =
  | "say-every-t"
  | "thirteen-vs-thirty"
  | "r-and-l"
  | "drop-the-r"
  | "short-o"
  | "long-vowels";

/** Where a word lives on the site: a rule, or one of the reference pages. */
export type Section =
  | RuleSlug
  | "which-style"
  | "everyday-words";

/**
 * A spoken item. `respell` and `respellUS` are the guide's sound spellings,
 * with the stressed syllable wrapped in **double asterisks**.
 * `ipa` / `ipaUS` are only used to force the TTS voice when generating audio.
 */
export type Word = {
  id: string;
  word: string;
  respell?: string;
  respellUS?: string;
  ipa?: string;
  ipaUS?: string;
  note?: string;
};

export type WordGroup = {
  id: string;
  section: Section;
  title: string;
  words: Word[];
};

export type Pair = {
  a: Word;
  b: Word;
};

export type PairGroup = {
  id: string;
  section: Section;
  title: string;
  labels: [string, string];
  /** The first word is the sound to say, the second the one it must not become. */
  contrast?: boolean;
  pairs: Pair[];
};

export type Sentence = {
  id: string;
  text: string;
  respell?: string;
  ipa?: string;
};

export type SentenceGroup = {
  id: string;
  section: Section;
  title: string;
  sentences: Sentence[];
};
