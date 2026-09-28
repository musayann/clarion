import { Suspense } from "react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { WordFinder } from "@/components/word-finder";
import { clipSrc } from "@/lib/audio";
import { buildWordIndex } from "@/lib/word-index";

export const metadata: Metadata = {
  title: "Word finder",
  description: "Search every word in the guide: its Standard English sound spelling, the American form, audio and the rule it belongs to.",
};

export default function WordsPage() {
  const entries = buildWordIndex().map((e) => ({
    ...e,
    srcGB: clipSrc("gb", e.id),
    srcUS: e.american ? clipSrc("us", e.id) : undefined,
  }));

  return (
    <>
      <PageHeader eyebrow="Reference" title="Word finder">
        Every word in the guide in one place. Type to filter, tap 🔊 to hear the Standard English pronunciation, and follow
        the link to the rule it belongs to.
      </PageHeader>
      <Suspense>
        <WordFinder entries={entries} />
      </Suspense>
    </>
  );
}
