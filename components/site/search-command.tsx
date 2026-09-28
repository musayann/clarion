"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Search, Type } from "lucide-react";

import { Respell } from "@/components/respell";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { flatNav } from "@/content/nav";
import type { IndexEntry } from "@/lib/word-index";

export function SearchCommand({ words }: { words: IndexEntry[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping(e))) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        aria-label="Search words and pages"
        className="size-9 gap-2 px-0 text-muted-foreground sm:w-64 sm:justify-start sm:px-2.5"
      >
        <Search aria-hidden />
        <span className="hidden truncate sm:inline">Search words and pages</span>
        <kbd className="ml-auto hidden rounded border bg-muted px-1.5 font-mono text-[10px] sm:inline">⌘K</kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search the guide"
        description="Find a word or a page"
      >
        <CommandInput placeholder="Type a word, e.g. water" value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>
            No match. <button className="text-primary underline" onClick={() => go(`/words?q=${encodeURIComponent(query)}`)}>Open the word finder</button>
          </CommandEmpty>
          <CommandGroup heading="Words">
            {words.map((w) => (
              <CommandItem
                key={`${w.id}-${w.group}`}
                value={`${w.word} ${w.id} ${w.group}`}
                keywords={[w.sectionTitle]}
                onSelect={() => go(w.href)}
              >
                <Type aria-hidden />
                <span className="font-medium">{w.word}</span>
                {w.british && w.british !== w.word && (
                  <span className="text-muted-foreground">
                    <Respell text={w.british} />
                  </span>
                )}
                <span className="ml-auto truncate text-xs text-muted-foreground">{w.sectionTitle}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Pages">
            {flatNav.map((p) => (
              <CommandItem key={p.href} value={`page ${p.title}`} onSelect={() => go(p.href)}>
                <FileText aria-hidden />
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function isTyping(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  return !!t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));
}
