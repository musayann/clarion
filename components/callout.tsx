import { CircleCheck, Info, Lightbulb, Target, Zap } from "lucide-react";
import { cn } from "cn";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const variants = {
  rule: { icon: Target, title: "The rule", className: "border-primary/30 bg-accent/60 text-foreground *:[svg]:text-primary" },
  check: { icon: CircleCheck, title: "How to check", className: "border-good/30 bg-good-soft/60 *:[svg]:text-good" },
  why: { icon: Lightbulb, title: "Why", className: "bg-muted/40 *:[svg]:text-muted-foreground" },
  "quick-win": { icon: Zap, title: "Quick win", className: "border-stress bg-stress/25 *:[svg]:text-stress-foreground" },
  note: { icon: Info, title: "Note", className: "bg-muted/40 *:[svg]:text-muted-foreground" },
} as const;

export type CalloutVariant = keyof typeof variants;

export const calloutTitle = (variant: CalloutVariant = "note") => variants[variant].title;

type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
};

export function Callout({ variant = "note", title, children }: CalloutProps) {
  const v = variants[variant];
  const Icon = v.icon;
  return (
    <Alert role="note" className={cn("my-6 px-4 py-3 text-base", v.className)}>
      <Icon aria-hidden />
      <AlertTitle className="text-sm font-semibold">{title ?? v.title}</AlertTitle>
      <AlertDescription className="text-base text-foreground/90 [&_p]:m-0 [&_p+p]:mt-2">
        {children}
      </AlertDescription>
    </Alert>
  );
}
