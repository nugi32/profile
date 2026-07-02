import { getIcon } from "@/lib/icon-map";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { SkillCategory } from "@/types";

export function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = getIcon(category.icon);

  return (
    <div className="rounded-2xl border border-panel-border bg-panel/60 p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-lg border border-panel-border bg-background p-2 text-ice">
          <Icon size={18} />
        </div>
        <h3 className="font-display text-lg">{category.category}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-xs text-muted">
              <span className="text-foreground/80">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <ProgressBar value={skill.level} />
          </div>
        ))}
      </div>
    </div>
  );
}
