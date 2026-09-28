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
  | "everyday-words"
  | "recognise-american";

/**
 * A spoken item. `british` and `american` are the guide's sound spellings,
 * with the stressed syllable wrapped in **double asterisks**.
 * `ipaGB` / `ipaUS` are only used to force the TTS voice when generating audio.
 */
export type Word = {
  id: string;
  word: string;
  british?: string;
  american?: string;
  ipaGB?: string;
  ipaUS?: string;
  /** Text to speak when it differs from `word` (e.g. "zed" for Z). */
  sayGB?: string;
  sayUS?: string;
  note?: string;
};

export type WordGroup = {
  id: string;
  section: Section;
  title: string;
  /** true when the group has American clips as well as British ones. */
  withAmerican?: boolean;
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
  pairs: Pair[];
};

export type Sentence = {
  id: string;
  text: string;
  british?: string;
  ipaGB?: string;
};

export type SentenceGroup = {
  id: string;
  section: Section;
  title: string;
  sentences: Sentence[];
};
