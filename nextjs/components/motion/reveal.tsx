"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Tag = "div" | "section" | "li" | "article";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Fades a whole section up into place the first time it scrolls into view.
 * Renders a plain, unanimated tag when the visitor prefers reduced motion,
 * so this never fights `globals.css`'s reduced-motion rules.
 */
export function Reveal({
  as = "div",
  children,
  className,
  id,
  delay = 0,
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return (
      <Plain id={id} className={className}>
        {children}
      </Plain>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "-80px 0px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Wraps a grid/list of cards. Children that are `StaggerItem` pick up the
 * hidden/visible variants automatically and pop in one after another as the
 * group scrolls into view, instead of the whole grid appearing at once.
 */
export function Stagger({
  as = "div",
  children,
  className,
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "-60px 0px" }}
      variants={staggerContainer}
    >
      {children}
    </MotionTag>
  );
}

/** One item inside a `Stagger` group. Drop-in replacement for a `<div>`. */
export function StaggerItem({
  as = "div",
  children,
  className,
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <MotionTag className={className} variants={staggerItem}>
      {children}
    </MotionTag>
  );
}
