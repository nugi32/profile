"use client";

import { LuMessageCircle } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { QuoteCard } from "../cards/quote-card";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

const TILTS = [-1.5, 1, -0.75, 1.5, -1, 0.75];

export function WeirdThoughts() {
  // CMS collection: weird-thoughts
  const { weirdThoughts } = useCms();

  if (weirdThoughts.length === 0) return null;

  return (
    <Reveal as="section" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuMessageCircle}
        title="Shower thoughts"
        description="Ideas too small for a project and too odd for the journal, but too good to throw away."
        tone="sky"
      />

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {weirdThoughts.map((thought, i) => (
          <StaggerItem key={thought.quote} className="h-full">
            <QuoteCard thought={thought} tone={toneAt(i + 3)} tilt={TILTS[i % TILTS.length]} />
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
