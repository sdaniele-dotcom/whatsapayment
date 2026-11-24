import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From the first question to the keys: what happens, how long each part takes, and what we need from you.",
};

const STAGES = [
  {
    n: "01",
    title: "Ask",
    when: "Same day",
    body: "Send an address, or a price and a zip code. We price it across every program you qualify for and send the options back side by side. No application, no credit pull, nothing to sign.",
  },
  {
    n: "02",
    title: "Get pre-approved",
    when: "1 – 2 days",
    body: "When you're ready to write offers, we verify income, assets and credit properly. A real pre-approval makes your offer competitive; a pre-qualification mostly doesn't.",
  },
  {
    n: "03",
    title: "Find the house",
    when: "However long it takes",
    body: "Your agent does what they do best. We stay reachable for the \"what would this one cost?\" question, which is usually the one holding up a decision.",
  },
  {
    n: "04",
    title: "Lock and process",
    when: "About 2 – 3 weeks",
    body: "Offer accepted. We lock the rate, order the appraisal, and work the file. You'll hear from us before you have to chase us.",
  },
  {
    n: "05",
    title: "Close",
    when: "Day 21 – 30",
    body: "You sign, the loan funds, and the house is yours. We tell you the final number well before signing day — no surprises at the table.",
  },
];

const DOCS = [
  "Two most recent pay stubs",
  "Last two years of W-2s or tax returns",
  "Two months of bank statements",
  "Photo ID",
  "Self-employed? Twelve months of business bank statements instead",
];

export default function HowItWorks() {
  return (
    <>
      <Hero eyebrow="How it works" title={<>From first question to keys in hand.</>}>
        <p>
          Nobody explains the order these things happen in, which is why it
          feels opaque. Here is the whole thing, with honest timing.
        </p>
      </Hero>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:py-20">
        <ol className="flex flex-col gap-5">
          {STAGES.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border border-warm-deep bg-white p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="figure text-2xl text-amber">{s.n}</span>
                <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                  {s.title}
                </h2>
                <span className="ml-auto rounded-full bg-warm px-3 py-1 text-[12.5px] font-bold text-navy">
                  {s.when}
                </span>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-4xl px-5 py-16 lg:py-20">
          <p className="eyebrow text-amber-600">What we&rsquo;ll ask for</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            The paperwork, up front, so it isn&rsquo;t a surprise.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            None of this is needed to find out what a payment would be. This is
            what a pre-approval takes.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {DOCS.map((d) => (
              <li key={d} className="flex gap-3 rounded-xl bg-white p-4 text-[15.5px] text-ink/85">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden>
                  <circle cx="12" cy="12" r="11" fill="#1f3a5f" />
                  <path d="M7.5 12.4l3 3 6-6.4" stroke="#e89b0c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="rounded-3xl bg-navy px-7 py-12 text-center text-white sm:px-14">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Start at step one. It costs nothing.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/payment-calculator/"
              className="rounded-full bg-amber px-7 py-3.5 text-[16px] font-semibold text-navy transition-opacity hover:opacity-90"
            >
              Run a payment
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
