"use client";

import { getIcon } from "@/lib/icon-map";
import { useCountUp } from "../../hooks/use-count-up";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { Metric } from "@/types";

export function MetricCard({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useCountUp(metric.value, { start: inView });
  const Icon = getIcon(metric.icon);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 rounded-2xl border border-panel-border bg-panel/50 p-6"
    >
      <Icon className="text-ice" size={18} />
      <div className="font-display text-3xl tabular-nums">
        {value.toLocaleString()}
        {metric.suffix}
      </div>
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        {metric.label}
      </p>
    </div>
  );
}
