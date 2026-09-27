import Link from "next/link";
import { LuNetwork } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { KnowledgeGraph } from "../knowledge/knowledge-graph";
import { Reveal } from "../motion/reveal";
import { buttonVariants } from "../ui/button";

export function KnowledgeMapPreview() {
  return (
    <Reveal as="section" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuNetwork}
        title="How my ideas connect"
        description="Every bubble is something I keep coming back to. Tap or hover one to see what it's linked to."
        tone="mint"
        align="center"
      />
      <div className="sticker bg-card p-4 md:p-8">
        <KnowledgeGraph />
      </div>
      <div className="mt-10 flex justify-center">
        <Link href="/knowledge" className={buttonVariants({ variant: "outline" })}>
          Open the full map
        </Link>
      </div>
    </Reveal>
  );
}
