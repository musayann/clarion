import { plainText } from "@/components/respell";
import { rules } from "@/content/nav";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "A rule from the English pronunciation guide for Kinyarwanda speakers";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return rules.map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rule = rules.find((r) => r.slug === slug)!;
  return ogImage({ eyebrow: `Rule ${rule.number} of 6`, title: plainText(rule.title), text: plainText(rule.summary) });
}
