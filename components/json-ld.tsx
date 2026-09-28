import { absoluteUrl, siteName } from "@/lib/site";
import { rules } from "@/content/nav";

/** Structured data for search engines and AI. `<` is escaped so page text can't close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The guide as a free course whose parts are the six rules. */
export const course = {
  "@type": "Course",
  "@id": `${absoluteUrl("/")}#course`,
  name: siteName,
  description:
    "Clear English pronunciation for Kinyarwanda speakers: six rules, with audio for every example. The goal is to be understood the first time, not a particular accent.",
  url: absoluteUrl("/"),
  inLanguage: "en-GB",
  isAccessibleForFree: true,
  educationalLevel: "Intermediate",
  teaches: "Clear Standard English pronunciation",
  audience: { "@type": "EducationalAudience", audienceType: "Kinyarwanda speakers learning English" },
  provider: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseSchedule: { "@type": "Schedule", repeatFrequency: "Daily", duration: "PT15M" },
  },
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD", category: "Free" },
  hasPart: rules.map((r) => ({
    "@type": "LearningResource",
    name: `Rule ${r.number}: ${r.title}`,
    description: r.summary,
    url: absoluteUrl(`/rules/${r.slug}`),
  })),
};
