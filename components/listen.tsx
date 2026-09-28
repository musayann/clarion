"use client";

import { Volume2, VolumeX } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Accent } from "@/content/data/types";
import { play, stop, useNowPlaying } from "@/lib/player";

const accentLabel: Record<Accent, string> = {
  gb: "Standard English",
  us: "American, recognise only",
};

type ListenProps = {
  /** One clip, or several to play in sequence (e.g. both words of a pair). Missing → renders nothing. */
  src?: string | (string | undefined)[];
  /** What is spoken, for the accessible name: "water". */
  label: string;
  accent?: Accent;
  /** Visible text next to the icon, e.g. "Play both". */
  children?: React.ReactNode;
  className?: string;
};

export function Listen({ src, label, accent = "gb", children, className }: ListenProps) {
  const srcs = (Array.isArray(src) ? src : [src]).filter((s): s is string => Boolean(s));
  const nowPlaying = useNowPlaying();

  if (srcs.length === 0) return null;

  const playing = nowPlaying !== null && srcs.includes(nowPlaying);
  const Icon = playing ? VolumeX : Volume2;
  const name = `${playing ? "Stop" : "Play"} ${label} (${accentLabel[accent]})`;

  const button = (
    <Button
      type="button"
      variant="ghost"
      size={children ? "sm" : "icon-sm"}
      aria-label={children ? undefined : name}
      aria-pressed={playing}
      onClick={() => (playing ? stop() : play(...srcs))}
      className={cn(
        "text-muted-foreground hover:text-primary aria-pressed:bg-accent aria-pressed:text-primary",
        accent === "us" && "hover:text-avoid aria-pressed:text-avoid",
        className,
      )}
    >
      <Icon className={cn(playing && "animate-pulse")} aria-hidden />
      {children}
    </Button>
  );

  if (children) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{`Play (${accentLabel[accent]})`}</TooltipContent>
    </Tooltip>
  );
}
