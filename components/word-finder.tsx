"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleCheck, Ear, Search } from "lucide-react";

import { Listen } from "@/components/listen";
import { Letters, Respell } from "@/components/respell";
import { Input } from "@/components/ui/input";
import type { IndexEntry } from "@/lib/word-index";

type Entry = IndexEntry & { srcGB?: string; srcUS?: string };

/** Keeps the filter in ?q= so a search can be shared and linked to. */
export function WordFinder({ entries }: { entries: Entry[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setQuery = (q: string) => {
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    else next.delete("q");
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  return <WordFinderView entries={entries} query={params.get("q") ?? ""} onQueryChange={setQuery} />;
}

/**
 * The search box and word list. Rendered with an empty query as the prerendered fallback,
 * so the full list is in the static HTML for crawlers and agents.
 */
export function WordFinderView({
  entries,
  query,
  onQueryChange,
}: {
  entries: Entry[];
  query: string;
  onQueryChange?: (q: string) => void;
}) {
  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q ? entries.filter((e) => e.word.toLowerCase().includes(q)) : entries;
    const bySection = new Map<string, Entry[]>();
    for (const e of matches) {
      const list = bySection.get(e.sectionTitle) ?? [];
      list.push(e);
      bySection.set(e.sectionTitle, list);
    }
    return [...bySection.entries()];
  }, [entries, query]);

  const count = sections.reduce((n, [, list]) => n + list.length, 0);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          placeholder="Type a word, e.g. water"
          aria-label="Filter words"
          className="h-11 pl-9 text-base"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span aria-live="polite">
          {count} {count === 1 ? "word" : "words"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CircleCheck className="size-3.5 text-good" aria-hidden />
          Say this (Standard English)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Ear className="size-3.5" aria-hidden />
          Also heard (American)
        </span>
      </div>

      {sections.map(([title, list]) => (
        <section key={title} className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"><Letters text={title} /></h2>
          <ul className="divide-y rounded-xl border bg-card">
            {list.map((e) => (
              <li key={`${e.id}-${e.group}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5">
                <span className="min-w-28 text-base font-medium">{e.word}</span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-good-soft/40 py-0.5 pr-0.5 pl-2">
                  <CircleCheck className="size-3.5 shrink-0 text-good" aria-label="Say this" />
                  {e.british && e.british !== e.word && <Respell text={e.british} />}
                  <Listen src={e.srcGB} label={e.word} />
                </span>
                {e.american && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 py-0.5 pr-0.5 pl-2 text-sm text-muted-foreground">
                    <Ear className="size-3.5 shrink-0" aria-label="Also heard (American)" />
                    <Respell text={e.american} />
                    <Listen src={e.srcUS} label={e.word} accent="us" />
                  </span>
                )}
                <Link href={e.href} className="ml-auto text-xs text-primary underline-offset-4 hover:underline">
                  <Letters text={e.group} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {count === 0 && (
        <p className="mt-8 rounded-xl border border-dashed p-6 text-center text-muted-foreground">
          “{query}” isn&apos;t in the guide yet. Try the{" "}
          <a
            className="text-primary underline"
            href={`https://dictionary.cambridge.org/pronunciation/english/${encodeURIComponent(query.trim().toLowerCase())}`}
            target="_blank"
            rel="noreferrer"
          >
            Cambridge Dictionary
          </a>{" "}
          for UK audio.
        </p>
      )}
    </div>
  );
}
