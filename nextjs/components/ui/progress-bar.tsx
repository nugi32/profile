"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fill, type Tone } from "@/lib/tones";

/** A chunky bar that fills in the first time it scrolls into view. */
export function ProgressBar({
  value,
  tone = "grape",
  className,
}: {
  value: number;
  tone?: Tone;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const width = `${Math.min(100, Math.max(0, value))}%`;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-4 w-full rounded-full border-2 border-line bg-card p-[2px]", className)}
    >
      <motion.div
        className={cn("h-full rounded-full", fill[tone])}
        initial={reduce ? { width } : { width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
