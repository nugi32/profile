import { KnowledgeGraph } from "../../components/knowledge/knowledge-graph";
import { SectionHeader } from "../../components/layout/section-header";

export default function KnowledgePage() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Knowledge"
        title="Knowledge Map"
        description="A network view of the concepts and connections that shape the research agenda."
        align="center"
      />
      <div className="rounded-3xl border border-panel-border bg-panel/40 p-6 md:p-10">
        <KnowledgeGraph />
      </div>
      <div className="mt-10 text-center text-sm text-muted">
        Hover a node to highlight related concepts and explore how ideas link across systems, finance, and philosophy.
      </div>
    </section>
  );
}
