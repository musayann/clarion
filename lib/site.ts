import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const siteName = "Clear English Rwanda";
export const siteTitle = `${siteName}: English pronunciation for Kinyarwanda speakers`;
export const siteDescription =
  "Standard English pronunciation for Kinyarwanda speakers: six rules drawn from our experience, with audio examples.";

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

/** Markdown version of a page, for AI agents: /index.md for home, /<path>.md otherwise. */
export const markdownHref = (href: string) => (href === "/" ? "/index.md" : `${href}.md`);

/**
 * Canonical URL, markdown alternate, Open Graph and Twitter tags for a page.
 * openGraph is set in full (images included) because a page's openGraph replaces the root layout's instead of merging.
 */
export function pageMetadata({
  title,
  description,
  href,
  ownImage = false,
}: {
  title?: string;
  description: string;
  href: string;
  /** The page's segment has its own opengraph-image file, which config images would override. */
  ownImage?: boolean;
}): Metadata {
  const socialTitle = title ?? siteTitle;
  // The site-wide card from app/opengraph-image.tsx.
  const images = ownImage ? {} : { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteTitle }] };
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: href, types: { "text/markdown": markdownHref(href) } },
    openGraph: {
      title: socialTitle,
      description,
      url: href,
      siteName,
      type: href === "/" ? "website" : "article",
      locale: "en_GB",
      ...images,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, ...images },
  };
}
