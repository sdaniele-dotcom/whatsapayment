import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { MAIN, HARDER } from "@/lib/programs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Loan options",
  description:
    "Conventional, FHA, VA, USDA, jumbo and bank-statement loans — who each one is for, what you put down, and the trade-off nobody mentions.",
};

export default function LoanOptions() {
  return (
    <>
      <Hero eyebrow="Loan options" title={<>There is more than one way to buy a house.</>}>
        <p>
          Most people are shown one loan and told that&rsquo;s the loan. Here is
          the whole shelf — who each one is actually for, what you put down, and
          the trade-off that usually goes unmentioned.
        </p>
      </Hero>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {MAIN.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col rounded-2xl border border-warm-deep bg-white p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-extrabold text-navy">
                  {p.name}
                </h2>
                <span className="rounded-full bg-warm px-3 py-1 text-[12px] font-bold text-navy">
                  {p.down}
                </span>
              </div>
              <p className="mt-2.5 font-display text-[18px] font-semibold text-amber-600">
                {p.hook}
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                {p.forYou}
              </p>
              <p className="mt-4 border-t border-warm pt-4 text-[16px] leading-relaxed text-muted">
                <span className="font-semibold text-navy">The trade-off: </span>
                {p.tradeoff}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <p className="eyebrow text-amber-600">When the answer was no</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            Turned down somewhere else? It is worth asking again.
          </h2>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-muted">
            These are the programs people only find out about because they
            asked. If a lender has already told you no, it is worth one more
            call before you give up on the house.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HARDER.map((h) => (
              <div key={h.name} className="rounded-2xl bg-white p-6">
                <h3 className="font-display text-[18px] font-bold text-navy">
                  {h.name}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">
                  {h.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="rounded-3xl bg-navy px-7 py-12 text-center text-white sm:px-14">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Not sure which one you&rsquo;re in?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[18px] leading-relaxed text-muted-navy">
            That&rsquo;s the normal starting point. Tell us the house and
            we&rsquo;ll price every option you qualify for, side by side.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/payment-calculator/"
              className="rounded-full bg-amber px-7 py-3.5 text-[16px] font-semibold text-navy transition-opacity hover:opacity-90"
            >
              Run the numbers
            </Link>
            <a
              href={site.bookingUrl}
              className="rounded-full border border-white/35 px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book a call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
