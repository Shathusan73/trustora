"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Upload your ID",
    description:
      "Passport, national ID, or driving licence — one clear identity photo.",
  },
  {
    n: "02",
    title: "Capture your face",
    description:
      "Automatic face capture with eyes, nose, mouth and outline detection.",
  },
  {
    n: "03",
    title: "AI verifies your identity",
    description:
      "Embedding-based matching and liveness checks return a clear result.",
  },
];

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="border-t border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="section-eyebrow">How it works</p>
          <h2 className="section-title mt-4">Identity verification, redesigned.</h2>
          <p className="section-copy">
            Three focused steps. No dashboards, no clutter — only what the user needs.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <motion.article
              key={step.n}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative"
            >
              <p className="font-display text-5xl font-semibold tracking-tight text-[var(--accent)]/25">
                {step.n}
              </p>
              <h3 className="font-display mt-4 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
