/**
 * Fails when a data item has no clip, a clip is out of date, or a clip file is orphaned.
 * Runs before `next build`. Set SKIP_AUDIO_CHECK=1 to build before audio exists.
 */
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import { allClips, clipKey } from "../content/data/clips";
import { AUDIO_DIR, clipFile, clipHash, readManifest } from "./audio-shared";

const clips = allClips();
const manifest = readManifest();
const problems: string[] = [];

for (const c of clips) {
  const key = clipKey(c.accent, c.id);
  const entry = manifest[key];
  if (!entry || !existsSync(clipFile(c))) problems.push(`missing  ${key}`);
  else if (entry.hash !== clipHash(c)) problems.push(`stale    ${key}`);
}

const wanted = new Set(clips.map((c) => `${c.accent}/${c.id}.mp3`));
for (const accent of ["gb", "us"]) {
  const dir = path.join(AUDIO_DIR, accent);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!wanted.has(`${accent}/${f}`)) problems.push(`orphan   ${accent}/${f}`);
  }
}

if (problems.length === 0) {
  console.log(`Audio OK: ${clips.length} clips.`);
} else {
  console.log(`Audio check: ${problems.length} problem(s) across ${clips.length} clips. Run \`pnpm audio\` to fix.`);
  console.log(problems.slice(0, 20).map((p) => `  ${p}`).join("\n"));
  if (problems.length > 20) console.log(`  … and ${problems.length - 20} more`);
  if (process.env.SKIP_AUDIO_CHECK === "1") {
    console.log("SKIP_AUDIO_CHECK=1, continuing anyway.");
  } else {
    process.exit(1);
  }
}
