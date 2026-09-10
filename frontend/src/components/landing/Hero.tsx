"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pipeline = [
  { n: "01", label: "Document" },
  { n: "02", label: "Face detection" },
  { n: "03", label: "AI analysis" },
  { n: "04", label: "Verified" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 trustora-grid" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
        <div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-display mb-5 text-sm font-medium tracking-[0.28em] text-[var(--accent-secondary)] uppercase"
          >
            Trustora
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display max-w-xl text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.5rem]"
          >
            Verify identity
            <span className="block text-[var(--muted-strong)]">with confidence.</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[var(--muted)]"
          >
            Secure AI-powered identity and face verification designed for fast,
            reliable, and privacy-conscious checks.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/verify">
              <Button size="lg" className="w-full sm:w-auto">
                Start verification
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                How it works
              </Button>
            </a>
          </motion.div>

          <p className="mt-8 text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
            Trusted · Secure · Private
          </p>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="glass-panel relative overflow-hidden rounded-[1.35rem] p-7 sm:p-8"
          aria-label="Verification pipeline visualization"
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--accent)]/10 blur-3xl"
            aria-hidden
          />
          <p className="mb-7 text-xs font-medium tracking-[0.18em] text-[var(--muted)] uppercase">
            Verification path
          </p>

          <ol className="relative space-y-0">
            {pipeline.map((step, index) => (
              <li key={step.label} className="relative flex gap-4 pb-7 last:pb-0">
                {index < pipeline.length - 1 ? (
                  <span
                    className="absolute left-[15px] top-9 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-[var(--accent)]/50 to-[var(--border)]"
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/35 bg-[var(--background)] font-mono text-[11px] text-[var(--accent)]">
                  {step.n}
                </span>
                <div className="pt-1">
                  <p className="font-display text-lg font-medium tracking-tight">
                    {step.label}
                  </p>
                  {index === pipeline.length - 1 ? (
                    <p className="mt-1 text-sm text-[var(--success)]">Decision ready</p>
                  ) : (
                    <p className="mt-1 text-sm text-[var(--muted)]">Secure processing</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
