"use client";

import { X, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearDocumentPreview } from "@/store/slices/documentSlice";

interface DocumentPreviewProps {
  onClear?: () => void;
}

export function DocumentPreview({ onClear }: DocumentPreviewProps) {
  const dispatch = useAppDispatch();
  const { previewUrl, fileName } = useAppSelector((s) => s.document);

  if (!previewUrl) return null;

  function handleClear() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    dispatch(clearDocumentPreview());
    onClear?.();
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-[var(--surface)]/90 shadow-xl backdrop-blur-md">
      {/* Top status bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-medium text-[var(--foreground)]">
            Document Image Loaded
          </span>
        </div>
        <p className="max-w-[200px] truncate text-[11px] text-[var(--muted)] sm:max-w-xs">
          {fileName}
        </p>
      </div>

      {/* Image Preview Box */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt={fileName ? `Preview of ${fileName}` : "Document preview"}
          className="h-full w-full object-contain p-3 transition-transform duration-300 hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 border border-white/5" />
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-elevated)]/60 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <FileText className="h-3.5 w-3.5 text-emerald-400" />
          <span>Biometric crop ready</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="h-8 text-xs text-[var(--danger)] hover:bg-[var(--danger)]/10 hover:text-[var(--danger-hover)]"
        >
          <X className="mr-1 h-3.5 w-3.5" aria-hidden />
          Replace Document
        </Button>
      </div>
    </div>
  );
}
