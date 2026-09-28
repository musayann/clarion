import { ImageResponse } from "next/og";

import { siteName } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

// Colours from app/icon.svg and the light theme in globals.css.
const brand = "#006aa5";
const accent = "#f7cd3a";
const ink = "#1c2430";
const muted = "#5b6573";

/** Shared-link card: the site mark, an eyebrow line, a title and one sentence. */
export function ogImage({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fcfbf7", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill={brand} />
            <path d="M38.5 33H13.5A12.5 12.5 0 1 0 17 24.2" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M44 25a11 11 0 0 1 0 16" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
            <path d="M50 19a19 19 0 0 1 0 28" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 700, color: ink }}>{siteName}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <span style={{ fontSize: 32, fontWeight: 600, color: brand }}>{eyebrow}</span>
          <span style={{ fontSize: 68, fontWeight: 700, color: ink, lineHeight: 1.1, marginTop: 12 }}>{title}</span>
          <span style={{ fontSize: 32, color: muted, lineHeight: 1.35, marginTop: 24 }}>{text}</span>
        </div>
        <div style={{ display: "flex", height: 12, marginTop: 56, borderRadius: 6, background: accent, width: 240 }} />
      </div>
    ),
    ogSize,
  );
}
