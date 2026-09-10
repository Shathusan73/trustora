"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  FileText,
  Camera,
  Sparkles,
  Check,
  ExternalLink,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  Loader2,
  ChevronDown,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setConsentAccepted,
  setCurrentStep,
  setError,
  setStatus,
  setVerificationId,
} from "@/store/slices/verificationSlice";
import { setIsSubmitting } from "@/store/slices/uiSlice";
import { startVerification } from "@/lib/api/verification";
import { ApiClientError } from "@/lib/api/client";

export function ConsentStep() {
  const dispatch = useAppDispatch();
  const { consentAccepted, error } = useAppSelector((s) => s.verification);
  const isSubmitting = useAppSelector((s) => s.ui.isSubmitting);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  async function handleContinue() {
    if (!consentAccepted) {
      dispatch(setError("Please acknowledge and accept the biometric consent terms to continue."));
      return;
    }

    dispatch(setIsSubmitting(true));
    dispatch(setError(null));
    dispatch(setStatus("starting"));

    try {
      const data = await startVerification(true);
      dispatch(setVerificationId(data.verificationId));
      dispatch(setCurrentStep(1));
      dispatch(setStatus("idle"));
    } catch (err) {
      const message =
        err instanceof ApiClientError
          ? err.message
          : "Unable to initialize verification session. Please check your connection and try again.";
      dispatch(setError(message));
      dispatch(setStatus("failed"));
    } finally {
      dispatch(setIsSubmitting(false));
    }
  }

  return (
    <Card className="relative overflow-hidden border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-elevated)]/90 via-[var(--surface)]/95 to-[var(--background-elevated)]/95 backdrop-blur-2xl">
      {/* Decorative ambient background accent */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/[0.06] blur-3xl"
        aria-hidden
      />

      <CardContent className="space-y-7 p-6 sm:p-8">
        {/* Top Feature Banner */}
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]/60 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(110,231,183,0.15)]">
              <ShieldCheck className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-base font-semibold tracking-tight text-[var(--foreground)]">
                  Bank-Grade Biometric Assurance
                </h2>
              </div>
              <p className="text-xs text-[var(--muted)]">
                Automated document forensics & real-time 3D face liveness
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-[var(--muted-strong)]">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span>256-Bit Encrypted</span>
          </div>
        </div>

        {/* 3 Preparation Steps: What you will need */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
              What you&apos;ll need
            </h3>
            <span className="text-[11px] text-[var(--muted)]">Takes under 60 seconds</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Step 1: ID */}
            <div className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-4 transition-all duration-200 hover:border-emerald-500/30 hover:bg-[var(--surface-hover)]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                <FileText className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-medium text-[var(--foreground)]">1. Government ID</h4>
              <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                Passport, National ID, or Driver&apos;s license in clear lighting.
              </p>
              <div className="mt-3 inline-block rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-[var(--muted-strong)]">
                Photo or PDF
              </div>
            </div>

            {/* Step 2: Camera */}
            <div className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-4 transition-all duration-200 hover:border-emerald-500/30 hover:bg-[var(--surface-hover)]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Camera className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-medium text-[var(--foreground)]">2. Camera Access</h4>
              <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                Quick 3-second face capture to verify live human presence.
              </p>
              <div className="mt-3 inline-block rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-[var(--muted-strong)]">
                Passive Liveness
              </div>
            </div>

            {/* Step 3: Result */}
            <div className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-4 transition-all duration-200 hover:border-emerald-500/30 hover:bg-[var(--surface-hover)]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-medium text-[var(--foreground)]">3. Instant Decision</h4>
              <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                Immediate algorithmic verification with tamper forensics.
              </p>
              <div className="mt-3 inline-block rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-[var(--muted-strong)]">
                Automated AI
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Privacy Pillars */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2.5 text-xs text-[var(--muted-strong)]">
              <Lock className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>TLS 1.3 & AES-256</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[var(--muted-strong)]">
              <EyeOff className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Zero Biometric Storage</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[var(--muted-strong)]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>GDPR & CCPA Compliant</span>
            </div>
          </div>

          <div className="mt-3 border-t border-[var(--border)] pt-3">
            <button
              type="button"
              onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
              className="flex w-full items-center justify-between text-left text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <span className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-[var(--accent-secondary)]" />
                How does Trustora handle and protect your biometric data?
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  showPrivacyDetails ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showPrivacyDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted)]">
                    Trustora executes face detection, liveness scoring, and document feature
                    extraction in volatile container memory. Biometric vectors are calculated
                    strictly for similarity matching and are immediately purged after session
                    determination. Your data is never sold or used to train third-party models.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive Custom Consent Selector */}
        <div
          role="checkbox"
          aria-checked={consentAccepted}
          tabIndex={0}
          onClick={() => dispatch(setConsentAccepted(!consentAccepted))}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              dispatch(setConsentAccepted(!consentAccepted));
            }
          }}
          className={`group flex cursor-pointer items-start gap-3.5 rounded-xl border p-4.5 transition-all duration-200 select-none ${
            consentAccepted
              ? "border-emerald-500/50 bg-emerald-950/20 shadow-[0_0_25px_rgba(110,231,183,0.08)] ring-1 ring-emerald-500/30"
              : "border-[var(--border-strong)] bg-[var(--surface-elevated)]/60 hover:border-white/20 hover:bg-[var(--surface-hover)]"
          }`}
        >
          {/* Custom Styled Checkbox Indicator */}
          <div
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
              consentAccepted
                ? "border-emerald-500 bg-emerald-500 text-black shadow-[0_0_10px_rgba(110,231,183,0.5)]"
                : "border-[var(--border-strong)] bg-[var(--surface)] group-hover:border-white/40"
            }`}
          >
            {consentAccepted && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </motion.div>
            )}
          </div>

          {/* Consent Text */}
          <div className="space-y-1 text-sm leading-relaxed">
            <p className={consentAccepted ? "text-[var(--foreground)] font-medium" : "text-[var(--muted-strong)]"}>
              I consent to the collection and processing of my biometric facial geometry and government ID image.
            </p>
            <p className="text-xs text-[var(--muted)]">
              Used strictly for real-time identity authentication in accordance with the{" "}
              <Link
                href="/privacy"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-0.5 text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Privacy Policy
                <ExternalLink className="h-2.5 w-2.5" />
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-0.5 text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Terms of Service
                <ExternalLink className="h-2.5 w-2.5" />
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Error Alert if any */}
        {error && (
          <Alert variant="danger" title="Unable to proceed">
            {error}
          </Alert>
        )}

        {/* Action Button & Trust Footnote */}
        <div className="space-y-4 pt-1">
          <Button
            size="lg"
            className={`group relative h-13 w-full overflow-hidden text-base font-semibold shadow-lg transition-all duration-300 ${
              consentAccepted
                ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-black shadow-[0_8px_30px_rgba(110,231,183,0.25)] hover:shadow-[0_12px_40px_rgba(110,231,183,0.35)] hover:brightness-105"
                : "opacity-60 cursor-not-allowed"
            }`}
            disabled={isSubmitting || !consentAccepted}
            onClick={handleContinue}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Initializing Secure Session...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Start Verification</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </Button>

          {!consentAccepted && (
            <p className="text-center text-xs text-[var(--muted)]">
              Please check the consent box above to activate the verification session.
            </p>
          )}

          {/* Bottom Security Assurance Footnote */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-[11px] text-[var(--muted)]">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-emerald-400" />
              AES-256 End-to-End
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-[var(--border-strong)] sm:inline" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              Active Tamper Detection
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-[var(--border-strong)] sm:inline" />
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              SOC-2 Type II Certified
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
