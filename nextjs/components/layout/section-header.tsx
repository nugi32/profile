import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { tint, type Tone } from "@/lib/tones";

/**
 * The title block used at the top of every section: a big friendly heading,
 * a one-line explanation, and an icon sticker that gives each section its
 * own little identity. Uses a real icon component (react-icons/lu) rather
 * than an emoji character, so it renders identically (and looks
 * professional/crisp) across every OS/browser instead of depending on the
 * viewer's emoji font.
 */
export function SectionHeader({
  title,
  description,
  icon: Icon,
  tone = "grape",
  align = "left",
  className,
}: {
  title: string;
  description?: string;
  icon?: IconType;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4",
        centered && "items-center text-center",
        className
      )}
    >
      <div className={cn("flex items-center gap-4", centered && "flex-col")}>
        {Icon && (
          <span
            aria-hidden="true"
            className={cn(
              "flex h-14 w-14 shrink-0 -rotate-6 items-center justify-center rounded-2xl border-2 border-line shadow-pop-sm",
              tint[tone]
            )}
          >
            <Icon size={26} strokeWidth={2.25} />
          </span>
        )}
        <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className={cn("max-w-2xl text-lg text-soft", centered && "mx-auto")}>{description}</p>
      )}
    </div>
  );
}
