import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center py-24">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-ice">
        Signal lost
      </span>
      <h1 className="font-display text-5xl">404</h1>
      <p className="max-w-md text-muted">
        This node doesn't exist in the graph. The page may have moved, or it was
        never written down.
      </p>
      <Link href="/">
        <Button>Return to the observatory</Button>
      </Link>
    </section>
  );
}
