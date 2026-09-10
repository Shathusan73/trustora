import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="border-t border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border-strong)] bg-[var(--surface)] px-8 py-14 sm:px-14 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(165,180,200,0.12),_transparent_55%)]"
            aria-hidden
          />
          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Start secure verification
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-[var(--muted)]">
              Consent, document, face, result — a calm path to a trusted identity decision.
            </p>
            <div className="mt-8">
              <Link href="/verify">
                <Button size="lg">
                  Start verification
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
