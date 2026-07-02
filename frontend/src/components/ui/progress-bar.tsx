"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  accent = "ice",
  className,
}: {
  value: number;
  accent?: "ice" | "amber";
  className?: string;
}) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-panel", className)}>
      <motion.div
        className={cn(
          "h-full rounded-full",
          accent === "ice" ? "bg-ice" : "bg-amber"
        )}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
