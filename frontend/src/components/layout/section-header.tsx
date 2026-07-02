import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-ice">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-medium text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-2xl text-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
