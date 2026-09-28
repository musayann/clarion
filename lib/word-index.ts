import { pairGroups } from "@/content/data/pairs";
import type { Section, Word } from "@/content/data/types";
import { wordGroups } from "@/content/data/words";
import { rules } from "@/content/nav";

export type IndexEntry = {
  id: string;
  word: string;
  british?: string;
  american?: string;
  note?: string;
  section: Section;
  sectionTitle: string;
  group: string;
  href: string;
};

const sectionPages: Record<Exclude<Section, (typeof rules)[number]["slug"]>, { title: string; href: string }> = {
  "which-style": { title: "Which style to use", href: "/guide/which-style" },
  "everyday-words": { title: "Everyday words that differ", href: "/everyday-words" },
  "recognise-american": { title: "Recognise American English", href: "/recognise-american" },
};

/** Element id of a word or pair table, distinct from the heading ids rehype-slug generates. */
export const groupAnchor = (groupId: string) => `words-${groupId}`;

export function sectionInfo(section: Section): { title: string; href: string } {
  const rule = rules.find((r) => r.slug === section);
  if (rule) return { title: `Rule ${rule.number}: ${rule.title}`, href: `/rules/${rule.slug}` };
  return sectionPages[section as keyof typeof sectionPages];
}

/** Every word in the guide, once per place it appears, for the word finder and search. */
export function buildWordIndex(): IndexEntry[] {
  const entry = (w: Word, section: Section, group: string, groupId: string): IndexEntry => {
    const info = sectionInfo(section);
    return {
      id: w.id,
      word: w.word,
      british: w.british,
      american: w.american,
      note: w.note,
      section,
      sectionTitle: info.title,
      group,
      href: `${info.href}#${groupAnchor(groupId)}`,
    };
  };

  return [
    ...wordGroups.flatMap((g) => g.words.map((w) => entry(w, g.section, g.title, g.id))),
    ...pairGroups.flatMap((g) =>
      g.pairs.flatMap((p) => [entry(p.a, g.section, g.title, g.id), entry(p.b, g.section, g.title, g.id)]),
    ),
  ];
}
