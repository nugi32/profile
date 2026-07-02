import { SectionHeader } from "@/components/layout/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MetricCard } from "@/components/cards/metric-card";
import { DeepWorkChart } from "@/components/charts/deep-work-chart";
import { ReadingChart } from "@/components/charts/reading-chart";
import { metrics } from "@/data/metrics";

export function ProgressTracker() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Instrumentation"
        title="Progress Tracker"
        description="Self-development, measured. Numbers that only matter because they compound."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <ScrollReveal key={metric.label} delay={i * 0.04}>
            <MetricCard metric={metric} />
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ScrollReveal>
          <DeepWorkChart />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <ReadingChart />
        </ScrollReveal>
      </div>
    </section>
  );
}
