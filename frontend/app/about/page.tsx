import Link from "next/link";
import { About } from "@/components/sections/about";
import { SectionHeader } from "@/components/layout/section-header";
import { siteConfig } from "@/lib/site-config";

export default function AboutPage() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="About"
        title="The person behind the notebook"
        description="A brief profile of the research identity, values, and the systems being built."
      />
      <About />
      <div className="mt-12 rounded-3xl border border-panel-border bg-panel/50 p-8">
        <h2 className="font-display text-3xl text-foreground">Get in touch</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          I publish ideas, systems thinking, and research notes in the open. If you'd like to collaborate, share feedback, or ask a question, reach out through email or explore the lab's source projects.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href={siteConfig.links.email} className="rounded-full border border-panel-border px-4 py-3 text-foreground transition hover:border-ice/40 hover:text-ice">
            Email
          </Link>
          <Link href={siteConfig.links.github} className="rounded-full border border-panel-border px-4 py-3 text-foreground transition hover:border-ice/40 hover:text-ice">
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
