"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Lock,
  Download,
  Calendar,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";

export function VerificationSuccess() {
  const message = useAppSelector((s) => s.verification.resultMessage);
  const verificationId = useAppSelector((s) => s.verification.verificationId);
  const [copied, setCopied] = useState(false);

  function copyReference() {
    if (!verificationId) return;
    navigator.clipboard.writeText(verificationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="relative overflow-hidden border-emerald-500/30 bg-gradient-to-b from-[var(--surface-elevated)]/90 via-[var(--surface)]/95 to-[var(--background-elevated)]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(16,185,129,0.1)]">
      {/* Background ambient celebratory radial glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-emerald-500/[0.12] blur-[90px]"
        aria-hidden
      />

      <CardContent className="space-y-7 p-6 sm:p-8">
        {/* Hero Success Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
            {/* Animated Halo */}
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-500/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400 bg-gradient-to-tr from-emerald-600 to-teal-400 text-black shadow-[0_0_35px_rgba(110,231,183,0.5)]">
              <ShieldCheck className="h-9 w-9 stroke-[2.2]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>VERIFIED CONFIRMED</span>
          </div>

          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Identity Authenticated
          </h2>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            {message ||
              "Your government ID and live biometric face scan matched successfully with high confidence."}
          </p>
        </div>

        {/* Certificate Credential Box */}
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)]/70 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
              Verification Certificate
            </span>
            <span className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              <Award className="h-3 w-3" />
              SOC-2 Pass
            </span>
          </div>

          <div className="divide-y divide-[var(--border)] text-xs">
            {/* Session Reference ID */}
            {verificationId && (
              <div className="flex items-center justify-between py-3">
                <span className="text-[var(--muted)]">Reference ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium text-[var(--foreground)]">
                    {verificationId.slice(0, 18)}...
                  </span>
                  <button
                    type="button"
                    onClick={copyReference}
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    title="Copy Reference ID"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Audit Timestamp */}
            <div className="flex items-center justify-between py-3">
              <span className="text-[var(--muted)]">Timestamp</span>
              <span className="flex items-center gap-1.5 text-[var(--muted-strong)]">
                <Calendar className="h-3 w-3 text-[var(--muted)]" />
                {currentDate}
              </span>
            </div>

            {/* Invariance Check */}
            <div className="flex items-center justify-between py-3">
              <span className="text-[var(--muted)]">Biometric Similarity</span>
              <span className="font-medium text-emerald-400">Match Confirmed (≥ 0.75)</span>
            </div>

            {/* Liveness Result */}
            <div className="flex items-center justify-between py-3">
              <span className="text-[var(--muted)]">Passive Liveness</span>
              <span className="font-medium text-emerald-400">Genuine Human (≥ 0.80)</span>
            </div>
          </div>
        </div>

        {/* Privacy Purge Guarantee */}
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-xs text-[var(--muted)]">
          <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>
            Zero-knowledge policy active: Ephemeral biometric vectors have been purged from memory.
          </span>
        </div>

        {/* Next Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="flex-1">
            <Button
              size="lg"
              className="h-13 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-base font-semibold text-black shadow-[0_8px_30px_rgba(110,231,183,0.25)] hover:shadow-[0_12px_40px_rgba(110,231,183,0.35)] hover:brightness-105"
            >
              <span>Done & Return Home</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
