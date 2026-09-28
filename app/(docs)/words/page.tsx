import { Suspense } from "react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { WordFinder, WordFinderView } from "@/components/word-finder";
import { clipSrc } from "@/lib/audio";
import { pageMetadata } from "@/lib/site";
import { buildWordIndex, wordFinderDescription } from "@/lib/word-index";

export const metadata: Metadata = pageMetadata({
  title: "Word finder",
  description: wordFinderDescription,
  href: "/words",
});

export default function WordsPage() {
  const entries = buildWordIndex().map((e) => ({
    ...e,
    srcGB: clipSrc("gb", e.id),
    srcUS: e.american ? clipSrc("us", e.id) : undefined,
  }));

  return (
    <>
      <PageHeader eyebrow="Reference" title="Word finder">
        Every word in the guide in one place. Type to filter, tap 🔊 to listen, and follow the link to the rule it belongs
        to. Copy the green ✓ Standard English form; the red ✗ American form is there so you recognise it, not to copy.
      </PageHeader>
      <Suspense fallback={<WordFinderView entries={entries} query="" />}>
        <WordFinder entries={entries} />
      </Suspense>
    </>
  );
}
