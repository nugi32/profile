"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline progress bar pinned to the very top edge of the viewport. Purely
 * decorative feedback that the page is alive and moving with the visitor —
 * skipped entirely under prefers-reduced-motion.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="no-print fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-grape"
      style={{ scaleX }}
    />
  );
}
