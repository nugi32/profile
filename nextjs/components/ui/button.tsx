import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Chunky, physical buttons: they lift when you hover and squish down when
 * you press. `buttonVariants` is exported so a <Link> can wear the same
 * style without nesting a <button> inside an <a>.
 */
const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-line font-semibold transition-[transform,box-shadow,background-color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-grape text-white shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        sun: "bg-sun text-onaccent shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        outline:
          "bg-card text-ink shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        ghost:
          "border-transparent bg-transparent text-ink hover:border-line/30 hover:bg-ink/5",
        link: "border-transparent text-grape underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
