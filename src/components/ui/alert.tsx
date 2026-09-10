import * as React from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  info: {
    icon: Info,
    className:
      "border-[var(--accent)]/25 bg-[var(--accent)]/8 text-[var(--foreground)]",
  },
  success: {
    icon: CheckCircle2,
    className:
      "border-[var(--success)]/25 bg-[var(--success)]/8 text-[var(--foreground)]",
  },
  warning: {
    icon: TriangleAlert,
    className:
      "border-[var(--warning)]/25 bg-[var(--warning)]/8 text-[var(--foreground)]",
  },
  danger: {
    icon: AlertCircle,
    className:
      "border-[var(--danger)]/25 bg-[var(--danger)]/8 text-[var(--foreground)]",
  },
} as const;

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
  title?: string;
}

export function Alert({
  className,
  variant = "info",
  title,
  children,
  ...props
}: AlertProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border px-4 py-3 text-sm",
        config.className,
        className
      )}
      {...props}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 opacity-80" aria-hidden />
      <div className="space-y-1">
        {title ? <p className="font-medium">{title}</p> : null}
        <div className="text-[var(--muted)] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
