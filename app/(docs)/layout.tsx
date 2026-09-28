import { PrevNext } from "@/components/site/prev-next";
import { Toc } from "@/components/site/toc";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="min-w-0 flex-1">
        <article className="max-w-3xl">{children}</article>
        <div className="max-w-3xl">
          <PrevNext />
        </div>
      </div>
      <aside className="hidden w-56 shrink-0 xl:block">
        <div className="sticky top-24">
          <Toc />
        </div>
      </aside>
    </div>
  );
}
