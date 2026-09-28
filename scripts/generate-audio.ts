/**
 * Generates an MP3 for every word, pair item and sentence in content/data
 * using Google Cloud Text-to-Speech, and writes content/data/audio-manifest.json.
 *
 *   pnpm audio                 generate new and changed clips
 *   pnpm audio --force         regenerate everything
 *   pnpm audio --only t-water  regenerate one id (both accents)
 *   pnpm audio --report        also write audio-review.html for a listen-through
 *
 * Auth: GOOGLE_TTS_API_KEY, GOOGLE_APPLICATION_CREDENTIALS, or
 * `gcloud auth application-default login`. Set them in .env (see .env.sample).
 */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { TextToSpeechClient } from "@google-cloud/text-to-speech";

import { allClips, clipKey, type Clip } from "../content/data/clips";
import {
  AUDIO_DIR,
  MANIFEST_PATH,
  ROOT,
  SPEAKING_RATE,
  VOICES,
  clipFile,
  clipHash,
  clipSrc,
  readManifest,
  type Manifest,
} from "./audio-shared";

const args = process.argv.slice(2);
const force = args.includes("--force");
const report = args.includes("--report");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : undefined;

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function toSsml(c: Clip): string {
  if (c.ssml) return `<speak>${c.ssml}</speak>`;
  const body = c.ipa
    ? `<phoneme alphabet="ipa" ph="${escapeXml(c.ipa)}">${escapeXml(c.text)}</phoneme>`
    : escapeXml(c.text);
  return `<speak>${body}</speak>`;
}

async function main() {
  const clips = allClips();
  const manifest: Manifest = readManifest();
  const next: Manifest = {};
  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  const client = new TextToSpeechClient(apiKey ? { apiKey } : {});

  const todo = clips.filter((c) => {
    const key = clipKey(c.accent, c.id);
    const hash = clipHash(c);
    const stale = manifest[key]?.hash !== hash || !existsSync(clipFile(c));
    const selected = only ? c.id === only : force || stale;
    if (!selected) next[key] = manifest[key];
    return selected;
  });

  console.log(`${clips.length} clips, ${todo.length} to generate.`);

  const queue = [...todo];
  let done = 0;
  const worker = async () => {
    for (let c = queue.shift(); c; c = queue.shift()) {
      const [res] = await client.synthesizeSpeech({
        input: { ssml: toSsml(c) },
        voice: VOICES[c.accent],
        audioConfig: { audioEncoding: "MP3", speakingRate: SPEAKING_RATE, sampleRateHertz: 24000 },
      });
      if (!res.audioContent) throw new Error(`No audio returned for ${clipKey(c.accent, c.id)}`);
      mkdirSync(path.dirname(clipFile(c)), { recursive: true });
      writeFileSync(clipFile(c), res.audioContent as Uint8Array);
      next[clipKey(c.accent, c.id)] = { src: clipSrc(c), hash: clipHash(c) };
      done++;
      process.stdout.write(`\r${done}/${todo.length} ${clipKey(c.accent, c.id)}`.padEnd(60));
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));
  if (todo.length) process.stdout.write("\n");

  // Remove clips whose data item no longer exists.
  const wanted = new Set(clips.map((c) => `${c.accent}/${c.id}.mp3`));
  for (const accent of ["gb", "us"]) {
    const dir = path.join(AUDIO_DIR, accent);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (!wanted.has(`${accent}/${f}`)) {
        rmSync(path.join(dir, f));
        console.log(`Removed orphan ${accent}/${f}`);
      }
    }
  }

  const sorted = Object.fromEntries(
    Object.entries(next)
      .filter(([, v]) => v)
      .sort(([a], [b]) => a.localeCompare(b)),
  );
  writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`Wrote ${path.relative(ROOT, MANIFEST_PATH)}`);

  if (report) writeReport(clips);
}

function writeReport(clips: Clip[]) {
  const rows = clips
    .map(
      (c) => `<tr><td><code>${c.accent}/${c.id}</code></td><td>${escapeXml(c.text)}</td><td>${c.ipa ? `/${escapeXml(c.ipa)}/` : ""}</td><td><audio controls preload="none" src="public${clipSrc(c)}"></audio></td></tr>`,
    )
    .join("\n");
  const html = `<!doctype html><meta charset="utf-8"><title>Audio review</title>
<style>body{font:14px system-ui;margin:2rem}td{padding:4px 8px;border-bottom:1px solid #ddd}</style>
<h1>Audio review (${clips.length} clips)</h1>
<p>Listen through each clip. If one doesn't match the guide's sound spelling, add or fix its ipaGB / ipaUS in content/data and run <code>pnpm audio --only &lt;id&gt;</code>.</p>
<table>${rows}</table>`;
  const out = path.join(ROOT, "audio-review.html");
  writeFileSync(out, html);
  console.log(`Wrote ${path.relative(ROOT, out)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
