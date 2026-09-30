import type { RuleSlug } from "./data/types";

export type Rule = {
  slug: RuleSlug;
  number: number;
  title: string;
  /** The rule in one sentence, shown on cards and at the top of the rule page. */
  summary: string;
  easyStart: boolean;
};

export const rules: Rule[] = [
  {
    slug: "say-every-t",
    number: 1,
    title: "Use a clear *t*",
    summary: "Practise a full *t* in words such as water, better and twenty, so it doesn't sound like d.",
    easyStart: true,
  },
  {
    slug: "thirteen-vs-thirty",
    number: 2,
    title: "Thirteen versus thirty",
    summary: "Stress the end of -teen numbers and the start of -ty numbers.",
    easyStart: true,
  },
  {
    slug: "r-and-l",
    number: 3,
    title: "Keep *r* and *l* apart",
    summary: "*l*: the tongue tip touches the ridge and stays. *r*: keep the tip clear of the ridge and roof of your mouth.",
    easyStart: false,
  },
  {
    slug: "drop-the-r",
    number: 4,
    title: "After a vowel, drop the *r*",
    summary: "Say *r* only when a vowel sound comes straight after it.",
    easyStart: false,
  },
  {
    slug: "short-o",
    number: 5,
    title: "Keep the o in hot, job and stop",
    summary: "Start from a short Kinyarwanda o, then match hot, job and stop to the recording.",
    easyStart: true,
  },
  {
    slug: "long-vowels",
    number: 6,
    title: "Use your long vowels",
    summary: "Hold the vowel longer and match its sound to the recording.",
    easyStart: true,
  },
];

export type NavItem = { title: string; href: string };
export type NavSection = { title: string; items: NavItem[] };

export const nav: NavSection[] = [
  {
    title: "Start here",
    items: [
      { title: "Overview", href: "/" },
      { title: "Clarity, not accent", href: "/guide/clarity-not-accent" },
      { title: "Why Standard English", href: "/guide/standard-english" },
      { title: "Get started", href: "/guide/get-started" },
      { title: "Which pronunciation to practise", href: "/guide/which-style" },
    ],
  },
  {
    title: "The six rules",
    items: rules.map((r) => ({ title: `${r.number}. ${r.title}`, href: `/rules/${r.slug}` })),
  },
  {
    title: "Reference",
    items: [
      { title: "Words that change meaning", href: "/everyday-words" },
      { title: "Writing: one spelling system", href: "/writing" },
      { title: "Daily practice", href: "/daily-practice" },
      { title: "Word finder", href: "/words" },
    ],
  },
];

export const flatNav: NavItem[] = nav.flatMap((s) => s.items);

export const ruleHref = (slug: RuleSlug) => `/rules/${slug}`;
