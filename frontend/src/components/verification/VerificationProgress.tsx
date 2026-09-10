"use client";

import { motion } from "framer-motion";
import { FileText, Camera, Sparkles, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Document", icon: FileText },
  { id: 2, label: "Face Scan", icon: Camera },
  { id: 3, label: "Forensics", icon: Sparkles },
  { id: 4, label: "Decision", icon: ShieldCheck },
];

interface VerificationProgressProps {
  activeStep: number;
}

export function VerificationProgress({ activeStep }: VerificationProgressProps) {
  return (
    <nav aria-label="Verification progress" className="w-full">
      <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)]/60 p-3 backdrop-blur-md">
        <ol className="grid grid-cols-4 gap-2">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const isComplete = activeStep > step.id;
            const Icon = step.icon;

            return (
              <li key={step.id} className="relative flex flex-col items-center text-center">
                {/* Step Top Bar */}
                <div className="mb-2.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  {(isActive || isComplete) && (
                    <motion.div
                      layoutId={`bar-${step.id}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                      className={cn(
                        "h-full rounded-full",
                        isComplete
                          ? "bg-emerald-400"
                          : "bg-gradient-to-r from-emerald-400 to-teal-300"
                      )}
                    />
                  )}
                </div>

                {/* Step Icon Badge */}
                <div
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-200",
                    isComplete
                      ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(110,231,183,0.2)]"
                      : isActive
                        ? "border-emerald-400 bg-emerald-400/20 text-emerald-300 ring-2 ring-emerald-400/30 shadow-[0_0_16px_rgba(110,231,183,0.3)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Step Label */}
                <p
                  className={cn(
                    "mt-1.5 truncate text-[11px] font-medium tracking-tight transition-colors sm:text-xs",
                    isActive
                      ? "text-[var(--foreground)] font-semibold"
                      : isComplete
                        ? "text-emerald-400/90"
                        : "text-[var(--muted)]"
                  )}
                >
                  {step.label}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
