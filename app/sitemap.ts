import type { MetadataRoute } from "next";

import { flatNav } from "@/content/nav";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return flatNav.map((item) => ({
    url: absoluteUrl(item.href),
    changeFrequency: "weekly",
    priority: item.href === "/" ? 1 : item.href.startsWith("/rules/") ? 0.9 : 0.7,
  }));
}
