"use client";

import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { MetricCard } from "../cards/metric-card";
import { DeepWorkChart } from "../charts/deep-work-chart";
import { ReadingChart } from "../charts/reading-chart";
import type { Metric, MonthlyDeepWork, QuarterlyReading } from "@/types";

interface ProgressTrackerProps {
  metrics: Metric[] | null;
  deepWork: MonthlyDeepWork[] | null;
  reading: QuarterlyReading[] | null;
  error?: string | null;
  loading?: boolean;
}

export function ProgressTracker({ 
  metrics, 
  deepWork, 
  reading, 
  error, 
  loading 
}: ProgressTrackerProps) {
  const noData = !metrics?.length || !deepWork?.length || !reading?.length;

  if (error) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Instrumentation"
          title="Progress Tracker"
          description="Self-development, measured. Numbers that only matter because they compound."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load progress tracker data.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Instrumentation"
          title="Progress Tracker"
          description="Self-development, measured. Numbers that only matter because they compound."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading progress tracker data...
        </div>
      </section>
    );
  }

  if (noData) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Instrumentation"
          title="Progress Tracker"
          description="Self-development, measured. Numbers that only matter because they compound."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          Progress tracker data was successfully fetched but no content is available.
        </div>
      </section>
    );
  }

  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Instrumentation"
        title="Progress Tracker"
        description="Self-development, measured. Numbers that only matter because they compound."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(metrics ?? []).map((metric, i) => (
          <ScrollReveal key={metric.label} delay={i * 0.04}>
            <MetricCard metric={metric} />
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ScrollReveal>
          <DeepWorkChart data={deepWork ?? []} />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <ReadingChart data={reading ?? []} />
        </ScrollReveal>
      </div>
    </section>
  );
}
