import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { cn } from "cn";

import { Callout } from "@/components/callout";
import * as Figures from "@/components/figures";
import { PageHeader } from "@/components/page-header";
import { Sp } from "@/components/respell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AmericanDifferenceTable,
  AmericanHabitsTable,
  MeaningChangeTable,
  Hear,
  PairTable,
  PracticeSentences,
  QuickAnswersTable,
  WordList,
  WordTable,
} from "@/components/word-tables";

function Heading({ as: Tag, id, className, children }: { as: "h2" | "h3"; id?: string; className: string; children?: React.ReactNode }) {
  return (
    <Tag id={id} className={cn("group scroll-mt-20", className)}>
      {children}
      {id && (
        <a href={`#${id}`} className="ml-2 inline-block align-middle text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100" aria-label="Link to this section">
          <Link2 className="size-4" aria-hidden />
        </a>
      )}
    </Tag>
  );
}

const components: MDXComponents = {
  h1: ({ children }) => <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{children}</h1>,
  h2: (props) => <Heading as="h2" className="mt-12 mb-4 border-b pb-2 text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <Heading as="h3" className="mt-8 mb-3 text-lg font-semibold tracking-tight" {...props} />,
  p: ({ children }) => <p className="my-4 leading-7 text-pretty">{children}</p>,
  ul: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-2 leading-7 marker:text-muted-foreground">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 ml-6 list-decimal space-y-2 leading-7 marker:text-muted-foreground">{children}</ol>,
  a: ({ href = "", children }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className="font-medium text-primary underline underline-offset-4">
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer" className="font-medium text-primary underline underline-offset-4">
        {children}
      </a>
    ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="my-6 border-l-2 pl-4 italic text-muted-foreground">{children}</blockquote>,
  hr: () => <hr className="my-10" />,
  table: ({ children }) => (
    <figure className="my-6 overflow-hidden rounded-xl border bg-card">
      <Table>{children}</Table>
    </figure>
  ),
  thead: ({ children }) => <TableHeader>{children}</TableHeader>,
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => <TableRow className="align-top">{children}</TableRow>,
  th: ({ children }) => (
    <TableHead className="h-10 px-4 text-xs font-semibold uppercase tracking-wide whitespace-nowrap text-muted-foreground">
      {children}
    </TableHead>
  ),
  td: ({ children }) => <TableCell className="min-w-32 px-4 py-2.5 whitespace-normal">{children}</TableCell>,

  // Components available in every MDX file without importing.
  Callout,
  PageHeader,
  Sp,
  Hear,
  WordTable,
  WordList,
  PairTable,
  PracticeSentences,
  QuickAnswersTable,
  AmericanHabitsTable,
  AmericanDifferenceTable,
  MeaningChangeTable,
  ...Figures,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
