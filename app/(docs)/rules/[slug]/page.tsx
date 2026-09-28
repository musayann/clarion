import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Callout } from "@/components/callout";
import { PageHeader } from "@/components/page-header";
import { rules } from "@/content/nav";

export const dynamicParams = false;

export function generateStaticParams() {
  return rules.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rules/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const rule = rules.find((r) => r.slug === slug);
  if (!rule) return {};
  return { title: `Rule ${rule.number}: ${rule.title}`, description: rule.summary };
}

export default async function RulePage({ params }: PageProps<"/rules/[slug]">) {
  const { slug } = await params;
  const rule = rules.find((r) => r.slug === slug);
  if (!rule) notFound();
  const { default: Content } = await import(`@/content/rules/${slug}.mdx`);

  return (
    <>
      <PageHeader eyebrow={`Rule ${rule.number} of 6`} title={rule.title} quickWin={rule.quickWin} />
      <Callout variant="rule">{rule.summary}</Callout>
      <Content />
    </>
  );
}
