import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Terms of Service",
  description: "Trustora terms of service for identity verification.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <div className="mt-8 space-y-5 text-[var(--muted)] leading-relaxed">
          <p>
            Trustora provides AI-assisted identity verification tools. You agree to
            submit only documents and biometric captures that you are authorized to use,
            and to use the service for lawful verification purposes.
          </p>
          <p>
            Verification outcomes may include verified, failed, or review-required
            statuses based on available signals. Trustora does not guarantee acceptance
            by any third party relying party.
          </p>
          <p>
            Misuse, fraud attempts, or unauthorized access may result in denied
            verification and further action by the service operator.
          </p>
          <p>
            Review our{" "}
            <Link href="/privacy" className="text-[var(--accent)] underline-offset-2 hover:underline">
              Privacy Policy
            </Link>{" "}
            for how verification data is handled.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
