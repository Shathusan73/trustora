import Link from "next/link";
import { LogoMark } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-display text-lg font-semibold tracking-tight">Trustora</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            Premium AI identity verification for documents and faces.
          </p>
        </div>

        <div className="flex gap-14 text-sm">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.16em] text-[var(--muted)] uppercase">Product</p>
            <Link href="/verify" className="block text-[var(--muted-strong)] hover:text-[var(--foreground)]">
              Verify
            </Link>
            <a href="/#how-it-works" className="block text-[var(--muted-strong)] hover:text-[var(--foreground)]">
              How it works
            </a>
          </div>
          <div className="space-y-3">
            <p className="text-xs tracking-[0.16em] text-[var(--muted)] uppercase">Legal</p>
            <Link href="/privacy" className="block text-[var(--muted-strong)] hover:text-[var(--foreground)]">
              Privacy
            </Link>
            <Link href="/terms" className="block text-[var(--muted-strong)] hover:text-[var(--foreground)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-4 text-xs text-[var(--muted)] sm:px-6">
        © {new Date().getFullYear()} Trustora
      </div>
    </footer>
  );
}
