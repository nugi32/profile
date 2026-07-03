import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { getIcon } from "@/lib/icon-map";
import { currentFocus } from "../../data/current-focus";

export function CurrentFocus() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Right Now"
        title="Current Focus"
        description="What's actively occupying the research queue."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {currentFocus.map((item, i) => {
          const Icon = getIcon(item.icon);
          return (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-panel-border bg-panel/50 p-6 transition-colors hover:border-ice/40">
                <Icon className="text-ice" size={20} />
                <h3 className="mt-4 font-display text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
