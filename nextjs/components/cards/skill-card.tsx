import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import { fill, type Tone } from "@/lib/tones";
import { ProgressBar } from "../ui/progress-bar";
import type { SkillCategory } from "@/types";

export function SkillCard({ category, tone = "grape" }: { category: SkillCategory; tone?: Tone }) {
  const Icon = getIcon(category.icon);

  return (
    <div className="sticker pressable h-full p-6">
      <div className="mb-6 flex items-center gap-3">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-line text-onaccent",
            fill[tone]
          )}
        >
          <Icon size={20} aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-extrabold leading-tight">{category.category}</h3>
      </div>
      <div className="flex flex-col gap-5">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold">{skill.name}</span>
              <span className="font-bold text-soft">{skill.level}%</span>
            </div>
            <ProgressBar value={skill.level} tone={tone} />
          </div>
        ))}
      </div>
    </div>
  );
}
