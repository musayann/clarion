import { silentRWords } from "../../components/figures/data";

import { americanDifferences, meaningChanges, quickAnswers } from "./comparisons";
import { pairGroups } from "./pairs";
import { sentenceGroups } from "./sentences";
import type { Accent, Word } from "./types";
import { wordGroups } from "./words";

/** One audio file to generate: public/audio/<accent>/<id>.mp3 */
export type Clip = {
  id: string;
  accent: Accent;
  text: string;
  ipa?: string;
  /** Speech markup used instead of text and ipa, without the <speak> wrapper. */
  ssml?: string;
};

export const clipKey = (accent: Accent, id: string) => `${accent}/${id}`;

/** A word gets a British clip unless it only has an American form, and an American clip when it has one. */
export function clipsForWord(w: Word): Clip[] {
  const clips: Clip[] = [];
  if (w.british !== undefined || w.american === undefined) {
    clips.push({ id: w.id, accent: "gb", text: w.sayGB ?? w.word, ipa: w.ipaGB });
  }
  if (w.american !== undefined) {
    clips.push({ id: w.id, accent: "us", text: w.sayUS ?? w.word, ipa: w.ipaUS });
  }
  return clips;
}

const phoneme = (text: string, ipa: string) => `<phoneme alphabet="ipa" ph="${ipa}">${text}</phoneme>`;

/** A sound taught on its own: said slowly three times with pauses, then in a key word. */
function soundClip(id: string, text: string, ipa: string, word: string, rate = "slow"): Clip {
  const sound = `<prosody rate="${rate}">${phoneme(text, ipa)}</prosody>`;
  return {
    id,
    accent: "gb",
    text: `${text}, ${text}, ${text}, ${word}`,
    ssml: [sound, sound, sound, word].join('<break time="700ms"/>'),
  };
}

/** Single sounds heard on their own in prose. Consonants go in a syllable, as text-to-speech can't say them alone. */
export const soundClips: Clip[] = [
  soundClip("snd-t", "ta", "tʰɑː", "water", "medium"),
  soundClip("snd-l", "la", "lɑː", "light", "medium"),
  soundClip("snd-r", "ra", "ɹɑː", "right", "medium"),
  soundClip("snd-o", "o", "ɒ", "hot"),
  soundClip("snd-uh", "u", "ʌ", "hut"),
  soundClip("snd-oo", "or", "ɔː", "walk", "x-slow"),
  soundClip("snd-aa", "ah", "ɑː", "hard", "x-slow"),
];

export function allClips(): Clip[] {
  const words: Word[] = [
    ...wordGroups.flatMap((g) => g.words),
    ...pairGroups.flatMap((g) => g.pairs.flatMap((p) => [p.a, p.b])),
    ...quickAnswers.map((q) => q.examples),
    ...meaningChanges.flatMap((m) => [m.say, m.mistake, ...(m.heard ? [m.heard] : [])]),
    ...americanDifferences.flatMap((d) => [d.say, d.american, ...(d.heard ? [d.heard] : [])]),
    ...silentRWords.filter((w) => w.id.startsWith("sr-")),
  ];
  const clips = [
    ...words.flatMap(clipsForWord),
    ...sentenceGroups.flatMap((g) =>
      g.sentences.map<Clip>((s) => ({ id: s.id, accent: "gb", text: s.text, ipa: s.ipaGB })),
    ),
    ...soundClips,
  ];

  const seen = new Set<string>();
  for (const c of clips) {
    const key = clipKey(c.accent, c.id);
    if (seen.has(key)) throw new Error(`Duplicate clip id: ${key}`);
    seen.add(key);
  }
  return clips;
}
