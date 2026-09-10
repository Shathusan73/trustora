"use client";

import { motion, useReducedMotion } from "framer-motion";

const capabilities = [
  { title: "Face detection", detail: "Locate a single clear face in documents and selfies." },
  { title: "Face landmarks", detail: "Eyes, nose, mouth and outline for alignment." },
  { title: "Face alignment", detail: "Normalize pose before recognition." },
  { title: "Face recognition", detail: "ArcFace embeddings — never raw pixel compare." },
  { title: "Liveness detection", detail: "Passive checks to reduce obvious spoof attempts." },
];

export function TechnologySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="technology" className="border-t border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Technology</p>
          <h2 className="section-title mt-4">AI that stays behind the curtain.</h2>
          <p className="section-copy">
            Users see simple human states. The models do the hard work server-side.
          </p>
        </div>

        <div className="mt-14 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="grid gap-2 py-6 sm:grid-cols-[240px_1fr] sm:items-baseline sm:gap-10"
            >
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-[15px] text-[var(--muted)]">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
