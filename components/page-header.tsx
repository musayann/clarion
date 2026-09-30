import { Letters } from "@/components/respell";
import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  easyStart?: boolean;
};

export function PageHeader({ eyebrow, title, children, easyStart }: PageHeaderProps) {
  return (
    <header className="mb-8 space-y-3">
      {(eyebrow || easyStart) && (
        <div className="flex items-center gap-2">
          {eyebrow && <p className="text-sm font-semibold text-primary">{eyebrow}</p>}
          {easyStart && (
            <Badge className="bg-stress text-stress-foreground">Easy start</Badge>
          )}
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl"><Letters text={title} /></h1>
      {children && <div className="text-lg leading-8 text-pretty text-muted-foreground">{children}</div>}
    </header>
  );
}
