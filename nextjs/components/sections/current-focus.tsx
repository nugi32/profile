"use client";

import { LuFlame } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import { fill, tint, toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

export function CurrentFocus() {
  // CMS collection: current-focus
  const { currentFocus } = useCms();

  if (currentFocus.length === 0) return null;

  return (
    <Reveal as="section" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuFlame}
        title="What I'm into right now"
        description="The things currently taking up my brain (and my browser tabs)."
        tone="tangerine"
      />

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {currentFocus.map((item, i) => {
          const Icon = getIcon(item.icon);
          const tone = toneAt(i);
          return (
            <StaggerItem
              key={item.title}
              className={cn("sticker pressable h-full p-6", tint[tone])}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-line text-onaccent",
                  fill[tone]
                )}
              >
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink/80">{item.description}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Reveal>
  );
}
