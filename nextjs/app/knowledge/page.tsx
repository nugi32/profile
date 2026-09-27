import { KnowledgeGraph } from "../../components/knowledge/knowledge-graph";
import { LuNetwork } from "react-icons/lu";
import { SectionHeader } from "../../components/layout/section-header";

export const metadata = {
  title: "Idea Map",
  description: "A map of the ideas I keep coming back to, and how they connect.",
};

export default function KnowledgePage() {
  return (
    <section className="container py-10">
      <SectionHeader
        icon={LuNetwork}
        title="How my ideas connect"
        description="Everything I'm curious about, and how it all links together."
        tone="mint"
        align="center"
      />
      <div className="sticker bg-card p-4 md:p-10">
        <KnowledgeGraph />
      </div>
      <p className="mt-8 text-center text-soft">
        Tap or hover a bubble to light up its neighbors. Tap the background to reset.
      </p>
    </section>
  );
}
