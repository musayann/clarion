import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/site/app-sidebar";
import { SiteHeader } from "@/components/site/site-header";
import { ThemeProvider } from "@/components/site/theme";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

// latin-ext carries ə, which every sound spelling in the guide uses.
const sans = Inter({ variable: "--font-sans", subsets: ["latin", "latin-ext"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
// Sound letters (r, l, t): a serif italic, whose l has a tail and can't be read as a slash.
const sound = Source_Serif_4({ variable: "--font-sound", subsets: ["latin"], style: "italic" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s · ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  openGraph: { siteName, type: "website", locale: "en_GB" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable} ${sound.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TooltipProvider delayDuration={300}>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="min-w-0">
                <SiteHeader />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
