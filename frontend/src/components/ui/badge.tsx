import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--muted)]",
        accent:
          "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]",
        success:
          "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]",
        warning:
          "border-[var(--warning)]/30 bg-[var(--warning)]/10 text-[var(--warning)]",
        danger:
          "border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
