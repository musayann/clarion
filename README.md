# Clear English

A reference site for Rwandans on clear Standard English pronunciation, as heard on the BBC World Service and in dictionary 'UK' audio. It covers six rules, everyday words that differ, the American habits to recognise, and standard British spelling, with audio for every example. The source text is `content.md`.

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
| `components/figures/` | The diagrams |
| `public/audio/{gb,us}/*.mp3` | Generated audio clips, committed |

## Audio

The clips are generated once with Google Cloud Text-to-Speech and committed. They are never generated at build time or at runtime.

```bash
gcloud auth application-default login      # or set GOOGLE_APPLICATION_CREDENTIALS
pnpm audio                                  # generate new or changed clips
pnpm audio --report                         # also write audio-review.html to listen through
pnpm audio --only t-water                   # regenerate one id
pnpm audio --force                          # regenerate everything
pnpm audio:check                            # verify every item has an up-to-date clip
```

- When a clip doesn't match the guide's sound spelling, add or fix `ipaGB` (or `ipaUS`) on that item in `content/data` and regenerate it. The IPA is sent to the voice as an SSML `<phoneme>`.
- The voices are `en-GB-Neural2-B` and `en-US-Neural2-D`. Override them with `TTS_VOICE_GB` or `TTS_VOICE_US`.
- `pnpm build` runs the audio check first and fails if a clip is missing or stale. `SKIP_AUDIO_CHECK=1` bypasses the check.

## Deploy

This is a standard Next.js app on Vercel. Set `NEXT_PUBLIC_SITE_URL` so the sitemap and Open Graph URLs are absolute.
