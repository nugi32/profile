import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";

export function About() {
  return (
    <section id="about" className="container py-24">
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:items-start">
        <ScrollReveal>
          <div className="relative mx-auto aspect-square w-full max-w-xs">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle cx="100" cy="100" r="90" stroke="hsl(220 20% 20%)" fill="none" />
              <circle cx="100" cy="100" r="60" stroke="hsl(178 65% 70% / 0.4)" fill="none" />
              <circle cx="100" cy="100" r="30" stroke="hsl(38 92% 62% / 0.4)" fill="none" />
              <circle cx="100" cy="10" r="3" fill="#7dd3fc" />
              <circle cx="170" cy="140" r="2.5" fill="#f0b429" />
              <circle cx="40" cy="150" r="2" fill="#7dd3fc" />
              <text
                x="100"
                y="105"
                textAnchor="middle"
                className="font-display"
                fontSize="16"
                fill="hsl(210 30% 92%)"
              >
                J.D.
              </text>
            </svg>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <SectionHeader
            eyebrow="About"
            title="A mind kept in the open"
            className="mb-8"
          />
          <p className="text-lg leading-relaxed text-foreground/85">
            I believe intellectual growth is a compounding process. Every
            project, every book, and every strange question becomes another
            node in an ever-expanding graph of understanding.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-ice">
                Who I am
              </h3>
              <p className="mt-2 text-sm text-muted">
                A web3 developer and independent quant researcher, building
                the infrastructure I wish already existed for both.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-ice">
                What I&apos;m learning
              </h3>
              <p className="mt-2 text-sm text-muted">
                Bayesian statistics, market microstructure, zero-knowledge
                systems, and the philosophy of mind.
              </p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ice">
                Personal philosophy
              </h3>
              <p className="mt-2 text-sm text-muted">
                Treat knowledge like capital: deposit consistently, connect
                ideas deliberately, and let compounding do the rest. Publish
                the thinking, not just the conclusions.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
