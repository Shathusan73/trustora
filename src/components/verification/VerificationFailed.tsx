"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ClipboardList,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Copy,
  Check,
  HelpCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetVerification } from "@/store/slices/verificationSlice";
import { resetDocument } from "@/store/slices/documentSlice";
import { resetSelfie } from "@/store/slices/selfieSlice";
import { resetUi } from "@/store/slices/uiSlice";

interface VerificationFailedProps {
  reviewRequired?: boolean;
}

export function VerificationFailed({
  reviewRequired = false,
}: VerificationFailedProps) {
  const dispatch = useAppDispatch();
  const message = useAppSelector((s) => s.verification.resultMessage);
  const error = useAppSelector((s) => s.verification.error);
  const verificationId = useAppSelector((s) => s.verification.verificationId);
  const [copied, setCopied] = useState(false);

  function restart() {
    dispatch(resetVerification());
    dispatch(resetDocument());
    dispatch(resetSelfie());
    dispatch(resetUi());
  }

  function copyReference() {
    if (!verificationId) return;
    navigator.clipboard.writeText(verificationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const title = reviewRequired ? "Manual Review Required" : "Verification Unsuccessful";
  const description =
    message ||
    error ||
    (reviewRequired
      ? "Our biometric engine detected borderline confidence that requires standard human agent review."
      : "The face in the selfie could not be verified against the submitted government document.");

  return (
    <Card
      className={`relative overflow-hidden border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-elevated)]/90 via-[var(--surface)]/95 to-[var(--background-elevated)]/95 backdrop-blur-2xl ${
        reviewRequired
          ? "shadow-[0_20px_60px_rgba(245,158,11,0.08)]"
          : "shadow-[0_20px_60px_rgba(239,68,68,0.08)]"
      }`}
    >
      {/* Background ambient radial glow */}
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full blur-[90px] ${
          reviewRequired ? "bg-amber-500/[0.08]" : "bg-rose-500/[0.08]"
        }`}
        aria-hidden
      />

      <CardContent className="space-y-7 p-6 sm:p-8">
        {/* Hero Status Badge */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg ${
              reviewRequired
                ? "border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]"
                : "border-rose-500/40 bg-rose-500/10 text-rose-400 shadow-[0_0_25px_rgba(239,68,68,0.25)]"
            }`}
          >
            {reviewRequired ? (
              <Clock className="h-8 w-8" />
            ) : (
              <ShieldAlert className="h-8 w-8" />
            )}
          </div>

          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
              reviewRequired
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-rose-500/30 bg-rose-500/10 text-rose-300"
            }`}
          >
            <span>{reviewRequired ? "STATUS: PENDING REVIEW" : "STATUS: REJECTED"}</span>
          </div>

          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {title}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            {description}
          </p>
        </div>

        {/* Troubleshooting & Guidance Checklist */}
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-elevated)]/70 p-5">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
            <HelpCircle className="h-4 w-4 text-[var(--accent-secondary)]" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
              {reviewRequired ? "Next Steps for Manual Review" : "Recommendations for Retry"}
            </h3>
          </div>

          <ul className="mt-3 space-y-2.5 text-xs text-[var(--muted-strong)]">
            {reviewRequired ? (
              <>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-amber-400">•</span>
                  <span>A compliance officer will review the document and face images within 1-2 business days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-amber-400">•</span>
                  <span>You will receive an email notification once the determination is updated.</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-rose-400">•</span>
                  <span><strong>Face Match:</strong> Ensure the face on the uploaded ID belongs to the person taking the selfie.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-rose-400">•</span>
                  <span><strong>Lighting & Glare:</strong> Take the photos in even, well-lit surroundings without direct glare on the ID.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-rose-400">•</span>
                  <span><strong>Full Frame:</strong> Ensure all four edges and corners of the document are visible.</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Session Reference ID */}
        {verificationId && (
          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-3 text-xs">
            <span className="text-[var(--muted)]">Reference ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium text-[var(--foreground)]">
                {verificationId.slice(0, 20)}...
              </span>
              <button
                type="button"
                onClick={copyReference}
                className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/[0.04] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                title="Copy Reference ID"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={restart}
            className="group h-13 flex-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-base font-semibold text-black shadow-[0_8px_30px_rgba(110,231,183,0.25)] hover:shadow-[0_12px_40px_rgba(110,231,183,0.35)] hover:brightness-105"
          >
            <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            <span>Try Again</span>
          </Button>

          <Link href="/" className="sm:flex-initial">
            <Button variant="secondary" size="lg" className="h-13 w-full px-6">
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
