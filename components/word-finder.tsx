"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Listen } from "@/components/listen";
import { Respell } from "@/components/respell";
import { Input } from "@/components/ui/input";
import type { IndexEntry } from "@/lib/word-index";

type Entry = IndexEntry & { srcGB?: string; srcUS?: string };

export function WordFinder({ entries }: { entries: Entry[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = params.get("q") ?? "";

  const setQuery = (q: string) => {
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    else next.delete("q");
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a word, e.g. water"
          aria-label="Filter words"
          className="h-11 pl-9 text-base"
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
        {count} {count === 1 ? "word" : "words"}
      </p>

      {sections.map(([title, list]) => (
        <section key={title} className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
          <ul className="divide-y rounded-xl border bg-card">
            {list.map((e) => (
              <li key={`${e.id}-${e.group}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5">
                <span className="min-w-28 text-base font-medium">{e.word}</span>
                <span className="inline-flex items-center gap-1">
                  {e.british && e.british !== e.word && <Respell text={e.british} />}
                  <Listen src={e.srcGB} label={e.word} />
                </span>
                {e.american && (
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    US <Respell text={e.american} />
                    <Listen src={e.srcUS} label={e.word} accent="us" />
                  </span>
                )}
                <Link href={e.href} className="ml-auto text-xs text-primary underline-offset-4 hover:underline">
                  {e.group}
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
