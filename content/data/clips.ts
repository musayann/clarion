import { americanDifferences, americanHabits, meaningChanges, quickAnswers } from "./comparisons";
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

export function allClips(): Clip[] {
  const words: Word[] = [
    ...wordGroups.flatMap((g) => g.words),
    ...pairGroups.flatMap((g) => g.pairs.flatMap((p) => [p.a, p.b])),
    ...quickAnswers.map((q) => q.examples),
    ...meaningChanges.flatMap((m) => [m.say, m.mistake, ...(m.heard ? [m.heard] : [])]),
    ...americanDifferences.flatMap((d) => [d.say, d.american, ...(d.heard ? [d.heard] : [])]),
    ...americanHabits.map((h) => h.words),
  ];
  const clips = [
    ...words.flatMap(clipsForWord),
    ...sentenceGroups.flatMap((g) =>
      g.sentences.map<Clip>((s) => ({ id: s.id, accent: "gb", text: s.text, ipa: s.ipaGB })),
    ),
  ];

  const seen = new Set<string>();
  for (const c of clips) {
    const key = clipKey(c.accent, c.id);
    if (seen.has(key)) throw new Error(`Duplicate clip id: ${key}`);
    seen.add(key);
  }
  return clips;
}
