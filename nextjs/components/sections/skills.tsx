"use client";

import { LuWrench } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { SkillCard } from "../cards/skill-card";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

export function Skills() {
  // CMS collection: skills
  const { skills } = useCms();

  if (skills.length === 0) return null;

  return (
    <Reveal as="section" id="skills" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuWrench}
        title="My toolkit"
        description="What I reach for most, grouped by what I use it for."
        tone="sky"
      />

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((category, i) => (
          <StaggerItem key={category.category} className="h-full">
            <SkillCard category={category} tone={toneAt(i + 2)} />
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
