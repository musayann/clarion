import type { RuleSlug } from "./data/types";

export type Rule = {
  slug: RuleSlug;
  number: number;
  title: string;
  /** The rule in one sentence, shown on cards and at the top of the rule page. */
  summary: string;
  quickWin: boolean;
};

export const rules: Rule[] = [
  {
    slug: "say-every-t",
    number: 1,
    title: "Say every t in full",
    summary: "Stop the air completely with your tongue for every t you see in the spelling.",
    quickWin: true,
  },
  {
    slug: "thirteen-vs-thirty",
    number: 2,
    title: "Thirteen versus thirty",
    summary: "Stress the end of -teen numbers and the start of -ty numbers.",
    quickWin: true,
  },
  {
    slug: "r-and-l",
    number: 3,
    title: "Keep r and l apart",
    summary: "l: the tongue touches the ridge and stays. r: the tongue touches nothing.",
    quickWin: false,
  },
  {
    slug: "drop-the-r",
    number: 4,
    title: "After a vowel, drop the r",
    summary: "Say r only when a vowel sound comes straight after it.",
    quickWin: false,
  },
  {
    slug: "short-o",
    number: 5,
    title: "Keep the o in hot, job and stop",
    summary: "Say hot, job and stop with the Kinyarwanda o, short.",
    quickWin: true,
  },
  {
    slug: "long-vowels",
    number: 6,
    title: "Use your long vowels",
    summary: "Hold every long vowel about twice as long as the short one.",
    quickWin: true,
  },
];

export type NavItem = { title: string; href: string };
export type NavSection = { title: string; items: NavItem[] };

export const nav: NavSection[] = [
  {
    title: "Start here",
    items: [
      { title: "Overview", href: "/" },
      { title: "Get started", href: "/guide/get-started" },
      { title: "Which style to use", href: "/guide/which-style" },
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
      { title: "Habits to avoid", href: "/recognise-american" },
      { title: "Writing: one spelling system", href: "/writing" },
      { title: "Daily practice", href: "/daily-practice" },
      { title: "Word finder", href: "/words" },
    ],
  },
];

export const flatNav: NavItem[] = nav.flatMap((s) => s.items);

export const ruleHref = (slug: RuleSlug) => `/rules/${slug}`;
