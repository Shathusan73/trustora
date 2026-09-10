import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock } from "lucide-react";
import { LogoMark } from "@/components/landing/Header";
import { VerificationFlow } from "@/components/verification/VerificationFlow";

export const metadata = {
  title: "Start Identity Verification | Trustora",
  description: "Secure, automated biometric identity verification powered by Trustora AI.",
};

export default function VerifyPage() {
  return (
    <div className="relative min-h-full flex-1 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 trustora-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/[0.04] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 -left-40 h-[400px] w-[600px] rounded-full bg-blue-500/[0.03] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-2/3 -right-40 h-[400px] w-[600px] rounded-full bg-emerald-500/[0.03] blur-[100px]"
        aria-hidden
      />

      {/* Top Navigation Header */}
      <header className="relative border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <LogoMark />
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-display text-[1.1rem] font-semibold tracking-tight">
                  Trustora
                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-emerald-400">
                  IDV
                </span>
              </div>
              <span className="hidden text-[11px] text-[var(--muted)] sm:block">
                Automated Identity Assurance
              </span>
            </div>
          </Link>

          {/* Security status badge & Exit link */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-3 py-1 text-xs text-[var(--muted-strong)] shadow-sm sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>256-Bit TLS 1.3 Encrypted</span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-all hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Exit</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Flow Area */}
      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
        <VerificationFlow />
      </main>
    </div>
  );
}
