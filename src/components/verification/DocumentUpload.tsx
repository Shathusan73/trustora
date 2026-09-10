"use client";

import { useRef, useState } from "react";
import {
  Upload,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentPreview } from "./DocumentPreview";
import { DocumentProcessing } from "./DocumentProcessing";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setDocumentPreview,
  setDocumentType,
  setProcessingMessage,
  setDocumentIntelligence,
  clearDocumentPreview,
} from "@/store/slices/documentSlice";
import {
  setCurrentStep,
  setError,
  setStatus,
} from "@/store/slices/verificationSlice";
import { setIsSubmitting } from "@/store/slices/uiSlice";
import { uploadDocument } from "@/lib/api/verification";
import { ApiClientError } from "@/lib/api/client";
import type { DocumentType } from "@/lib/api/types";
import { cn } from "@/lib/utils";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

function asDocumentType(value: string | undefined | null): DocumentType | null {
  if (
    value === "Passport" ||
    value === "NationalId" ||
    value === "DrivingLicence" ||
    value === "Other"
  ) {
    return value;
  }
  return null;
}

export function DocumentUpload() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { previewUrl } = useAppSelector((s) => s.document);
  const { verificationId, error, status } = useAppSelector((s) => s.verification);
  const isSubmitting = useAppSelector((s) => s.ui.isSubmitting);

  function assignFile(file: File) {
    if (!ACCEPTED.includes(file.type)) {
      setLocalError("Please upload a valid JPG, PNG, or WEBP document photo.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setLocalError("File size exceeds 10 MB limit.");
      return;
    }

    setLocalError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      dispatch(clearDocumentPreview());
    }

    const url = URL.createObjectURL(file);
    fileRef.current = file;
    dispatch(
      setDocumentPreview({
        fileName: file.name,
        previewUrl: url,
        mimeType: file.type,
      })
    );
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) assignFile(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) assignFile(file);
  }

  async function handleContinue() {
    if (!verificationId) {
      dispatch(setError("Missing verification session. Restart from consent."));
      return;
    }
    if (!fileRef.current && !previewUrl) {
      setLocalError("Please select or drop your ID document photo to continue.");
      return;
    }
    if (!fileRef.current) {
      setLocalError("Please re-select the document file to upload.");
      return;
    }

    const file = fileRef.current;
    dispatch(setIsSubmitting(true));
    dispatch(setError(null));
    setLocalError(null);
    dispatch(setStatus("document_uploading"));
    dispatch(setProcessingMessage("Uploading document…"));

    try {
      dispatch(setStatus("document_processing"));
      dispatch(
        setProcessingMessage(
          "Detecting document type and extracting face features…"
        )
      );
      const data = await uploadDocument(verificationId, file);
      dispatch(
        setDocumentIntelligence({
          detectedType: data.detectedType ?? null,
          extractedName: data.extractedName ?? null,
          captureOk: data.captureOk ?? true,
          tamperRisk: data.tamperRisk ?? "None",
          needsReview: data.needsReview ?? false,
          warnings: data.warnings ?? [],
        })
      );
      const detected = asDocumentType(
        typeof data.detectedType === "string" ? data.detectedType : null
      );
      if (detected) {
        dispatch(setDocumentType(detected));
      }
      dispatch(
        setProcessingMessage(
          data.message ||
            "Document analyzed. Proceed to biometric camera check."
        )
      );
      dispatch(setCurrentStep(2));
      dispatch(setStatus("selfie_capture"));
    } catch (err) {
      const message =
        err instanceof ApiClientError
          ? err.message
          : "Document analysis failed. Please ensure all four corners are visible and legible.";
      dispatch(setError(message));
      dispatch(setStatus("idle"));
      dispatch(setProcessingMessage(null));
    } finally {
      dispatch(setIsSubmitting(false));
    }
  }

  const isProcessing =
    status === "document_uploading" || status === "document_processing";

  if (isProcessing) {
    return <DocumentProcessing />;
  }

  return (
    <Card className="relative overflow-hidden border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-elevated)]/90 via-[var(--surface)]/95 to-[var(--background-elevated)]/95 backdrop-blur-2xl">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-3xl"
        aria-hidden
      />

      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
            Upload identity document
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Passport, national ID, or driver&apos;s license — type is detected
            automatically from the photo.
          </p>
        </div>

        {!previewUrl ? (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-200 select-none",
              dragActive
                ? "border-emerald-400 bg-emerald-500/[0.06] shadow-[0_0_30px_rgba(110,231,183,0.15)]"
                : "border-[var(--border-strong)] bg-[var(--surface-elevated)]/40 hover:border-emerald-500/40 hover:bg-[var(--surface-hover)]/70"
            )}
          >
            <div className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-white/20 transition-colors group-hover:border-emerald-400/60" />
            <div className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-white/20 transition-colors group-hover:border-emerald-400/60" />
            <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/20 transition-colors group-hover:border-emerald-400/60" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white/20 transition-colors group-hover:border-emerald-400/60" />

            <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(110,231,183,0.1)] transition-transform duration-200 group-hover:scale-105">
              <Upload className="h-6 w-6" />
            </div>

            <p className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              Drag and drop your ID photo here
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              or{" "}
              <span className="font-medium text-emerald-400 underline underline-offset-2">
                browse files
              </span>{" "}
              from your computer or phone
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-[var(--muted-strong)]">
              <span>Supports JPG, PNG, WEBP</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Up to 10 MB</span>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={onInputChange}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
                Uploaded Document Preview
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Ready for Analysis
              </span>
            </div>
            <DocumentPreview
              onClear={() => {
                fileRef.current = null;
              }}
            />
          </div>
        )}

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 p-4">
          <p className="text-xs font-medium text-[var(--muted-strong)]">
            For fastest verification approval:
          </p>
          <div className="mt-2.5 grid grid-cols-1 gap-2 text-xs text-[var(--muted)] sm:grid-cols-3">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              All 4 corners fully visible
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Glare &amp; shadow free
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Sharp, high-resolution text
            </span>
          </div>
        </div>

        {(localError || error) && (
          <Alert variant="danger" title="Document Issue">
            {localError || error}
          </Alert>
        )}

        <div className="space-y-3 pt-1">
          <Button
            size="lg"
            className={cn(
              "group relative h-13 w-full overflow-hidden text-base font-semibold shadow-lg transition-all duration-300",
              previewUrl
                ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-black shadow-[0_8px_30px_rgba(110,231,183,0.25)] hover:shadow-[0_12px_40px_rgba(110,231,183,0.35)] hover:brightness-105"
                : "opacity-60 cursor-not-allowed"
            )}
            disabled={isSubmitting || !previewUrl}
            onClick={handleContinue}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Detecting document…</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Continue to Face Scan</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            )}
          </Button>

          {!previewUrl && (
            <p className="text-center text-xs text-[var(--muted)]">
              Upload your document above to continue to the face scan.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
