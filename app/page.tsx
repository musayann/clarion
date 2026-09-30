import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ear, Mic, PenLine, Search, Timer } from "lucide-react";

import { EffectEffortChart } from "@/components/figures";
import { course, JsonLd } from "@/components/json-ld";
import { Letters } from "@/components/respell";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { rules } from "@/content/nav";
import { absoluteUrl, pageMetadata, siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ description: siteDescription, href: "/" });

const reference = [
  { href: "/guide/which-style", title: "Which pronunciation to practise", text: "Quick answers for every sound, and how to check.", icon: Ear },
  { href: "/everyday-words", title: "Words that change meaning", text: "writing or riding, right or light, sheep or ship.", icon: Mic },
  { href: "/writing", title: "Writing: one spelling system", text: "Spelling, dates, false friends and idioms.", icon: PenLine },
  { href: "/daily-practice", title: "Daily practice", text: "15 minutes a day covers every rule.", icon: Timer },
  { href: "/words", title: "Word finder", text: "Look up any word in the guide, with audio.", icon: Search },
];

export default function Home() {
  const easyRules = rules.filter((r) => r.easyStart);
  const link = "font-medium text-primary underline underline-offset-4";

  const steps = [
    <>
      <span className="font-medium">Start with the easy ones:</span> rules{" "}
      {easyRules.map((r, i) => (
        <span key={r.slug}>
          {i > 0 && (i === easyRules.length - 1 ? " and " : ", ")}
          <Link href={`/rules/${r.slug}`} className={link}>
            {r.number}
          </Link>
        </span>
      ))}
      . Each is one change you can make this week.
    </>,
    <>
      <span className="font-medium">Practise a little every day</span> with the 15-minute{" "}
      <Link href="/daily-practice" className={link}>
        daily routine
      </Link>
      .
    </>,
    <>
      <span className="font-medium">Practise the Standard English form shown here.</span>{" "}
      <Link href="/guide/which-style" className={link}>
        Which pronunciation to practise
      </Link>{" "}
      has a quick answer for each sound.
    </>,
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: siteName,
              description: siteDescription,
              url: absoluteUrl("/"),
              inLanguage: "en-GB",
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/words")}?q={search_term_string}` },
                "query-input": "required name=search_term_string",
              },
            },
            course,
          ],
        }}
      />
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">Clear English Rwanda</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          An English Pronunciation Guide
          <span className="block text-muted-foreground">For Kinyarwanda Speakers</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-pretty text-muted-foreground">
          This guide focuses on the features of Kinyarwanda pronunciation that, in our experience, most often cause
          misunderstandings when carried into English. The aim is to be easily understood, not to change your accent.
        </p>
        <p className="mt-4 text-lg leading-8 text-pretty text-muted-foreground">
          Each of the six rules explains one feature, with example words and audio in{" "}
          <Link href="/guide/standard-english" className="font-medium text-foreground underline underline-offset-4">
            Standard English
          </Link>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/rules/say-every-t"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85"
          >
            Start with Rule 1 <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/words" className="inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium hover:bg-muted">
            <Search className="size-4" aria-hidden /> Look up a word
          </Link>
        </div>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">How to use this guide</h2>
        <ol className="mt-5 space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {i + 1}
              </span>
              <p className="pt-0.5 leading-7">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">The six rules</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((r) => (
            <Link key={r.slug} href={`/rules/${r.slug}`} className="group">
              <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-accent/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-sm font-bold text-primary">{r.number}</span>
                    {r.easyStart ? (
                      <Badge className="bg-stress text-stress-foreground">Easy start</Badge>
                    ) : (
                      <Badge variant="outline">Daily practice</Badge>
                    )}
                  </div>
                  <CardTitle className="mt-2 text-base group-hover:text-primary"><Letters text={r.title} /></CardTitle>
                  <CardDescription><Letters text={r.summary} /></CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <EffectEffortChart />

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">Reference</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reference.map(({ href, title, text, icon: Icon }) => (
            <Link key={href} href={href} className="group flex gap-3 rounded-xl border p-4 transition-colors hover:border-primary/50 hover:bg-accent/30">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="block font-medium group-hover:text-primary">{title}</span>
                <span className="block text-sm text-muted-foreground">{text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
