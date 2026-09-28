import type { MetadataRoute } from "next";

import { flatNav } from "@/content/nav";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return flatNav.map((item) => ({ url: `${base}${item.href === "/" ? "" : item.href}` }));
}
