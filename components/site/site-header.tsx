import Link from "next/link";

import { Logo } from "@/components/site/app-sidebar";
import { SearchCommand } from "@/components/site/search-command";
import { ThemeToggle } from "@/components/site/theme";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { buildWordIndex } from "@/lib/word-index";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur supports-backdrop-filter:bg-background/70">
      <SidebarTrigger className="-ml-1" />
      <Link href="/" className="md:hidden">
        <Logo />
      </Link>
      <div className="ml-auto flex flex-1 items-center justify-end gap-2">
        <SearchCommand words={buildWordIndex()} />
        <ThemeToggle />
      </div>
    </header>
  );
}
