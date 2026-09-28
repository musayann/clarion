import { ogImage, ogSize } from "@/lib/og";
import { siteTitle } from "@/lib/site";

export const alt = siteTitle;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "English pronunciation guide",
    title: "For Kinyarwanda speakers",
    text: "The sounds that most often cause misunderstandings, set out as six rules with audio examples and a Standard English model.",
  });
}
