"use client";

import { motion, useReducedMotion } from "framer-motion";

const points = [
  {
    title: "Encrypted processing",
    description:
      "Verification media is transferred over HTTPS and handled in controlled server workflows.",
  },
  {
    title: "Privacy-first design",
    description:
      "Embeddings and identity images are never exposed to the browser as raw biometric data.",
  },
  {
    title: "Minimal retention",
    description:
      "Temporary files are deleted after verification. Sessions expire automatically.",
  },
  {
    title: "Secure decisions",
    description:
      "Match, review, and fail thresholds stay on the server — never revealed to clients.",
  },
];

export function SecuritySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="security" className="border-t border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="section-eyebrow">Security</p>
            <h2 className="section-title mt-4">Built for sensitive identity data.</h2>
            <p className="section-copy">
              Trustora is designed as an identity-security product — careful with biometrics,
              clear with outcomes, and restrained in what it stores.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--border)] sm:grid-cols-2">
            {points.map((point, index) => (
              <motion.article
                key={point.title}
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-[var(--background-elevated)] p-7"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {point.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
