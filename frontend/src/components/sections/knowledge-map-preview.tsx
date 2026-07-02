import Link from "next/link";
import { SectionHeader } from "@/components/layout/section-header";
import { KnowledgeGraph } from "@/components/knowledge/knowledge-graph";
import { Button } from "@/components/ui/button";

export function KnowledgeMapPreview() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Network"
        title="Knowledge Map"
        description="How the recurring subjects of this notebook connect to one another. Hover a node to trace its links."
        align="center"
      />
      <div className="rounded-3xl border border-panel-border bg-panel/40 p-6 md:p-10">
        <KnowledgeGraph />
      </div>
      <div className="mt-10 flex justify-center">
        <Link href="/knowledge">
          <Button variant="outline">Open full knowledge map</Button>
        </Link>
      </div>
    </section>
  );
}
