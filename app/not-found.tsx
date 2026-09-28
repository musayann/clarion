import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        Try the <Link href="/words" className="text-primary underline">word finder</Link> or go back to the{" "}
        <Link href="/" className="text-primary underline">overview</Link>.
      </p>
    </div>
  );
}
