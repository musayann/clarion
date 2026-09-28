import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import type { BlockContent, Nodes, PhrasingContent, Root, RootContent } from "mdast";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

import { calloutTitle, type CalloutVariant } from "@/components/callout";
import { flatNav, nav, ruleHref, rules } from "@/content/nav";
import { buildWordIndex, wordFinderDescription } from "@/lib/word-index";
import { absoluteUrl, markdownHref, siteDescription, siteName } from "@/lib/site";

import { audio, blocks, mdLink, table } from "./blocks";

/*
 * Markdown versions of every page, for AI agents and LLMs (served as /<page>.md, /llms.txt, /llms-full.txt).
 * MDX pages are parsed and their components replaced with markdown built from the same data;
 * the two TSX pages (home and the word finder) have builders here.
 */

type Props = Record<string, string | boolean | undefined>;
type JsxElement = Extract<RootContent, { type: "mdxJsxFlowElement" | "mdxJsxTextElement" }>;

const parseMarkdown = (md: string) => unified().use(remarkParse).use(remarkGfm).parse(md).children;

const stringify = (root: Root) =>
  unified()
    .use(remarkGfm, { tablePipeAlign: false })
    .use(remarkStringify, { bullet: "-", emphasis: "_", rule: "-" })
    .stringify(root);

function props(node: JsxElement): Props {
  const out: Props = {};
  for (const attr of node.attributes) {
    if (attr.type !== "mdxJsxAttribute") continue;
    if (attr.value === null || attr.value === undefined) out[attr.name] = true;
    else if (typeof attr.value === "string") out[attr.name] = attr.value;
    else out[attr.name] = attr.value.value === "true" ? true : attr.value.value === "false" ? false : attr.value.value;
  }
  return out;
}

const text = (value: string): PhrasingContent => ({ type: "text", value });

function jsx(node: JsxElement): RootContent[] {
  const p = props(node);
  const children = transform(node.children as RootContent[]);
  switch (node.name) {
    case "PageHeader":
      return [{ type: "heading", depth: 1, children: [text(String(p.title))] }, ...children];
    case "Callout": {
      const title = typeof p.title === "string" ? p.title : calloutTitle(p.variant as CalloutVariant | undefined);
      const label: BlockContent = { type: "paragraph", children: [{ type: "strong", children: [text(`${title}:`)] }] };
      return [{ type: "blockquote", children: [label, ...(children as BlockContent[])] }];
    }
    case "Sp":
      return [{ type: "emphasis", children: children as PhrasingContent[] }];
    case "Hear":
      return parseMarkdown(audio(p.accent === "us" ? "us" : "gb", String(p.id), String(p.label))).flatMap((n) =>
        "children" in n ? (n.children as RootContent[]) : [n],
      );
  }
  const block = node.name && blocks[node.name];
  if (!block) throw new Error(`No markdown version of <${node.name}>: add one in lib/markdown/blocks.ts`);
  return parseMarkdown(block(p));
}

/** Site links become absolute, and point at the markdown version when there is one. */
function absoluteLink(url: string): string {
  if (!url.startsWith("/")) return url;
  const pathname = url.split("#")[0];
  return flatNav.some((i) => i.href === pathname) ? absoluteUrl(markdownHref(pathname)) : absoluteUrl(url);
}

/** Drops ESM and expressions, swaps JSX components for plain markdown, and makes links absolute. */
function transform(nodes: RootContent[]): RootContent[] {
  return nodes.flatMap((node): RootContent[] => {
    switch (node.type) {
      case "mdxjsEsm":
      case "mdxFlowExpression":
      case "mdxTextExpression":
        return [];
      case "mdxJsxFlowElement":
      case "mdxJsxTextElement":
        return jsx(node);
      case "link":
        node.url = absoluteLink(node.url);
    }
    if ("children" in node) (node as Extract<Nodes, { children: unknown }>).children = transform(node.children as RootContent[]) as never;
    return [node];
  });
}

async function mdxToMarkdown(file: string): Promise<{ root: Root; esm: string }> {
  // Only runs at build time (every markdown route is prerendered), so skip output file tracing.
  const source = await readFile(path.join(/*turbopackIgnore: true*/ process.cwd(), file), "utf8");
  const tree = unified().use(remarkParse).use(remarkMdx).use(remarkGfm).parse(source);
  const esm = tree.children.flatMap((n) => (n.type === "mdxjsEsm" ? [n.value] : [])).join("\n");
  return { root: { type: "root", children: transform(tree.children) }, esm };
}

/** Reads a string field such as `description: "…"` from an MDX page's metadata export. */
function metadataField(esm: string, key: string): string | undefined {
  const match = esm.match(new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  return match ? JSON.parse(`"${match[1]}"`) : undefined;
}

export type PageMarkdown = { href: string; title: string; description: string; markdown: string };

function home(): Omit<PageMarkdown, "href"> {
  const quickWins = rules.filter((r) => r.quickWin).map((r) => r.number);
  const md = `# An English pronunciation guide for Kinyarwanda speakers

Kinyarwanda treats _r_ and _l_ as one sound, so English words like right and light, or grass and glass, can sound the same. Copying an American accent makes it worse: the American _t_ sounds like the Kinyarwanda _r_, so writing is heard as riding.

This guide teaches the ${mdLink("/guide/clarity-not-accent", "Standard English")} version of each sound, the one that is easiest for Kinyarwanda speakers to say clearly, in six short rules with audio for every example.

## How to use this guide

1. **Start with the quick wins:** rules ${quickWins.slice(0, -1).join(", ")} and ${quickWins.at(-1)}. Each is one change you can make this week.
2. **Practise rules 3 and 4 every day** for 3 minutes each, using the ${mdLink("/daily-practice", "daily routine")}.
3. **Say the Standard English version, not the American one.** Some speakers lose clarity when they copy unfamiliar accent features, such as a tapped t. Standard English gives you a clear alternative. See ${mdLink("/guide/which-style", "Which style to use")}.

## The six rules

${rules.map((r) => `- ${mdLink(ruleHref(r.slug), `Rule ${r.number}: ${r.title}`)} (${r.quickWin ? "quick win" : "daily practice"}): ${r.summary}`).join("\n")}

${blocks.EffectEffortChart({})}

## Reference

${nav.at(-1)!.items.map((i) => `- ${mdLink(i.href, i.title)}`).join("\n")}
`;
  return { title: siteName, description: siteDescription, markdown: md };
}

function words(): Omit<PageMarkdown, "href"> {
  const bySection = new Map<string, ReturnType<typeof buildWordIndex>>();
  for (const e of buildWordIndex()) bySection.set(e.sectionTitle, [...(bySection.get(e.sectionTitle) ?? []), e]);
  const sections = [...bySection].map(
    ([title, entries]) =>
      `## ${title}\n\n${table(
        ["Word", "Say this (Standard English)", "Recognise, don't copy (American)", "Where"],
        entries.map((e) => [
          e.word,
          [e.british && e.british !== e.word ? e.british : "", audio("gb", e.id)].filter(Boolean).join(" "),
          e.american ? [e.american, audio("us", e.id)].filter(Boolean).join(" ") : "",
          `[${e.group}](${absoluteUrl(e.href)})`,
        ]),
      )}`,
  );
  const md = `# Word finder

Every word in the guide in one place. Copy the Standard English form; the American form is there so you recognise it, not to copy. Stressed syllables are in bold.

${sections.join("\n\n")}
`;
  return { title: "Word finder", description: wordFinderDescription, markdown: md };
}

async function mdxPage(href: string): Promise<Omit<PageMarkdown, "href">> {
  const rule = rules.find((r) => ruleHref(r.slug) === href);
  if (rule) {
    const { root } = await mdxToMarkdown(`content/rules/${rule.slug}.mdx`);
    const title = `Rule ${rule.number}: ${rule.title}`;
    const intro = `# ${title}\n\n${rule.quickWin ? "Quick win. " : ""}Rule ${rule.number} of 6.\n\n> **The rule:** ${rule.summary}\n\n`;
    return { title, description: rule.summary, markdown: intro + stringify(root) };
  }
  const { root, esm } = await mdxToMarkdown(`app/(docs)${href}/page.mdx`);
  return {
    title: metadataField(esm, "title") ?? href,
    description: metadataField(esm, "description") ?? "",
    markdown: stringify(root),
  };
}

function footer(href: string): string {
  const i = flatNav.findIndex((item) => item.href === href);
  const prev = flatNav[i - 1];
  const next = flatNav[i + 1];
  return [
    "---",
    "",
    `From ${siteName}: ${absoluteUrl(href)}`,
    "",
    [prev && `Previous: ${mdLink(prev.href, prev.title)}`, next && `Next: ${mdLink(next.href, next.title)}`, `All pages: ${absoluteUrl("/llms.txt")}`]
      .filter(Boolean)
      .join(" · "),
  ].join("\n");
}

/** The markdown version of a nav page, or null when the href isn't a page in the guide. */
export async function pageMarkdown(href: string): Promise<PageMarkdown | null> {
  if (!flatNav.some((item) => item.href === href)) return null;
  const page = href === "/" ? home() : href === "/words" ? words() : await mdxPage(href);
  return { ...page, href, markdown: `${page.markdown.trimEnd()}\n\n${footer(href)}\n` };
}

export async function allPagesMarkdown(): Promise<PageMarkdown[]> {
  return Promise.all(flatNav.map((item) => pageMarkdown(item.href) as Promise<PageMarkdown>));
}

/** Index in the llms.txt format (https://llmstxt.org). */
export async function llmsTxt(): Promise<string> {
  const pages = new Map((await allPagesMarkdown()).map((p) => [p.href, p]));
  const sections = nav.map(
    (s) =>
      `## ${s.title}\n\n${s.items.map((i) => `- ${mdLink(i.href, i.title)}: ${pages.get(i.href)!.description}`).join("\n")}`,
  );
  return `# ${siteName}

> ${siteDescription}

The goal is to be understood the first time, not a particular accent. A few sounds cause most misunderstandings, such as a tapped t that sounds like the Kinyarwanda r, so the guide teaches the Standard English version of each sound: the clearest for Kinyarwanda speakers. Sound spellings mark the stressed syllable in **bold**; audio links are MP3 clips (Standard English and, where shown, American).

Every page is available as markdown: add \`.md\` to its URL (\`/index.md\` for the home page), or request the page with \`Accept: text/markdown\`. The whole guide in one file: ${absoluteUrl("/llms-full.txt")}

${sections.join("\n\n")}
`;
}

export async function llmsFullTxt(): Promise<string> {
  const pages = await allPagesMarkdown();
  return `# ${siteName}\n\n> ${siteDescription}\n\n${pages.map((p) => p.markdown.trimEnd()).join("\n\n")}\n`;
}
