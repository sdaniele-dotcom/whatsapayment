import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { PaymentCalculator } from "@/components/PaymentCalculator";
import { ESTIMATE_DISCLOSURE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payment calculator",
  description:
    "Work out the monthly payment on a house — principal, interest, taxes, insurance and HOA, with the rate and assumptions shown beside the figure.",
};

export default function CalculatorPage() {
  return (
    <>
      <Hero eyebrow="Payment calculator" title={<>So, what&rsquo;s a payment?</>}>
        <p>
          Move the numbers until they look like your situation. Everything
          updates as you type, nothing is sent anywhere, and there is no form
          at the end of it.
        </p>
      </Hero>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:py-16">
        <PaymentCalculator />
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:py-16">
          <div className="grid gap-9 lg:grid-cols-3">
            <div>
              <h2 className="font-display text-xl font-bold text-navy">
                What this includes
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">
                Principal and interest, property taxes, home insurance, HOA
                dues, and mortgage insurance when the down payment is under
                20%. That is the whole monthly number. Most quotes show you
                a slice of it.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-navy">
                What it can&rsquo;t know
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">
                Your credit, your debts, the actual tax bill on that parcel, or
                what insurance will really cost on that roof. Those move the
                number, sometimes by a lot.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-navy">
                Getting the real one
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">
                Send us the address. A loan officer prices it across every
                program you qualify for and sends the options back side by
                side, with the rate and APR on each.
              </p>
            </div>
          </div>
          <p className="mt-10 border-t border-warm-deep pt-6 text-[14px] leading-relaxed text-muted">
            {ESTIMATE_DISCLOSURE}
          </p>
        </div>
      </section>
    </>
  );
}
