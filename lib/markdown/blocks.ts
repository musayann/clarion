import "server-only";

import { figureText, type Landing, letterULandings, quadrants, silentRWords, stressPairs, tLandings, vowelLandings } from "@/components/figures/data";
import { americanDifferences, meaningChanges, quickAnswers } from "@/content/data/comparisons";
import { pairGroups } from "@/content/data/pairs";
import { sentenceGroups } from "@/content/data/sentences";
import type { Accent, Word } from "@/content/data/types";
import { wordGroups } from "@/content/data/words";
import { ruleHref, rules } from "@/content/nav";
import { clipSrc } from "@/lib/audio";
import { absoluteUrl, markdownHref } from "@/lib/site";
import { findById } from "@/lib/word-index";

/*
 * Markdown versions of the MDX components, built from the same data as the React ones.
 * Sound spellings keep their **stressed syllable** in bold, as on the site.
 */

type Props = Record<string, string | boolean | undefined>;

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

function table(head: string[], rows: string[][]): string {
  return [
    `| ${head.map(cell).join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
  ].join("\n");
}

function audio(accent: Accent, id: string, label = "audio"): string {
  const src = clipSrc(accent, id);
  return src ? `[${label}](${absoluteUrl(src)})` : "";
}

const mdLink = (href: string, text: string) => `[${text}](${absoluteUrl(markdownHref(href))})`;

const ruleLink = (slug: (typeof rules)[number]["slug"]) => {
  const rule = rules.find((r) => r.slug === slug)!;
  return mdLink(ruleHref(slug), `Rule ${rule.number}`);
};

const say = (w: Word) => [w.british ?? "", audio("gb", w.id)].filter(Boolean).join(" ");
const us = (w: Word) => [w.american ?? "", audio("us", w.id)].filter(Boolean).join(" ");

function wordTable({ group: id }: Props) {
  const group = findById(wordGroups, String(id), "word group");
  const hasNotes = group.words.some((w) => w.note);
  const head = ["Word", "Say this (Standard English)"];
  if (group.withAmerican) head.push("Also heard (American)");
  if (hasNotes) head.push("Note");
  const rows = group.words.map((w) => {
    const row = [w.word, say(w)];
    if (group.withAmerican) row.push(us(w));
    if (hasNotes) row.push(w.note ?? "");
    return row;
  });
  return `**${group.title}**\n\n${table(head, rows)}`;
}

function wordList({ group: id }: Props) {
  const group = findById(wordGroups, String(id), "word group");
  return group.words.map((w) => `- ${w.word} ${audio("gb", w.id)}`.trimEnd()).join("\n");
}

function pairTable({ group: id }: Props) {
  const group = findById(pairGroups, String(id), "pair group");
  const pairCell = (w: Word) =>
    [w.note, w.word, w.british && w.british !== w.word ? `(${w.british})` : "", audio("gb", w.id)].filter(Boolean).join(" ");
  return table(
    group.labels,
    group.pairs.map(({ a, b }) => [pairCell(a), pairCell(b)]),
  );
}

function practiceSentences({ group: id }: Props) {
  const group = findById(sentenceGroups, String(id), "sentence group");
  return group.sentences.map((s) => `- ${s.text} ${audio("gb", s.id)}`.trimEnd()).join("\n");
}

function quickAnswersTable() {
  return table(
    ["Sound", "Example", "American", "Standard English (say this)", "How to check", "Rule"],
    quickAnswers.map((q) => [
      q.sound,
      q.examples.word,
      q.same ? "the same in both styles" : [us(q.examples), q.americanNote && `(${q.americanNote})`].filter(Boolean).join(" "),
      [say(q.examples), q.britishNote && `(${q.britishNote})`, q.sayNote && `(${q.sayNote})`].filter(Boolean).join(" "),
      q.check,
      q.rule ? ruleLink(q.rule) : "",
    ]),
  );
}

function meaningChangeTable() {
  return table(
    ["Word", "Say it like this", "If you say", "Listeners may hear", "Rule"],
    meaningChanges.map((m) => [
      m.say.word,
      say(m.say),
      say(m.mistake),
      m.heard ? `${m.heard.word} ${audio("gb", m.heard.id)}`.trimEnd() : "a word they don't recognise",
      ruleLink(m.rule),
    ]),
  );
}

function americanDifferenceTable() {
  return table(
    ["Word", "Say this (Standard English)", "Also heard (American)", "Some listeners may hear", "Rule"],
    americanDifferences.map((d) => [
      d.say.word,
      say(d.say),
      us(d.american),
      d.heard ? `${d.heard.word} ${audio("gb", d.heard.id)}`.trimEnd() : "no other word",
      ruleLink(d.rule),
    ]),
  );
}

const figure = (text: { title: string; caption: string }, body: string) =>
  `**Figure: ${text.title}.** ${text.caption}\n\n${body}`;

function effectEffortChart() {
  return figure(
    figureText.effectEffort,
    quadrants
      .map((q) => `- ${q.title}: ${q.items.map((i) => (i.href ? `[${i.label}](${absoluteUrl(markdownHref(i.href))})` : i.label)).join("; ")}`)
      .join("\n"),
  );
}

function tRuleFlow() {
  return figure(
    figureText.tRule,
    `1. Listen ${audio("gb", "snd-t", "t")}\n2. Stop the air with your tongue\n3. Release and repeat`,
  );
}

function teenTyStress() {
  const spell = (n: (typeof stressPairs)[number][number]) =>
    n.syllables.map((s, i) => (i === n.stress ? `**${s}**` : s)).join("-");
  return figure(
    figureText.teenTy,
    stressPairs.map((pair) => `- ${pair.map((n) => `${n.word} (${n.n}): ${spell(n)}`).join(" versus ")}`).join("\n"),
  );
}

function silentR() {
  return figure(
    figureText.silentR,
    silentRWords.map((w) => `- ${w.word.replaceAll("r", "~~r~~")} → ${w.british}${w.endsInVowel ? " ●" : ""}`).join("\n"),
  );
}

const startingPoints = (landings: Landing[]) =>
  landings.map((l) => `- ${l.label}${l.clip ? ` ${audio("gb", l.clip, "vowel")}` : ""}: rough starting point Kinyarwanda ${l.sound} (${l.note})`).join("\n");

function vowelMap() {
  return figure(figureText.vowelMap, startingPoints(vowelLandings));
}

function letterUMap() {
  return figure(figureText.letterU, startingPoints(letterULandings));
}

function tStartMap() {
  return figure(figureText.tStart, startingPoints(tLandings));
}

/** Flow-level components with no children, keyed by their MDX name. */
export const blocks: Record<string, (props: Props) => string> = {
  WordTable: wordTable,
  WordList: wordList,
  PairTable: pairTable,
  PracticeSentences: practiceSentences,
  QuickAnswersTable: quickAnswersTable,
  MeaningChangeTable: meaningChangeTable,
  AmericanDifferenceTable: americanDifferenceTable,
  EffectEffortChart: effectEffortChart,
  TRuleFlow: tRuleFlow,
  TeenTyStress: teenTyStress,
  SilentR: silentR,
  VowelMap: vowelMap,
  LetterUMap: letterUMap,
  TStartMap: tStartMap,
};

export { audio, mdLink, table };
