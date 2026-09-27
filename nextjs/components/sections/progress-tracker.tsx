"use client";

import { LuTrendingUp } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { MetricCard } from "../cards/metric-card";
import { DeepWorkChart } from "../charts/deep-work-chart";
import { ReadingChart } from "../charts/reading-chart";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

function EmptyPanel({ text }: { text: string }) {
  return (
    <div className="flex h-72 items-center justify-center rounded-3xl border-2 border-dashed border-line/40 p-6 text-center">
      <p className="text-soft">{text}</p>
    </div>
  );
}

export function ProgressTracker() {
  // CMS collections: metrics, monthly-deep-work, quarterly-reading
  const { metrics, deepWork, reading } = useCms();

  const hasAnyData = metrics.length > 0 || deepWork.length > 0 || reading.length > 0;

  return (
    <Reveal as="section" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuTrendingUp}
        title="Progress, by the numbers"
        description="Small things, repeated. The numbers only matter because they add up."
        tone="mint"
      />

      {!hasAnyData ? (
        <div className="rounded-3xl border-2 border-dashed border-line/40 p-12 text-center">
          <p className="text-soft">Nothing to show yet. Check back soon!</p>
        </div>
      ) : (
        <>
          {metrics.length > 0 && (
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, i) => (
                <StaggerItem key={metric.label} className="h-full">
                  <MetricCard metric={metric} tone={toneAt(i)} />
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {(deepWork.length > 0 || reading.length > 0) && (
            <Reveal className="mt-6 grid gap-5 lg:grid-cols-2" delay={0.1}>
              {deepWork.length > 0 ? (
                <DeepWorkChart data={deepWork} />
              ) : (
                <EmptyPanel text="Focus hours will show up here." />
              )}
              {reading.length > 0 ? (
                <ReadingChart data={reading} />
              ) : (
                <EmptyPanel text="Reading stats will show up here." />
              )}
            </Reveal>
          )}
        </>
      )}
    </Reveal>
  );
}
