"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FaceGuideProps {
  className?: string;
}

export function FaceGuide({ className }: FaceGuideProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className
      )}
      aria-hidden
    >
      {/* Darkened vignette around face */}
      <div className="relative h-[72%] w-[60%] max-w-[280px]">
        {/* The Oval Target with Dark Backdrop Mask */}
        <div className="absolute inset-0 rounded-[48%] border-2 border-emerald-400/50 shadow-[0_0_0_9999px_rgba(8,9,11,0.65)]" />

        {/* Animated Radiant Pulse Ring */}
        <motion.div
          animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-[48%] border border-emerald-400/60"
        />

        {/* Biometric Alignment Markers */}
        <span className="absolute -left-2 top-1/3 h-8 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
        <span className="absolute -right-2 top-1/3 h-8 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
        <span className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
        <span className="absolute -top-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />

        {/* Eye-level target indicators */}
        <div className="absolute top-[42%] left-6 right-6 flex items-center justify-between opacity-40">
          <div className="h-2 w-2 rounded-full border border-emerald-300" />
          <div className="h-[1px] flex-1 border-b border-dashed border-emerald-300/40 mx-2" />
          <div className="h-2 w-2 rounded-full border border-emerald-300" />
        </div>
      </div>
    </div>
  );
}
