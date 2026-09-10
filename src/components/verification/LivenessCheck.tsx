"use client";

import { ScanFace } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export function LivenessCheck() {
  const message = useAppSelector((s) => s.selfie.livenessMessage);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3 text-xs text-[var(--muted-strong)] shadow-sm">
      <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
        <ScanFace className="h-4 w-4" />
      </div>
      <div className="space-y-0.5">
        <span className="font-semibold text-emerald-300">Biometric Liveness Guidance</span>
        <p className="text-[11px] leading-relaxed text-[var(--muted)]">
          {message ||
            "Center your face within the reticle, look directly into the lens, and hold still."}
        </p>
      </div>
    </div>
  );
}
