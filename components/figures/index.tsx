import { Fragment } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "cn";

import { Listen } from "@/components/listen";
import { Letters, Respell } from "@/components/respell";
import { clipSrc } from "@/lib/audio";

import {
  figureText,
  kinyaConsonants,
  kinyaVowels,
  type Landing,
  letterULandings,
  quadrants,
  silentRWords,
  stressPairs,
  tLandings,
  vowelLandings,
} from "./data";

function Figure({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8 rounded-xl border bg-card p-4 sm:p-6">
      <figcaption className="mb-4">
        <p className="font-semibold"><Letters text={title} /></p>
        {caption && <p className="mt-1 text-sm text-muted-foreground">{typeof caption === "string" ? <Letters text={caption} /> : caption}</p>}
      </figcaption>
      {children}
    </figure>
  );
}

/* 1. Our suggested practice priorities --------------------------------------------------- */

/** Arrowhead at the end of an axis line, pointing up unless rotated. */
function AxisArrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 10 8" className={cn("absolute h-2 w-2.5 fill-muted-foreground/50", className)} aria-hidden>
      <polygon points="5,0 10,8 0,8" />
    </svg>
  );
}

export function EffectEffortChart() {
  return (
    <Figure
      title={figureText.effectEffort.title}
      caption={figureText.effectEffort.caption}
    >
      <div className="grid grid-cols-[auto_auto_1fr] text-muted-foreground">
        {/* y axis: title, then High/Low ticks */}
        <div className="flex items-center justify-center pr-1 sm:pr-2">
          <span className="rotate-180 text-xs font-medium [writing-mode:vertical-rl]">Effect on being understood</span>
        </div>
        <div className="flex flex-col justify-between py-3 pr-2 text-right text-xs">
          <span>High</span>
          <span>Low</span>
        </div>

        {/* plot area: the left and bottom borders are the axes */}
        <div className="relative border-b-2 border-l-2 border-muted-foreground/50 pt-3 pr-3 pb-2 pl-2">
          <AxisArrow className="top-0 left-[-1px] -translate-x-1/2 -translate-y-1/2" />
          <AxisArrow className="right-0 bottom-[-1px] translate-x-1/2 translate-y-1/2 rotate-90" />
          <div className="grid grid-cols-2 gap-1.5 text-foreground sm:gap-2">
            {quadrants.map((q) => (
              <section
                key={q.title}
                aria-label={q.title}
                className={cn(
                  "rounded-lg border bg-card p-3 sm:p-4",
                  q.tone === "easy-start" && "border-2 border-chart-1 bg-chart-1/10",
                )}
              >
                <h3 className="text-sm font-semibold sm:text-base">{q.title}</h3>
                <ul className="mt-2 space-y-1.5 text-sm sm:mt-3 sm:space-y-2 sm:text-base">
                  {q.items.map((item) => (
                    <li key={item.label} className={cn("flex gap-2", q.tone === "skip" && "text-muted-foreground")}>
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1.5 size-2.5 shrink-0 rounded-full sm:mt-2",
                          q.tone === "easy-start" ? "bg-chart-1" : "bg-muted-foreground/40",
                        )}
                      />
                      {item.href ? (
                        <Link href={item.href} className="underline-offset-4 hover:text-primary hover:underline">
                          <Letters text={item.label} />
                        </Link>
                      ) : (
                        <span><Letters text={item.label} /></span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        {/* x axis: Easier/Harder ticks, then title */}
        <div className="col-start-3 flex justify-between px-2 pt-1.5 text-xs">
          <span>Easier to learn</span>
          <span>Harder to learn</span>
        </div>
        <div className="col-start-3 pt-1 text-center text-xs font-medium">Effort for a Kinyarwanda speaker</div>
      </div>
    </Figure>
  );
}

/* 2. Practise a clear t ---------------------------------------------------------------- */

export function TRuleFlow() {
  const steps = ["Listen", "Stop the air with your tongue", "Release and repeat"];
  return (
    <Figure title={figureText.tRule.title} caption={figureText.tRule.caption}>
      <ol className="mx-auto flex max-w-lg flex-col items-center gap-2">
        {steps.map((step, i) => (
          <li key={step} className="flex w-full flex-col items-center gap-2">
            {i > 0 && <ArrowDown className="size-4 text-muted-foreground" aria-hidden />}
            <div className="flex w-full items-center justify-center gap-1 rounded-lg border border-primary/40 bg-accent/50 px-4 py-3 text-center font-medium">
              {step}
              {i === 0 && <Listen src={clipSrc("gb", "snd-t")} label="t" className="-my-1" />}
            </div>
          </li>
        ))}
      </ol>
    </Figure>
  );
}

/* 3. Stress in -teen and -ty numbers ------------------------------------------------------ */

export function TeenTyStress() {
  return (
    <Figure
      title={figureText.teenTy.title}
      caption={figureText.teenTy.caption}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {stressPairs.map((pair) => (
          <div key={pair[0].n} className="grid grid-cols-[auto_1fr] items-end gap-x-3 rounded-lg bg-muted/40 px-3 py-1">
            {pair.map((num, row) => (
              <Fragment key={num.n}>
                {row > 0 && <div className="col-span-2 border-t" aria-hidden />}
                <span className="flex gap-1.5 pb-3.5 text-sm">
                  <span className="tabular-nums text-muted-foreground">{num.n}</span>
                  <span className="font-medium">{num.word}</span>
                </span>
                <span className="flex items-end gap-1.5 py-2 pt-4">
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
                          stressed && s.endsWith("iin") && "min-w-16",
                        )}
                      >
                        {s}
                      </span>
                    );
                  })}
                </span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </Figure>
  );
}

/* 4. The r you don't say ------------------------------------------------------------------ */

export function SilentR() {
  return (
    <Figure title={figureText.silentR.title} caption={figureText.silentR.caption}>
      <ul className="grid grid-cols-[auto_auto_1fr] items-center gap-x-6 divide-y border-t">
        {silentRWords.map((w) => (
          <li key={w.word} className="col-span-3 grid grid-cols-subgrid items-center py-2 pl-2">
            <span className="text-lg font-medium" aria-label={`${w.word}, written with a silent r`}>
              {w.word.split(/(r)/).map((part, i) =>
                part === "r" ? (
                  <span key={i} className="font-sound text-[1.1em] text-muted-foreground line-through decoration-2">
                    r
                  </span>
                ) : (
                  part
                ),
              )}
            </span>
            <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
            <span className="flex items-center text-lg">
              <Respell text={w.british} />
              {w.endsInVowel && (
                <span className="ml-2 text-chart-1" aria-label="ends in a vowel">
                  ●
                </span>
              )}
              <Listen src={clipSrc("gb", w.id)} label={w.word} className="ml-1" />
            </span>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

/* 5. Kinyarwanda sounds as starting points ----------------------------------------------- */

/** Rows of English sounds, each pointing at the Kinyarwanda sound closest to it. */
function StartingPoints({ text, sounds, landings }: { text: { title: string; caption: string }; sounds: string[]; landings: Landing[] }) {
  const columns = { gridTemplateColumns: `repeat(${sounds.length}, minmax(0, 1fr))` };
  return (
    <Figure title={text.title} caption={text.caption}>
      <div className="space-y-3">
        <div className="grid gap-2 sm:ml-[14rem]" style={columns}>
          {sounds.map((v) => (
            <div key={v} className="rounded-md border bg-muted/50 py-2 text-center text-lg font-semibold">
              {v}
            </div>
          ))}
        </div>
        {landings.map((l) => (
          <div key={l.label} className="grid gap-2 sm:grid-cols-[13.5rem_1fr] sm:items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              {l.label}
              {l.clip && <Listen src={clipSrc("gb", l.clip)} label={`the sound in ${l.label}`} className="-my-1" />}
              <ArrowRight className="size-4 text-muted-foreground max-sm:hidden" aria-hidden />
            </div>
            <div className="grid gap-2" style={columns}>
              {sounds.map((v) => (
                <div
                  key={v}
                  className={cn(
                    "h-8 rounded-md",
                    v === l.sound
                      ? l.tone === "good"
                        ? "bg-good text-background"
                        : "bg-muted-foreground/40"
                      : "border border-dashed",
                  )}
                  aria-hidden={v !== l.sound}
                >
                  {v === l.sound && <span className="sr-only">rough starting point: {v}</span>}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground sm:col-start-2">
              <Letters text={l.note} />
            </p>
          </div>
        ))}
      </div>
    </Figure>
  );
}

export function VowelMap() {
  return <StartingPoints text={figureText.vowelMap} sounds={kinyaVowels} landings={vowelLandings} />;
}

export function LetterUMap() {
  return <StartingPoints text={figureText.letterU} sounds={kinyaVowels} landings={letterULandings} />;
}

export function TStartMap() {
  return <StartingPoints text={figureText.tStart} sounds={kinyaConsonants} landings={tLandings} />;
}
