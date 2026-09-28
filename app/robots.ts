import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

// Every crawler is welcome, AI and search alike: the guide is free to read and to learn from.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, host: siteUrl, sitemap: `${siteUrl}/sitemap.xml` };
}
