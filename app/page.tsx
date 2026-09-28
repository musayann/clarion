import Link from "next/link";
import { ArrowRight, BookOpen, Ear, Mic, PenLine, Search, Timer, Zap } from "lucide-react";

import { EffectEffortChart } from "@/components/figures";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { rules } from "@/content/nav";

const reference = [
  { href: "/guide/which-style", title: "Which style to use", text: "Quick answers for every sound, and how to check.", icon: Ear },
  { href: "/everyday-words", title: "Everyday words that differ", text: "address, schedule, tomato, Z and more.", icon: Mic },
  { href: "/recognise-american", title: "Recognise American English", text: "Habits to understand, not copy.", icon: BookOpen },
  { href: "/writing", title: "Writing: one spelling system", text: "Spelling, dates, false friends and idioms.", icon: PenLine },
  { href: "/daily-practice", title: "Daily practice", text: "15 minutes a day covers every rule.", icon: Timer },
  { href: "/words", title: "Word finder", text: "Look up any word in the guide, with audio.", icon: Search },
];

export default function Home() {
  const quickWins = rules.filter((r) => r.quickWin);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">A pronunciation guide for Kinyarwanda speakers</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Clear English
          <span className="block text-muted-foreground">be understood everywhere</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-pretty text-muted-foreground">
          A reference for Rwandans who speak English, are learning it, or want to sound clearer. Six rules, everyday words
          that differ, and audio for every example, all in{" "}
          <Link href="/guide/sound-names#what-standard-english-means" className="font-medium text-foreground underline underline-offset-4">
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
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">How to use this guide</h2>
          <div className="mt-4 space-y-4 leading-7">
            <p className="font-medium">
              This guide has one goal: when you speak English, people understand you the first time. You do not need to
              sound like a native speaker; you need the few sounds that decide whether people understand you.
            </p>
            <p>
              <Link href="/guide/sound-names#what-standard-english-means" className="font-medium text-primary underline underline-offset-4">
                Standard English
              </Link>{" "}
              is the pronunciation used in international English and in standard British English: the English of BBC World
              Service newsreaders and of the &lsquo;UK&rsquo; audio in learner&apos;s dictionaries. It is not a London
              accent or a British street accent: those drop the t in water (&lsquo;wa&apos;er&rsquo;), the opposite of
              Rule 1.
            </p>
            <p>
              Whenever this guide shows an American and a Standard English version of a sound, say the Standard English
              version, and learn to understand the American one. American English is equally correct; this guide follows
              one model so that you learn one consistent set of sounds.
            </p>
            <p>
              For each sound in this guide, the Standard English version is easier for a Kinyarwanda speaker to say without
              being misunderstood. Each rule explains why.
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-stress bg-stress/20 p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Zap className="size-5" aria-hidden /> Quick wins
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Each one is a single change you can make this week.</p>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {quickWins.map((r) => (
              <li key={r.slug}>
                <Link href={`/rules/${r.slug}`} className="group block">
                  <span className="font-medium group-hover:text-primary group-hover:underline">
                    {r.number}. {r.title}
                  </span>
                  <span className="block text-sm text-muted-foreground">{r.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-stress pt-3 text-sm">
            Then practise <Link href="/rules/r-and-l" className="font-medium underline underline-offset-4">Rule 3 (r and l)</Link> and{" "}
            <Link href="/rules/drop-the-r" className="font-medium underline underline-offset-4">Rule 4 (the əə vowel)</Link> for 3 minutes each, every day, using the{" "}
            <Link href="/daily-practice" className="font-medium underline underline-offset-4">daily routine</Link>.
          </p>
        </div>
      </section>

      <EffectEffortChart />

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">The six rules</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((r) => (
            <Link key={r.slug} href={`/rules/${r.slug}`} className="group">
              <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-accent/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-sm font-bold text-primary">{r.number}</span>
                    {r.quickWin ? (
                      <Badge className="bg-stress text-stress-foreground">Quick win</Badge>
                    ) : (
                      <Badge variant="outline">Daily practice</Badge>
                    )}
                  </div>
                  <CardTitle className="mt-2 text-base group-hover:text-primary">{r.title}</CardTitle>
                  <CardDescription>{r.summary}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

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
