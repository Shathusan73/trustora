import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "Trustora privacy policy for identity verification.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-16 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <div className="mt-8 space-y-5 text-[var(--muted)] leading-relaxed">
          <p>
            Trustora processes identity documents and face images solely to complete
            verification requests you initiate. Data is transmitted securely to the
            verification API configured for this deployment.
          </p>
          <p>
            Temporary image previews may be created in your browser as object URLs
            for user review and are revoked when you remove them or leave the flow.
            We do not permanently store raw identity images in client application state.
          </p>
          <p>
            By starting verification, you consent to this processing for the purpose
            of confirming identity. Contact your deployment administrator for data
            retention details specific to your environment.
          </p>
          <p>
            See also our{" "}
            <Link href="/terms" className="text-[var(--accent)] underline-offset-2 hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
