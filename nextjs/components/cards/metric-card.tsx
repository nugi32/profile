"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import { fill, tint, type Tone } from "@/lib/tones";
import { useCountUp } from "../../hooks/use-count-up";
import type { Metric } from "@/types";

export function MetricCard({ metric, tone = "grape" }: { metric: Metric; tone?: Tone }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useCountUp(metric.value, { start: inView });
  const Icon = getIcon(metric.icon);

  return (
    <div ref={ref} className={cn("sticker flex h-full flex-col gap-5 p-6", tint[tone])}>
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl border-2 border-line text-onaccent",
          fill[tone]
        )}
      >
        <Icon size={20} aria-hidden="true" />
      </span>
      <div>
        <div className="font-display text-5xl font-extrabold tabular-nums leading-none">
          {value.toLocaleString()}
          {metric.suffix}
        </div>
        <p className="mt-2 font-semibold text-soft">{metric.label}</p>
      </div>
    </div>
  );
}
