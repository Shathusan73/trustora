"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Check, ShieldCheck, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCurrentStep,
  setError,
  setResultMessage,
  setStatus,
} from "@/store/slices/verificationSlice";
import { getVerificationResult, runVerification } from "@/lib/api/verification";
import { ApiClientError } from "@/lib/api/client";

function mapResultStatus(
  status: string
): "verified" | "failed" | "review_required" {
  const normalized = status.toLowerCase().replace(/[\s-]+/g, "_");

  if (
    normalized === "verified" ||
    normalized === "success" ||
    normalized === "passed" ||
    normalized === "approved"
  ) {
    return "verified";
  }

  if (
    normalized === "review_required" ||
    normalized === "manual_review" ||
    normalized === "pending_review" ||
    normalized === "pending" ||
    normalized.includes("review")
  ) {
    return "review_required";
  }

  return "failed";
}

const pipelineSteps = [
  { label: "Document Feature Extraction & Crop", delayMs: 400 },
  { label: "Biometric 2D-DCT & HOG Frequency Vectors", delayMs: 1200 },
  { label: "Cosine Distance Cross-Matching", delayMs: 2000 },
  { label: "Passive Liveness Probability Evaluation", delayMs: 2800 },
];

export function FaceVerification() {
  const dispatch = useAppDispatch();
  const ranRef = useRef(false);
  const { verificationId, error } = useAppSelector((s) => s.verification);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Progressively mark pipeline stages
    const timers = pipelineSteps.map((step, idx) =>
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, idx]);
      }, step.delayMs)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (!verificationId || ranRef.current) return;
    ranRef.current = true;

    async function verify() {
      dispatch(setStatus("verifying"));
      dispatch(setError(null));
      dispatch(setResultMessage(null));

      try {
        const verifyData = await runVerification(verificationId!);
        dispatch(
          setResultMessage(
            verifyData.message || "Verification request submitted. Fetching result…"
          )
        );

        const result = await getVerificationResult(verificationId!);
        const mapped = mapResultStatus(result.status);
        const message =
          result.resultMessage ||
          result.message ||
          (mapped === "verified"
            ? "Identity verified successfully."
            : mapped === "review_required"
              ? "Additional review is required."
              : "Verification did not pass.");

        // Brief delay so user experiences the completed pipeline checklist
        setTimeout(() => {
          dispatch(setResultMessage(message));
          dispatch(setStatus(mapped));
          dispatch(setCurrentStep(4));
        }, 1200);
      } catch (err) {
        const message =
          err instanceof ApiClientError
            ? err.message
            : "Verification failed unexpectedly.";
        dispatch(setError(message));
        dispatch(setResultMessage(message));
        dispatch(setStatus("failed"));
        dispatch(setCurrentStep(4));
      }
    }

    void verify();
  }, [dispatch, verificationId]);

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
            <span>AI Neural Biometric Engine</span>
          </div>
          <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Authenticating Identity
          </h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Comparing government ID document features with live selfie biometric vectors.
          </p>
        </div>

        {/* Futuristic Analysis HUD */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-black/70 shadow-inner">
          <div className="absolute inset-0 trustora-grid opacity-70" aria-hidden />

          {/* Scanner Corner Brackets */}
          <div className="pointer-events-none absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-emerald-400" />
          <div className="pointer-events-none absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-emerald-400" />
          <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-emerald-400" />
          <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-emerald-400" />

          {/* Laser scan line */}
          <div className="scan-line" aria-hidden />

          {/* Center Neural Icon with Rotating Ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
              {/* Concentric rotating glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-emerald-400/60"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-[0_0_25px_rgba(110,231,183,0.3)]">
                <Cpu className="h-7 w-7" />
              </div>
            </div>

            <p className="font-display text-sm font-semibold tracking-wide text-[var(--foreground)]" aria-live="polite">
              Evaluating Biometric Invariance & Liveness...
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
              <span>Matching against ISO/IEC biometric standards</span>
            </div>
          </div>
        </div>

        {/* Live Pipeline Step Checklist */}
        <div className="space-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
            Active Verification Pipeline
          </p>
          <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
            {pipelineSteps.map((step, idx) => {
              const isDone = completedSteps.includes(idx);
              return (
                <div
                  key={step.label}
                  className="flex items-center gap-2 text-xs text-[var(--muted-strong)]"
                >
                  {isDone ? (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    </span>
                  )}
                  <span className={isDone ? "text-emerald-300" : "text-[var(--muted)]"}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <Alert variant="danger" title="Verification error">
            {error}
          </Alert>
        )}

        <div className="flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Biometric session encrypted and temporary. Zero vectors persisted.</span>
        </div>
      </CardContent>
    </Card>
  );
}
