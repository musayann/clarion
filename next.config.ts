import type { NextConfig } from "next";
import createMDX from "@next/mdx";

import { flatNav } from "./content/nav";

// Canonical URLs, the sitemap, JSON-LD and llms.txt would otherwise point to localhost.
if (process.env.VERCEL_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("Set NEXT_PUBLIC_SITE_URL for production builds.");
}

const markdownPath = (href: string) => (href === "/" ? "/md/index" : `/md${href}`);

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Markdown versions of every page for AI agents, served by app/md/[...path]/route.ts.
  async rewrites() {
    return {
      beforeFiles: flatNav.flatMap(({ href }) => [
        { source: href === "/" ? "/index.md" : `${href}.md`, destination: markdownPath(href) },
        {
          source: href,
          has: [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }],
          destination: markdownPath(href),
        },
      ]),
      afterFiles: [],
      fallback: [],
    };
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings so they work with Turbopack.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
