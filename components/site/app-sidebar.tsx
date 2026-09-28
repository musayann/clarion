"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Letters } from "@/components/respell";
import { nav } from "@/content/nav";

/** The ə with sound waves. Same drawing as app/icon.svg; fixed brand colours in both themes. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect width="64" height="64" rx="14" fill="#006aa5" />
      <path
        d="M38.5 33H13.5A12.5 12.5 0 1 0 17 24.2"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="none" stroke="#f7cd3a" strokeWidth="4" strokeLinecap="round">
        <path d="M44 25a11 11 0 0 1 0 16" />
        <path d="M50 19a19 19 0 0 1 0 28" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight">
      <LogoMark className="size-7" />
      Clear English Rwanda
    </span>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="h-14 justify-center border-b px-4">
        <Link href="/" onClick={() => setOpenMobile(false)}>
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-2">
        {nav.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href} onClick={() => setOpenMobile(false)}>
                        <Letters text={item.title} />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-4 text-xs text-muted-foreground">
        An English pronunciation guide for Kinyarwanda speakers.
      </SidebarFooter>
    </Sidebar>
  );
}
