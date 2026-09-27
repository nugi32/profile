"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuHourglass, LuCheck } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { Reveal } from "../motion/reveal";
import { cn } from "@/lib/utils";
import { tint, toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

export function Timeline() {
  // CMS collection: timeline (items is a one-entry-per-line textarea)
  const { timeline } = useCms();
  const [active, setActive] = useState(0);

  // Display chronologically (oldest first); the data layer sorts newest first.
  const displayTimeline = timeline.slice().reverse();

  // Open on the most recent year.
  useEffect(() => {
    if (displayTimeline.length) {
      setActive(displayTimeline.length - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeline]);

  if (timeline.length === 0) return null;

  const current = displayTimeline[active] ?? displayTimeline[displayTimeline.length - 1];

  return (
    <Reveal as="section" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuHourglass}
        title="My story so far"
        description="Pick a year to see what I was up to. Each one builds on the last."
        tone="bubblegum"
      />

      <div role="tablist" aria-label="Years" className="flex flex-wrap gap-3">
        {displayTimeline.map((entry, i) => {
          const selected = active === i;
          return (
            <button
              key={entry.year}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={cn(
                "chip px-5 py-2 text-base font-bold",
                selected && "!bg-grape text-white !shadow-none translate-x-[2px] translate-y-[2px]"
              )}
            >
              {entry.year}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.year}
          role="tabpanel"
          className={cn("sticker mt-8 p-6 md:p-10", tint[toneAt(active + 3)])}
          initial={{ opacity: 0, y: 12, rotate: -0.6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <h3 className="font-display text-3xl font-extrabold md:text-4xl">
            {current.year}
            {current.theme && <span className="text-soft"> · {current.theme}</span>}
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {current.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-ink/90">
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-line bg-card text-xs font-black"
                >
                  <LuCheck size={14} strokeWidth={3} aria-hidden="true" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </Reveal>
  );
}
