"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Letters } from "@/components/respell";
import { flatNav } from "@/content/nav";

export function PrevNext() {
  const pathname = usePathname();
  const i = flatNav.findIndex((item) => item.href === pathname);
  if (i === -1) return null;
  const prev = flatNav[i - 1];
  const next = flatNav[i + 1];

  return (
    <nav aria-label="Previous and next page" className="mt-16 grid gap-3 border-t pt-6 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="group rounded-lg border p-4 transition-colors hover:border-primary/50 hover:bg-accent/40">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="size-3.5" aria-hidden /> Previous
          </span>
          <span className="mt-1 block font-medium group-hover:text-primary"><Letters text={prev.title} /></span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="group rounded-lg border p-4 text-right transition-colors hover:border-primary/50 hover:bg-accent/40"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next <ChevronRight className="size-3.5" aria-hidden />
          </span>
          <span className="mt-1 block font-medium group-hover:text-primary"><Letters text={next.title} /></span>
        </Link>
      )}
    </nav>
  );
}
