"use client";

import { motion } from "framer-motion";
import { FileCheck, Sparkles, Shield, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";

export function DocumentProcessing() {
  const message = useAppSelector((s) => s.document.processingMessage);
  const status = useAppSelector((s) => s.verification.status);

  const statusText =
    message ||
    (status === "document_uploading"
      ? "Uploading document images securely…"
      : status === "document_processing"
        ? "Extracting facial features and verifying security features…"
        : "Analyzing document…");

  return (
    <Card className="relative overflow-hidden border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-elevated)]/90 via-[var(--surface)]/95 to-[var(--background-elevated)]/95 backdrop-blur-2xl">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-3xl"
        aria-hidden
      />

      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Computer Vision Engine</span>
          </div>
          <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Inspecting Identity Document
          </h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Executing automated feature extraction and tamper detection.
          </p>
        </div>

        {/* High-tech Scanning Viewport */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-black/60 shadow-inner">
          <div className="absolute inset-0 trustora-grid opacity-60" aria-hidden />

          {/* Futuristic scanner HUD corners */}
          <div className="pointer-events-none absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-emerald-400" />
          <div className="pointer-events-none absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-emerald-400" />
          <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-emerald-400" />
          <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-emerald-400" />

          {/* Laser scanning beam */}
          <div className="scan-line" aria-hidden />

          {/* Center Biometric Target */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(110,231,183,0.25)]">
              <FileCheck className="h-8 w-8" />
              <motion.div
                className="absolute inset-0 rounded-2xl border border-emerald-400"
                animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <p className="font-display max-w-sm text-sm font-semibold tracking-wide text-[var(--foreground)]" aria-live="polite">
              {statusText}
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] text-[var(--muted-strong)]">
              <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              <span>2D-DCT AC Normalized Extraction Active</span>
            </div>
          </div>
        </div>

        {/* Processing Steps Checklist */}
        <div className="grid grid-cols-1 gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 p-4 text-xs text-[var(--muted-strong)] sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] text-emerald-400">✓</span>
            <span>Document Border Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] text-emerald-400">✓</span>
            <span>Facial Region Isolation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Generating Biometric Vector</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
