"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#security", label: "Security" },
  { href: "/#technology", label: "Technology" },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)]",
        className
      )}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 1.5L15.5 4.2V8.8C15.5 12.6 12.7 15.7 9 16.5C5.3 15.7 2.5 12.6 2.5 8.8V4.2L9 1.5Z"
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="8.2" r="2.2" stroke="var(--accent)" strokeWidth="1.3" />
        <path
          d="M6.8 11.2C7.4 10.5 8.2 10.1 9 10.1C9.8 10.1 10.6 10.5 11.2 11.2"
          stroke="var(--accent)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--background)]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <div className="leading-tight">
            <span className="font-display block text-[1.05rem] font-semibold tracking-tight">
              Trustora
            </span>
            <span className="hidden text-[11px] text-[var(--muted)] sm:block">
              Identity Verification
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/verify">
            <Button size="sm">Start verification</Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-[var(--border)] bg-[var(--background)]/95 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-3 text-sm text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/verify" onClick={() => setOpen(false)} className="mt-2">
            <Button className="w-full">Start verification</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export { LogoMark };
