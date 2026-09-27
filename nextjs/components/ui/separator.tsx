import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return <div className={cn("w-full border-t-2 border-dashed border-line/25", className)} />;
}
