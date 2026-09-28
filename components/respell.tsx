import { cn } from "cn";

/**
 * Renders a sound spelling such as "**woo**-tə": the syllable between ** is the
 * stressed one, shown bold on a yellow highlight.
 */
export function Respell({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <span className={cn("whitespace-nowrap", className)}>
      {parts.map((part, i) =>
        part.startsWith("**") ? (
          <strong
            key={i}
            className="rounded-[3px] bg-stress px-0.5 font-semibold text-stress-foreground"
          >
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

/** Stressed syllable inline in prose, e.g. <Stress>twen</Stress>-ti. */
export function Stress({ children }: { children: React.ReactNode }) {
  return (
    <strong className="rounded-[3px] bg-stress px-0.5 font-semibold text-stress-foreground">
      {children}
    </strong>
  );
}

/**
 * Wraps a sound spelling written in MDX, e.g. <Sp>**twen**-ti</Sp>, so its
 * bold syllable gets the same stress highlight as the tables.
 */
export function Sp({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap [&_strong]:rounded-[3px] [&_strong]:bg-stress [&_strong]:px-0.5 [&_strong]:font-semibold [&_strong]:text-stress-foreground">
      {children}
    </span>
  );
}
