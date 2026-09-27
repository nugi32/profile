"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Full-viewport loading screen, shown until every collection has resolved so
 * the visitor never sees a half-populated page.
 *
 * It renders before any request has completed, so it shows no identity
 * content — just three bouncing blobs and a friendly line.
 */
export function LoadingScreen({ label = "Warming things up…" }: { label?: string }) {
  const reduce = useReducedMotion();
  const blobs = ["bg-grape", "bg-sun", "bg-bubblegum"];

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.45, ease: "easeInOut" }}
    >
      <div className="flex h-16 items-end gap-3" aria-hidden="true">
        {blobs.map((color, i) => (
          <span
            key={color}
            className={`h-9 w-9 animate-bob rounded-full border-2 border-line shadow-pop-sm ${color}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="font-display text-2xl font-bold">{label}</p>
    </motion.div>
  );
}
