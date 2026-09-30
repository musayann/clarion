# Clarion

Built with Next.js (App Router, MDX), Tailwind CSS and shadcn/ui. Every page is statically generated.

## Develop

```bash
pnpm install
pnpm dev
```

## Where things live

| Path | What |
| --- | --- |
| `content/data/*.ts` | Word lists, minimal pairs, sentences and comparison tables. They are the single source for the tables, the audio and the word finder. |
| `content/rules/*.mdx` | Text for each rule page (`app/(docs)/rules/[slug]`) |
| `app/(docs)/**/page.mdx` | The other guide pages |
| `content/nav.ts` | Rule titles and summaries, sidebar order, prev/next |
| `components/word-tables.tsx` | `WordTable`, `PairTable`, `WordList`, `PracticeSentences` … which are available in every MDX file |
| `components/figures/` | The diagrams (their data is in `components/figures/data.ts`) |
| `lib/site.ts` | Site URL, name, and `pageMetadata()` for canonical, Open Graph and markdown-alternate tags |
| `lib/markdown/` | Markdown versions of every page, for AI agents |
| `public/audio/{gb,us}/*.mp3` | Generated audio clips, committed |

## Audio

The clips are generated once with Google Cloud Text-to-Speech and committed. They are never generated at build time or at runtime.

```bash
cp .env.sample .env                         # then set GOOGLE_TTS_API_KEY, or use gcloud:
gcloud auth application-default login      # or set GOOGLE_APPLICATION_CREDENTIALS
pnpm audio                                  # generate new or changed clips
pnpm audio --report                         # also write audio-review.html to listen through
pnpm audio --only t-water                   # regenerate one id
pnpm audio --force                          # regenerate everything
pnpm audio:check                            # verify every item has an up-to-date clip
```

- When a clip doesn't match the guide's sound spelling, add or fix `ipa` (or `ipaUS`) on that item in `content/data` and regenerate it. The IPA is sent to the voice as an SSML `<phoneme>`.
- Configuration is read from the environment, or from `.env.local` / `.env` in the project root (see `.env.sample`). Auth is `GOOGLE_TTS_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`, or gcloud application-default credentials.
- The voices are `en-GB-Neural2-B` and `en-US-Neural2-D` at speaking rate 0.8. Override them with `TTS_VOICE_GB`, `TTS_VOICE_US` or `TTS_SPEAKING_RATE`. Changing any of these marks the affected clips stale.
- `pnpm build` runs the audio check first and fails if a clip is missing or stale. `SKIP_AUDIO_CHECK=1` bypasses the check.

## SEO and AI agents

- Every page gets a canonical URL, Open Graph and Twitter tags through `pageMetadata()` in `lib/site.ts`. Use it for any new page. Share images come from `app/opengraph-image.tsx`, plus one per rule.
- JSON-LD: `WebSite` and `Course` on the home page, `LearningResource` on rule pages, and `BreadcrumbList` on every docs page (`components/json-ld.tsx`).
- `/llms.txt` indexes the guide and `/llms-full.txt` holds all of it in one file. Every page is also served as markdown at `/<page>.md` (`/index.md` for home), or at its normal URL when requested with `Accept: text/markdown`. The rewrites are in `next.config.ts`.
- The markdown comes from the same sources as the HTML: `lib/markdown` parses each MDX page and replaces every component with markdown built from `content/data`. When you add an MDX component, add its markdown version to `lib/markdown/blocks.ts`. The build fails until you do.

## Deploy

This is a standard Next.js app on Vercel. Set `NEXT_PUBLIC_SITE_URL` so canonical, sitemap, Open Graph, JSON-LD and llms.txt URLs are absolute.
