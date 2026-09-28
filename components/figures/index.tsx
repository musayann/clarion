import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "cn";

import { rules } from "@/content/nav";

function Figure({
  title,
  caption,
  children,
  table,
}: {
  title: string;
  caption?: React.ReactNode;
  children: React.ReactNode;
  /** Same data as a table, for screen readers and anyone who prefers numbers. */
  table?: React.ReactNode;
}) {
  return (
    <figure className="my-8 rounded-xl border bg-card p-4 sm:p-6">
      <figcaption className="mb-4">
        <p className="font-semibold">{title}</p>
        {caption && <p className="mt-1 text-sm text-muted-foreground">{caption}</p>}
      </figcaption>
      {children}
      {table && (
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">Show as a table</summary>
          <div className="mt-3 overflow-x-auto">{table}</div>
        </details>
      )}
    </figure>
  );
}

function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <ul className="mb-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: i.color }} aria-hidden />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

const simpleTable = (head: string[], rows: (string | number)[][]) => (
  <table className="w-full text-left">
    <thead>
      <tr>
        {head.map((h) => (
          <th key={h} className="border-b py-1 pr-4 font-medium">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i}>
          {r.map((c, j) => (
            <td key={j} className="border-b py-1 pr-4 tabular-nums">
              {c}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

/* 1. Where each rule sits: effect versus effort ------------------------------------------ */

// Relative positions (0–10) read from the guide's text: rules 3 and 4 need daily practice
// and matter most; the other four are single changes you can make this week.
const ruleEffort: Record<number, { effort: number; effect: number; short: string }> = {
  1: { effort: 2, effect: 7.5, short: "Full t" },
  2: { effort: 1.5, effect: 5.5, short: "-teen / -ty" },
  3: { effort: 8.5, effect: 9.5, short: "r and l" },
  4: { effort: 7, effect: 7.5, short: "əə, no r" },
  5: { effort: 3.5, effect: 4.5, short: "Short o" },
  6: { effort: 4, effect: 6.5, short: "Long vowels" },
};

export function EffectEffortChart() {
  const W = 560;
  const H = 320;
  const pad = { l: 44, r: 16, t: 16, b: 40 };
  const x = (v: number) => pad.l + (v / 10) * (W - pad.l - pad.r);
  const y = (v: number) => H - pad.b - (v / 10) * (H - pad.t - pad.b);

  return (
    <Figure
      title="Where each rule sits: effect versus effort"
      caption="Start with the quick wins on the left. Practise rules 3 and 4 every day: they take longest but make the biggest difference."
      table={simpleTable(
        ["Rule", "Type", "Effort (0–10)", "Effect (0–10)"],
        rules.map((r) => [`${r.number}. ${r.title}`, r.quickWin ? "Quick win" : "Daily practice", ruleEffort[r.number].effort, ruleEffort[r.number].effect]),
      )}
    >
      <Legend
        items={[
          { label: "Quick win", color: "var(--chart-1)" },
          { label: "Daily practice", color: "var(--chart-2)" },
        ]}
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Scatter chart of the six rules by effort and effect">
        {/* quadrant split */}
        <line x1={x(5)} x2={x(5)} y1={y(0)} y2={y(10)} stroke="var(--border)" strokeDasharray="4 4" />
        <line x1={x(0)} x2={x(10)} y1={y(5)} y2={y(5)} stroke="var(--border)" strokeDasharray="4 4" />
        <line x1={x(0)} x2={x(10)} y1={y(0)} y2={y(0)} stroke="var(--muted-foreground)" strokeOpacity={0.5} />
        <line x1={x(0)} x2={x(0)} y1={y(0)} y2={y(10)} stroke="var(--muted-foreground)" strokeOpacity={0.5} />
        <text x={x(5)} y={H - 12} textAnchor="middle" className="fill-muted-foreground text-[12px]">
          Effort to learn →
        </text>
        <text transform={`translate(16 ${y(5)}) rotate(-90)`} textAnchor="middle" className="fill-muted-foreground text-[12px]">
          Effect on being understood →
        </text>
        <text x={x(0.2)} y={y(9.6)} className="fill-muted-foreground text-[11px]">
          Quick wins
        </text>
        <text x={x(9.8)} y={y(0.4)} textAnchor="end" className="fill-muted-foreground text-[11px]">
          Lower priority
        </text>
        {rules.map((r) => {
          const p = ruleEffort[r.number];
          const color = r.quickWin ? "var(--chart-1)" : "var(--chart-2)";
          const labelLeft = p.effort > 6;
          return (
            <Link key={r.slug} href={`/rules/${r.slug}`} className="group">
              <title>{`Rule ${r.number}: ${r.title}. Effort ${p.effort}/10, effect ${p.effect}/10`}</title>
              <circle cx={x(p.effort)} cy={y(p.effect)} r={16} fill="transparent" />
              <circle
                cx={x(p.effort)}
                cy={y(p.effect)}
                r={7}
                fill={color}
                stroke="var(--card)"
                strokeWidth={2}
                className="transition-[r] group-hover:[r:9]"
              />
              <text
                x={x(p.effort) + (labelLeft ? -12 : 12)}
                y={y(p.effect) + 4}
                textAnchor={labelLeft ? "end" : "start"}
                className="fill-foreground text-[12px] font-medium group-hover:underline"
              >
                {`${r.number} · ${p.short}`}
              </text>
            </Link>
          );
        })}
      </svg>
    </Figure>
  );
}

/* 2. The t rule: one decision ------------------------------------------------------------ */

export function TRuleFlow() {
  const box = "rounded-lg border px-4 py-3 text-center";
  return (
    <Figure title="The t rule: one decision" caption="There is only one question to ask about a t in the spelling.">
      <div className="flex flex-col items-center gap-2">
        <div className={cn(box, "bg-muted/50 font-medium")}>You see a t in the spelling</div>
        <ArrowDown className="size-4 text-muted-foreground" aria-hidden />
        <div className={cn(box, "border-primary/40 bg-accent/50 font-medium")}>
          Is the word on the silent-t list?
          <div className="mt-1 text-xs font-normal text-muted-foreground">
            listen, castle, whistle, fasten, Christmas, mortgage, (often)
          </div>
        </div>
        <div className="grid w-full max-w-lg grid-cols-2 gap-3 pt-1">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Yes</span>
            <div className={cn(box, "w-full bg-muted/40")}>
              <p className="font-medium">Don&apos;t say it</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">li</span>-sən
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">No (almost every word)</span>
            <div className={cn(box, "w-full border-good/40 bg-good-soft/60")}>
              <p className="font-medium">Full t</p>
              <p className="text-xs text-muted-foreground">tongue stops the air, then releases</p>
            </div>
          </div>
        </div>
      </div>
    </Figure>
  );
}

/* 3. Stress in -teen and -ty numbers ------------------------------------------------------ */

const stressPairs: { n: string; syllables: [string, string]; stress: 0 | 1 }[][] = [
  [
    { n: "13", syllables: ["thəə", "tiin"], stress: 1 },
    { n: "30", syllables: ["thəə", "ti"], stress: 0 },
  ],
  [
    { n: "14", syllables: ["foo", "tiin"], stress: 1 },
    { n: "40", syllables: ["foo", "ti"], stress: 0 },
  ],
  [
    { n: "15", syllables: ["fif", "tiin"], stress: 1 },
    { n: "50", syllables: ["fif", "ti"], stress: 0 },
  ],
];

export function TeenTyStress() {
  return (
    <Figure
      title="Stress in -teen and -ty numbers"
      caption="The stressed syllable is louder, longer and higher. In -teen numbers it is the last one, and its ii is long."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {stressPairs.map((pair) => (
          <div key={pair[0].n} className="space-y-3 rounded-lg bg-muted/40 p-3">
            {pair.map((num) => (
              <div key={num.n} className="flex items-end gap-2">
                <span className="w-7 text-sm tabular-nums text-muted-foreground">{num.n}</span>
                {num.syllables.map((s, i) => {
                  const stressed = i === num.stress;
                  return (
                    <span
                      key={i}
                      className={cn(
                        "rounded-md px-2 text-center",
                        stressed
                          ? "-translate-y-1.5 bg-stress py-1.5 text-lg font-bold text-stress-foreground"
                          : "border bg-card py-1 text-sm text-muted-foreground",
                        stressed && s.endsWith("iin") && "min-w-20",
                      )}
                    >
                      {s}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Figure>
  );
}

/* 4. Sounds per word: Standard English versus American -------------------------------------------- */

// Counted from the guide's sound spellings: a long vowel (aa, oo, əə …) is one sound.
const soundCounts: { word: string; gb: string; us: string; gbN: number; usN: number; endsInVowel: boolean }[] = [
  { word: "car", gb: "kaa", us: "kaar", gbN: 2, usN: 3, endsInVowel: true },
  { word: "more", gb: "moo", us: "moor", gbN: 2, usN: 3, endsInVowel: true },
  { word: "hard", gb: "haad", us: "haard", gbN: 3, usN: 4, endsInVowel: false },
  { word: "work", gb: "wəək", us: "wərk", gbN: 3, usN: 4, endsInVowel: false },
  { word: "first", gb: "fəəst", us: "fərst", gbN: 4, usN: 5, endsInVowel: false },
  { word: "water", gb: "woo-tə", us: "waa-dər", gbN: 4, usN: 5, endsInVowel: true },
  { word: "better", gb: "be-tə", us: "be-dər", gbN: 4, usN: 5, endsInVowel: true },
  { word: "computer", gb: "kəm-pyuu-tə", us: "kəm-pyuu-dər", gbN: 8, usN: 9, endsInVowel: true },
];

export function SoundCountChart() {
  const max = 9;
  return (
    <Figure
      title="Sounds per word: without the r, Standard English words are shorter"
      caption="Counted from the sound spellings in this guide; a long vowel counts as one sound. ● marks words that end in a vowel in Standard English, just like Kinyarwanda words."
      table={simpleTable(
        ["Word", "Standard English", "Sounds", "American", "Sounds"],
        soundCounts.map((s) => [s.word, s.gb, s.gbN, s.us, s.usN]),
      )}
    >
      <Legend
        items={[
          { label: "Standard English", color: "var(--chart-1)" },
          { label: "American", color: "var(--chart-2)" },
        ]}
      />
      <div className="space-y-3" role="img" aria-label="Bar chart of sounds per word, Standard English versus American">
        {soundCounts.map((s) => (
          <div key={s.word} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
            <span className="text-sm font-medium">
              {s.word}
              {s.endsInVowel && <span className="ml-1 text-chart-1" aria-hidden>●</span>}
            </span>
            <div className="space-y-0.5">
              {(
                [
                  ["gb", s.gbN, s.gb, "var(--chart-1)"],
                  ["us", s.usN, s.us, "var(--chart-2)"],
                ] as const
              ).map(([k, n, spelled, color]) => (
                <div key={k} className="group flex items-center gap-2" title={`${k === "gb" ? "Standard English" : "American"} ${spelled}: ${n} sounds`}>
                  <div
                    className="h-3 rounded-r-[4px] transition-opacity group-hover:opacity-80"
                    style={{ width: `${(n / max) * 100}%`, background: color }}
                  />
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {n} <span className="hidden sm:inline">· {spelled}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Figure>
  );
}

/* 5. Which Kinyarwanda vowel each style lands on ----------------------------------------- */

const kinyaVowels = ["i", "e", "a", "o", "u"];
const vowelLandings: { label: string; vowel: string; note: string; tone: "good" | "avoid" | "neutral" }[] = [
  { label: "hot (Standard English)", vowel: "o", note: "short o, a different vowel from hut", tone: "good" },
  { label: "hot (American)", vowel: "a", note: "a held longer: only length separates not from nut", tone: "avoid" },
  { label: "hut, nut, cup", vowel: "a", note: "how Kinyarwanda speakers usually say it", tone: "neutral" },
];

export function VowelMap() {
  return (
    <Figure
      title="Which Kinyarwanda vowel each style lands on"
      caption="The Standard English o in hot is a contrast you already make in Kinyarwanda. The American vowel sits on top of the a you use for hut."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-2 sm:ml-[14rem]">
          {kinyaVowels.map((v) => (
            <div key={v} className="rounded-md border bg-muted/50 py-2 text-center text-lg font-semibold">
              {v}
            </div>
          ))}
        </div>
        {vowelLandings.map((l) => (
          <div key={l.label} className="grid gap-2 sm:grid-cols-[13.5rem_1fr] sm:items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              {l.label}
              <ArrowRight className="size-4 text-muted-foreground max-sm:hidden" aria-hidden />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {kinyaVowels.map((v) => (
                <div
                  key={v}
                  className={cn(
                    "h-8 rounded-md",
                    v === l.vowel
                      ? l.tone === "good"
                        ? "bg-good text-background"
                        : l.tone === "avoid"
                          ? "bg-chart-2"
                          : "bg-muted-foreground/40"
                      : "border border-dashed",
                  )}
                  aria-hidden={v !== l.vowel}
                >
                  {v === l.vowel && <span className="sr-only">lands on {v}</span>}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground sm:col-start-2">{l.note}</p>
          </div>
        ))}
      </div>
    </Figure>
  );
}
