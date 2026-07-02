import { SectionHeader } from "@/components/layout/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SkillCard } from "@/components/cards/skill-card";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Toolkit"
        title="Skills"
        description="The instruments used across the lab, grouped by discipline."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category, i) => (
          <ScrollReveal key={category.category} delay={i * 0.05}>
            <SkillCard category={category} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
