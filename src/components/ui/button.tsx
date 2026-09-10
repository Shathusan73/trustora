import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]",
        secondary:
          "bg-[var(--surface-elevated)] text-[var(--foreground)] border border-[var(--border-strong)] hover:bg-[var(--surface-hover)]",
        outline:
          "border border-[var(--border-strong)] bg-transparent text-[var(--foreground)] hover:border-[var(--accent)]/40 hover:bg-[var(--surface)]/60",
        ghost:
          "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
        danger: "bg-[var(--danger)] text-white hover:bg-[var(--danger-hover)]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-[15px]",
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
