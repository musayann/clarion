import { ogImage, ogSize } from "@/lib/og";
import { siteTitle } from "@/lib/site";

export const alt = siteTitle;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "English pronunciation guide",
    title: "For Kinyarwanda speakers",
    text: "Six practical rules shaped by our training, with audio examples and a clear Standard English model.",
  });
}
