import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { Clip } from "../content/data/clips";
import type { Accent } from "../content/data/types";

export const ROOT = path.resolve(import.meta.dirname, "..");

// Load .env.local then .env (see .env.sample). Variables already set in the shell win.
for (const file of [".env.local", ".env"]) {
  const envPath = path.join(ROOT, file);
  if (existsSync(envPath)) process.loadEnvFile(envPath);
}
export const AUDIO_DIR = path.join(ROOT, "public", "audio");
export const MANIFEST_PATH = path.join(ROOT, "content", "data", "audio-manifest.json");

export type ManifestEntry = { src: string; hash: string };
export type Manifest = Record<string, ManifestEntry>;

export const VOICES: Record<Accent, { languageCode: string; name: string }> = {
  gb: { languageCode: "en-GB", name: process.env.TTS_VOICE_GB ?? "en-GB-Neural2-B" },
  us: { languageCode: "en-US", name: process.env.TTS_VOICE_US ?? "en-US-Neural2-D" },
};

export const SPEAKING_RATE = Number(process.env.TTS_SPEAKING_RATE ?? 0.9);

export const clipFile = (c: Pick<Clip, "accent" | "id">) =>
  path.join(AUDIO_DIR, c.accent, `${c.id}.mp3`);

export const clipSrc = (c: Pick<Clip, "accent" | "id">) => `/audio/${c.accent}/${c.id}.mp3`;

/** Changes whenever anything that affects the sound changes, so stale clips are regenerated. */
export function clipHash(c: Clip): string {
  const input = JSON.stringify({ text: c.text, ipa: c.ipa ?? null, voice: VOICES[c.accent].name, rate: SPEAKING_RATE });
  return createHash("sha1").update(input).digest("hex").slice(0, 12);
}

export function readManifest(): Manifest {
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest;
  } catch {
    return {};
  }
}
