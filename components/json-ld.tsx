import { absoluteUrl, siteDescription, siteKeywords, siteName } from "@/lib/site";
import { plainText } from "@/components/respell";
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
  description: siteDescription,
  url: absoluteUrl("/"),
  inLanguage: "en-GB",
  isAccessibleForFree: true,
  educationalLevel: "Intermediate",
  teaches: "Clear Standard English pronunciation",
  keywords: siteKeywords.join(", "),
  audience: {
    "@type": "EducationalAudience",
    audienceType: "Kinyarwanda speakers learning English",
    geographicArea: { "@type": "Country", name: "Rwanda" },
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseSchedule: { "@type": "Schedule", repeatFrequency: "Daily", duration: "PT15M" },
  },
  hasPart: rules.map((r) => ({
    "@type": "LearningResource",
    name: plainText(`Rule ${r.number}: ${r.title}`),
    description: plainText(r.summary),
    url: absoluteUrl(`/rules/${r.slug}`),
  })),
};
