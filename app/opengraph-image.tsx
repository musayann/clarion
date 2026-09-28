import { ogImage, ogSize } from "@/lib/og";
import { siteTitle } from "@/lib/site";

export const alt = siteTitle;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "English pronunciation guide",
    title: "For Kinyarwanda speakers",
    text: "Six short rules, the words where one sound changes the meaning, and audio for every example.",
  });
}
