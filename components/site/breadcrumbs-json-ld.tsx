"use client";

import { usePathname } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { plainText } from "@/components/respell";
import { flatNav } from "@/content/nav";
import { absoluteUrl } from "@/lib/site";

/** BreadcrumbList for the current docs page: Overview › page. */
export function BreadcrumbsJsonLd() {
  const pathname = usePathname();
  const page = flatNav.find((i) => i.href === pathname);
  if (!page || page.href === "/") return null;

  const crumbs = [
    { name: "Overview", url: absoluteUrl("/") },
    { name: plainText(page.title), url: absoluteUrl(page.href) },
  ];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
      }}
    />
  );
}
