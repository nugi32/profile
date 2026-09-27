import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-line bg-card px-2.5 py-0.5 text-xs font-semibold text-ink",
        className
      )}
    >
      #{children}
    </span>
  );
}
