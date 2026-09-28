import "server-only";

import manifest from "@/content/data/audio-manifest.json";
import type { Accent } from "@/content/data/types";

const entries = manifest as Record<string, { src: string; hash: string } | undefined>;

/** URL of a generated clip, versioned by its hash so CDN caches refresh when it changes. */
export function clipSrc(accent: Accent, id: string): string | undefined {
  const entry = entries[`${accent}/${id}`];
  if (!entry) {
    if (process.env.NODE_ENV === "development") console.warn(`[audio] no clip for ${accent}/${id}`);
    return undefined;
  }
  return `${entry.src}?v=${entry.hash}`;
}
