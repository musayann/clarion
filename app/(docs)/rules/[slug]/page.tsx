import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Callout } from "@/components/callout";
import { course, JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Letters, plainText } from "@/components/respell";
import { ruleHref, rules } from "@/content/nav";
import { absoluteUrl, pageMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return rules.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rules/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const rule = rules.find((r) => r.slug === slug);
  if (!rule) return {};
  return pageMetadata({
    title: plainText(`Rule ${rule.number}: ${rule.title}`),
    description: `${plainText(rule.summary)} English pronunciation for Kinyarwanda speakers, with audio.`,
    href: ruleHref(rule.slug),
    ownImage: true,
  });
}

export default async function RulePage({ params }: PageProps<"/rules/[slug]">) {
  const { slug } = await params;
  const rule = rules.find((r) => r.slug === slug);
  if (!rule) notFound();
  const { default: Content } = await import(`@/content/rules/${slug}.mdx`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: plainText(`Rule ${rule.number}: ${rule.title}`),
          description: plainText(rule.summary),
          url: absoluteUrl(ruleHref(rule.slug)),
          inLanguage: "en-GB",
          learningResourceType: "Lesson",
          isAccessibleForFree: true,
          position: rule.number,
          isPartOf: { "@id": course["@id"] },
        }}
      />
      <PageHeader eyebrow={`Rule ${rule.number} of 6`} title={rule.title} easyStart={rule.easyStart} />
      <Callout variant="rule">
        <Letters text={rule.summary} />
      </Callout>
      <Content />
    </>
  );
}
