import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 border-line px-3 py-0.5 text-xs font-semibold text-ink",
  {
    variants: {
      variant: {
        default: "bg-card",
        outline: "bg-transparent",
        // `ice` / `amber` are the two accent values the CMS stores on a project.
        ice: "bg-sky-tint",
        amber: "bg-sun-tint",
        grape: "bg-grape-tint",
        mint: "bg-mint-tint",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
