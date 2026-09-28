import { flatNav } from "@/content/nav";
import { pageMarkdown } from "@/lib/markdown";

// Reached through the rewrites in next.config.ts: /<page>.md, /index.md, or a page requested with Accept: text/markdown.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return flatNav.map((item) => ({ path: item.href === "/" ? ["index"] : item.href.slice(1).split("/") }));
}

export async function GET(_req: Request, ctx: RouteContext<"/md/[...path]">) {
  const { path } = await ctx.params;
  const href = path.join("/") === "index" ? "/" : `/${path.join("/")}`;
  const page = await pageMarkdown(href);
  if (!page) return new Response("Not found", { status: 404 });
  return new Response(page.markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
