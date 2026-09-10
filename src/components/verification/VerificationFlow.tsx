"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";
import { VerificationProgress } from "./VerificationProgress";
import { ConsentStep } from "./ConsentStep";
import { DocumentUpload } from "./DocumentUpload";
import { SelfieCapture } from "./SelfieCapture";
import { FaceVerification } from "./FaceVerification";
import { VerificationResult } from "./VerificationResult";

export function VerificationFlow() {
  const { currentStep } = useAppSelector((s) => s.verification);
  const reduceMotion = useReducedMotion();

  const progressStep = useMemo(() => {
    if (currentStep <= 0) return 0;
    if (currentStep === 1) return 1;
    if (currentStep === 2) return 2;
    if (currentStep === 3) return 3;
    return 4;
  }, [currentStep]);

  const stepMeta = useMemo(() => {
    switch (currentStep) {
      case 0:
        return {
          eyebrow: "Identity Assurance",
          title: "Start Identity Verification",
          subtitle:
            "Secure, automated biometric verification. Please prepare your official government-issued ID and device camera.",
        };
      case 1:
        return {
          eyebrow: "Step 01 / 04 • Document Inspection",
          title: "Upload Government ID",
          subtitle:
            "Submit a crisp, glare-free image or document file of your passport, national ID card, or driver's license.",
        };
      case 2:
        return {
          eyebrow: "Step 02 / 04 • Liveness Verification",
          title: "Passive Face Liveness",
          subtitle:
            "Position your face inside the guide frame to confirm live human presence and 3D geometric depth.",
        };
      case 3:
        return {
          eyebrow: "Step 03 / 04 • Forensic Matching",
          title: "Biometric Matching in Progress",
          subtitle:
            "Trustora AI is comparing biometric feature vectors and verifying document authenticity against tamper models.",
        };
      default:
        return {
          eyebrow: "Verification Complete",
          title: "Identity Decision",
          subtitle:
            "The biometric match and document forensic evaluation have been finalized.",
        };
    }
  }, [currentStep]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--accent-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {stepMeta.eyebrow}
        </div>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl text-[var(--foreground)]">
          {stepMeta.title}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] sm:mx-0">
          {stepMeta.subtitle}
        </p>
      </div>

      {currentStep > 0 ? (
        <VerificationProgress activeStep={Math.max(progressStep, 1)} />
      ) : null}

      <motion.div
        key={currentStep}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {currentStep === 0 ? <ConsentStep /> : null}
        {currentStep === 1 ? <DocumentUpload /> : null}
        {currentStep === 2 ? <SelfieCapture /> : null}
        {currentStep === 3 ? <FaceVerification /> : null}
        {currentStep === 4 ? <VerificationResult /> : null}
      </motion.div>
    </div>
  );
}
