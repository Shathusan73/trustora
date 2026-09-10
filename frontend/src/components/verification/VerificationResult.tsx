"use client";

import { useAppSelector } from "@/store/hooks";
import { VerificationSuccess } from "./VerificationSuccess";
import { VerificationFailed } from "./VerificationFailed";

export function VerificationResult() {
  const status = useAppSelector((s) => s.verification.status);

  if (status === "verified") {
    return <VerificationSuccess />;
  }

  if (status === "review_required") {
    return <VerificationFailed reviewRequired />;
  }

  return <VerificationFailed />;
}
