import type { NextConfig } from "next";
import createMDX from "@next/mdx";

import { flatNav } from "./content/nav";

const markdownPath = (href: string) => (href === "/" ? "/md/index" : `/md${href}`);

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  async redirects() {
    return [{ source: "/guide/sound-names", destination: "/guide/get-started", permanent: true }];
  },

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
