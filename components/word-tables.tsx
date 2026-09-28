import Link from "next/link";
import { ArrowUpRight, CircleCheck, CircleX, Ear } from "lucide-react";
import { cn } from "cn";

import { Listen } from "@/components/listen";
import { Respell } from "@/components/respell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { americanHabits, meaningChanges, quickAnswers } from "@/content/data/comparisons";
import { pairGroups } from "@/content/data/pairs";
import { sentenceGroups } from "@/content/data/sentences";
import type { Word } from "@/content/data/types";
import { wordGroups } from "@/content/data/words";
import { ruleHref, rules } from "@/content/nav";
import { clipSrc } from "@/lib/audio";
import { findById as find, groupAnchor } from "@/lib/word-index";

/** Cambridge has recorded UK and US audio for single words. */
function DictionaryLink({ word }: { word: string }) {
  if (!/^[A-Za-z']+$/.test(word)) return null;
  return (
    <a
      href={`https://dictionary.cambridge.org/pronunciation/english/${encodeURIComponent(word.toLowerCase())}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-0.5 text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      aria-label={`${word} in the Cambridge Dictionary (opens in a new tab)`}
    >
      Cambridge
      <ArrowUpRight className="size-3" aria-hidden />
    </a>
  );
}

function TableFrame({ id, children, caption }: { id?: string; children: React.ReactNode; caption?: string }) {
  return (
    <figure id={id} className="my-6 scroll-mt-20 overflow-hidden rounded-xl border bg-card">
      {caption && (
        <figcaption className="border-b bg-muted/50 px-4 py-2 text-sm font-medium">{caption}</figcaption>
      )}
      {children}
    </figure>
  );
}

const headClass = "h-10 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground";
const cellClass = "px-4 py-2.5";
const sayCellClass = "bg-good-soft/30";
const avoidCellClass = "bg-avoid-soft/30 text-muted-foreground";
const recogniseCellClass = "bg-caution-soft/40 text-muted-foreground";

const verdicts = {
  say: { icon: CircleCheck, className: "bg-good-soft/60 text-good" },
  avoid: { icon: CircleX, className: "bg-avoid-soft/60 text-avoid" },
  recognise: { icon: Ear, className: "bg-caution-soft/60 text-caution" },
};

/**
 * Column header marking what to say (✓, green), what to recognise but not copy (ear, amber),
 * or a mistake (✗, red).
 */
function VerdictHead({
  verdict,
  label,
  detail,
  wrap = false,
}: {
  verdict: keyof typeof verdicts;
  label: string;
  detail?: string;
  /** Put the detail on its own line so a long header doesn't widen the table. */
  wrap?: boolean;
}) {
  const { icon: Icon, className } = verdicts[verdict];
  return (
    <TableHead className={cn(headClass, className, wrap && "h-auto py-2 whitespace-normal")}>
      {wrap ? (
        <span className="flex flex-col">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Icon className="size-3.5" aria-hidden />
            {label}
          </span>
          {detail && <span className="pl-5 font-normal normal-case tracking-normal">({detail})</span>}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5">
          <Icon className="size-3.5" aria-hidden />
          {label}
          {detail && <span className="font-normal normal-case tracking-normal">({detail})</span>}
        </span>
      )}
    </TableHead>
  );
}

/** Word | Say this | (Recognise, don't copy) — with Standard English and American clips. */
export function WordTable({ group: groupId, dictionary = true }: { group: string; dictionary?: boolean }) {
  const group = find(wordGroups, groupId, "word group");
  const withUS = group.withAmerican;
  const hasNotes = group.words.some((w) => w.note);

  return (
    <TableFrame id={groupAnchor(group.id)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className={headClass}>Word</TableHead>
            {withUS ? (
              <VerdictHead verdict="say" label="Say this" detail="Standard English" />
            ) : (
              <TableHead className={headClass}>
                Say this <span className="font-normal normal-case tracking-normal">(Standard English)</span>
              </TableHead>
            )}
            {withUS && <VerdictHead verdict="avoid" label="Recognise, don't copy" detail="American" />}
            {hasNotes && <TableHead className={headClass}>Note</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.words.map((w) => (
            <TableRow key={w.id}>
              <TableCell className={cn(cellClass, "font-medium")}>
                <div className="flex flex-col gap-0.5">
                  <span className="text-base">{w.word}</span>
                  {dictionary && <DictionaryLink word={w.word} />}
                </div>
              </TableCell>
              <TableCell className={cn(cellClass, withUS && sayCellClass)}>
                <span className="inline-flex items-center gap-1">
                  {w.british && <Respell text={w.british} className="text-base" />}
                  <Listen src={clipSrc("gb", w.id)} label={w.word} />
                </span>
              </TableCell>
              {withUS && (
                <TableCell className={cn(cellClass, avoidCellClass)}>
                  <span className="inline-flex items-center gap-1">
                    {w.american && <Respell text={w.american} />}
                    <Listen src={clipSrc("us", w.id)} label={w.word} accent="us" />
                  </span>
                </TableCell>
              )}
              {hasNotes && (
                <TableCell className={cn(cellClass, "text-sm text-muted-foreground")}>
                  {w.note && <Respell text={w.note} className="whitespace-normal" />}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableFrame>
  );
}

/** A list of words with no sound spelling, each with its own listen button. */
export function WordList({ group: groupId }: { group: string }) {
  const group = find(wordGroups, groupId, "word group");
  return (
    <ul id={groupAnchor(group.id)} className="my-5 flex scroll-mt-20 flex-wrap gap-2" aria-label={group.title}>
      {group.words.map((w) => (
        <li
          key={w.id}
          className="inline-flex items-center gap-0.5 rounded-full border bg-card py-0.5 pr-1 pl-3 text-sm font-medium"
        >
          {w.word}
          <Listen src={clipSrc("gb", w.id)} label={w.word} className="size-6" />
        </li>
      ))}
    </ul>
  );
}

function PairCell({ w }: { w: Word }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5">
      {w.note && <span className="w-6 text-sm tabular-nums text-muted-foreground">{w.note}</span>}
      <span className="text-base font-medium">{w.word}</span>
      {w.british && w.british !== w.word && (
        <span className="text-muted-foreground">
          <Respell text={w.british} />
        </span>
      )}
      <Listen src={clipSrc("gb", w.id)} label={w.word} />
    </span>
  );
}

/** Minimal pairs, two columns, with a "play both" button per row. */
export function PairTable({ group: groupId }: { group: string }) {
  const group = find(pairGroups, groupId, "pair group");
  return (
    <TableFrame id={groupAnchor(group.id)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className={headClass}>{group.labels[0]}</TableHead>
            <TableHead className={headClass}>{group.labels[1]}</TableHead>
            <TableHead className={cn(headClass, "w-0 text-right")}>
              <span className="sr-only">Play both</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.pairs.map(({ a, b }) => (
            <TableRow key={a.id}>
              <TableCell className={cellClass}>
                <PairCell w={a} />
              </TableCell>
              <TableCell className={cellClass}>
                <PairCell w={b} />
              </TableCell>
              <TableCell className={cn(cellClass, "text-right")}>
                <Listen
                  src={[clipSrc("gb", a.id), clipSrc("gb", b.id)]}
                  label={`${a.word}, then ${b.word}`}
                  className="text-xs"
                >
                  Both
                </Listen>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableFrame>
  );
}

export function PracticeSentences({ group: groupId }: { group: string }) {
  const group = find(sentenceGroups, groupId, "sentence group");
  return (
    <ul className="my-5 space-y-2">
      {group.sentences.map((s) => (
        <li key={s.id} className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-2.5">
          <span className="text-base">{s.text}</span>
          <Listen src={clipSrc("gb", s.id)} label={s.text} />
        </li>
      ))}
    </ul>
  );
}

/** Inline listen button for a single clip id, for use in prose. */
export function Hear({ id, label, accent = "gb" }: { id: string; label: string; accent?: "gb" | "us" }) {
  return <Listen src={clipSrc(accent, id)} label={label} accent={accent} className="-my-1 align-middle" />;
}

/** Sound | Say this (Standard English clip) | How to check | Recognise, don't copy (American clip) */
export function QuickAnswersTable() {
  return (
    <TableFrame id="quick-answers">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className={headClass}>Sound</TableHead>
            <VerdictHead verdict="say" label="Say this" detail="Standard English" />
            <TableHead className={headClass}>How to check</TableHead>
            <VerdictHead verdict="recognise" label="Recognise, don't copy" detail="American" wrap />
          </TableRow>
        </TableHeader>
        <TableBody>
          {quickAnswers.map((q) => (
            <TableRow key={q.examples.id} className="align-top">
              <TableCell className={cn(cellClass, "min-w-36 whitespace-normal")}>
                <div className="font-medium">{q.sound}</div>
                <div className="text-sm text-muted-foreground">{q.examples.word}</div>
                {q.rule && (
                  <Link href={ruleHref(q.rule)} className="text-xs text-primary underline-offset-4 hover:underline">
                    See the rule
                  </Link>
                )}
              </TableCell>
              <TableCell className={cn(cellClass, sayCellClass)}>
                <span className="inline-flex items-center gap-1">
                  <Respell text={q.examples.british!} className="text-base font-medium" />
                  <Listen src={clipSrc("gb", q.examples.id)} label={q.examples.word} />
                </span>
                {q.britishNote && <div className="text-xs text-muted-foreground">({q.britishNote})</div>}
                {q.sayNote && <div className="text-xs font-medium text-good">{q.sayNote}</div>}
              </TableCell>
              <TableCell className={cn(cellClass, "min-w-48 whitespace-normal text-sm")}>{q.check}</TableCell>
              <TableCell className={cn(cellClass, recogniseCellClass, "text-sm")}>
                {q.same ? (
                  "Same in both"
                ) : (
                  <>
                    <span className="inline-flex items-center gap-1">
                      <Respell text={q.examples.american!} />
                      <Listen src={clipSrc("us", q.examples.id)} label={q.examples.word} accent="us" />
                    </span>
                    {q.americanNote && <div className="text-xs">({q.americanNote})</div>}
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableFrame>
  );
}

/** Word | Say it like this | If you say | Listeners may hear | Rule */
export function MeaningChangeTable() {
  return (
    <TableFrame id="meaning-changes">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className={headClass}>Word</TableHead>
            <VerdictHead verdict="say" label="Say it like this" />
            <VerdictHead verdict="avoid" label="If you say" />
            <TableHead className={headClass}>Listeners may hear</TableHead>
            <TableHead className={headClass}>Rule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meaningChanges.map((m) => {
            const rule = rules.find((r) => r.slug === m.rule)!;
            return (
              <TableRow key={m.say.id}>
                <TableCell className={cn(cellClass, "text-base font-medium")}>{m.say.word}</TableCell>
                <TableCell className={cn(cellClass, sayCellClass)}>
                  <span className="inline-flex items-center gap-1">
                    <Respell text={m.say.british!} className="text-base" />
                    <Listen src={clipSrc("gb", m.say.id)} label={m.say.word} />
                  </span>
                </TableCell>
                <TableCell className={cn(cellClass, avoidCellClass)}>
                  <span className="inline-flex items-center gap-1">
                    <Respell text={m.mistake.american!} />
                    <Listen src={clipSrc("us", m.mistake.id)} label={m.mistake.word} accent="us" mistake />
                  </span>
                </TableCell>
                <TableCell className={cellClass}>
                  {m.heard ? (
                    <span className="inline-flex items-center gap-1">
                      {m.heard.word}
                      <Listen src={clipSrc("gb", m.heard.id)} label={m.heard.word} />
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">a word they don&apos;t recognise</span>
                  )}
                </TableCell>
                <TableCell className={cellClass}>
                  <Link
                    href={ruleHref(rule.slug)}
                    title={`Rule ${rule.number}: ${rule.title}`}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Rule {rule.number}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableFrame>
  );
}

/** Habit | Example | Sounds like (American clip) | Say instead (Standard English clip) */
export function AmericanHabitsTable() {
  return (
    <TableFrame id="american-habits">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className={headClass}>Habit</TableHead>
            <TableHead className={headClass}>Example</TableHead>
            <VerdictHead verdict="avoid" label="Sounds like" detail="American" />
            <VerdictHead verdict="say" label="Say instead" detail="Standard English" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {americanHabits.map((h) => (
            <TableRow key={h.words.id} className="align-top">
              <TableCell className={cn(cellClass, "min-w-40 whitespace-normal font-medium")}>{h.habit}</TableCell>
              <TableCell className={cn(cellClass, "min-w-40 whitespace-normal")}>{h.example}</TableCell>
              <TableCell className={cn(cellClass, avoidCellClass)}>
                <span className="inline-flex items-center gap-1">
                  <Respell text={h.words.american!} className="whitespace-normal" />
                  <Listen src={clipSrc("us", h.words.id)} label={h.example} accent="us" />
                </span>
              </TableCell>
              <TableCell className={cn(cellClass, sayCellClass)}>
                <span className="inline-flex items-center gap-1">
                  <Respell text={h.words.british!} className="whitespace-normal" />
                  <Listen src={clipSrc("gb", h.words.id)} label={h.example} />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableFrame>
  );
}
