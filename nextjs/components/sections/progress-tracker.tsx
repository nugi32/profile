"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { MetricCard } from "../cards/metric-card";
import { DeepWorkChart } from "../charts/deep-work-chart";
import { ReadingChart } from "../charts/reading-chart";
import { fetchFromCms } from "@/lib/fetcher";
import type { Metric, MonthlyDeepWork, QuarterlyReading } from "@/types";

type CmsCollectionResponse<T> = {
  docs: T[];
};

export function ProgressTracker() {
  const [metricsData, setMetricsData] = useState<Metric[] | null>(null);
  const [deepWorkData, setDeepWorkData] = useState<MonthlyDeepWork[] | null>(null);
  const [readingData, setReadingData] = useState<QuarterlyReading[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchProgressData = async () => {
      try {
        setError("");
        setNoData(false);
        setLoading(true);

        const [metricsResponse, deepWorkResponse, readingResponse] = await Promise.all([
          fetchFromCms<CmsCollectionResponse<Metric>>("api/metrics"),
          fetchFromCms<CmsCollectionResponse<MonthlyDeepWork>>("api/monthly-deep-work"),
          fetchFromCms<CmsCollectionResponse<QuarterlyReading>>("api/quarterly-reading"),
        ]);

        if (!mounted) return;

        const metrics = metricsResponse.docs ?? [];
        const deepWork = deepWorkResponse.docs ?? [];
        const reading = readingResponse.docs ?? [];

        setMetricsData(metrics);
        setDeepWorkData(deepWork);
        setReadingData(reading);

        if (!metrics.length || !deepWork.length || !reading.length) {
          setNoData(true);
        }
      } catch (err: any) {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Failed to load progress tracker data");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProgressData();

    return () => {
      mounted = false;
    };
  }, []);

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
        {metricsData!.map((metric, i) => (
          <ScrollReveal key={metric.label} delay={i * 0.04}>
            <MetricCard metric={metric} />
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ScrollReveal>
          <DeepWorkChart data={deepWorkData!} />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <ReadingChart data={readingData!} />
        </ScrollReveal>
      </div>
    </section>
  );
}
