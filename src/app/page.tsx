import Link from "next/link";
import { LogoIcon } from "@/components/Logo";
import { site } from "@/lib/site";

/*
  Voice, from the brand guide: warm, clear and real — a trusted friend who
  happens to know lending. Lead with the payment, explain it simply, skip the
  jargon and the pressure.

  Every figure on this page is a clearly-labelled EXAMPLE with its rate, APR,
  date and assumptions beside it, which is the guide's rule for any payment
  that appears anywhere.
*/

const STEPS = [
  {
    n: "01",
    title: "Tell us the house",
    body: "An address, or just a price and a zip code. No application, no credit pull, no forms to sign.",
  },
  {
    n: "02",
    title: "We price it properly",
    body: "A real loan officer runs it across every program you qualify for and sends the options side by side.",
  },
  {
    n: "03",
    title: "You pick a payment",
    body: "You see the monthly number, what's in it, and what it takes to get there. Then you decide — no pressure.",
  },
];

const OPTIONS = [
  { name: "Conventional", line: "As little as 3% down, and the mortgage insurance comes off later." },
  { name: "FHA", line: "3.5% down with room for thinner credit or a higher debt load." },
  { name: "VA", line: "Served? Nothing down and no monthly mortgage insurance." },
  { name: "Jumbo", line: "Above the conforming limit — the coastal California price points." },
  { name: "Bank statement", line: "Self-employed and your tax returns don't show what you really make." },
  { name: "Down payment help", line: "Thousands of California programs. Most buyers never find out they qualify." },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <LogoIcon
          tone="white"
          className="pointer-events-none absolute -right-10 top-4 h-[420px] w-auto opacity-[0.07] sm:right-6 lg:h-[560px]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 lg:py-28">
          <p className="eyebrow text-amber">Home loans, explained simply</p>
          <h1 className="mt-5 max-w-3xl text-[2.6rem] font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            What would it cost to <span className="highlight">own?</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-navy sm:text-xl">
            Tell us the house. We&rsquo;ll tell you the payment — with the rate,
            the APR and the assumptions right next to it. No jargon, no
            pressure, and no credit pull to get started.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/payment-calculator/"
              className="rounded-full bg-amber px-7 py-3.5 text-[16px] font-semibold text-navy transition-opacity hover:opacity-90"
            >
              See your payment
            </Link>
            <a
              href={site.bookingUrl}
              className="rounded-full border border-white/35 px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to a human
            </a>
          </div>

          <p className="mt-7 text-[14px] text-muted-navy/80">
            Licensed in California · {site.licensee} · NMLS #{site.companyNmls}
          </p>
        </div>
      </section>

      {/* ── A worked example ─────────────────────────────────────── */}
      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="eyebrow text-amber-600">What you actually get</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                A number you can act on, not a range you can&rsquo;t.
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">
                Most lenders answer &ldquo;it depends.&rdquo; We answer with the
                monthly figure, what sits inside it, and the rate and APR it
                came from — so you can compare it with anything else on your
                kitchen table.
              </p>
              <ul className="mt-7 flex flex-col gap-3.5">
                {[
                  "Every option you qualify for, priced side by side",
                  "Principal, interest, taxes, insurance and HOA — all in",
                  "The rate, the APR, the date and the assumptions, every time",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[16px] text-ink/85">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden>
                      <circle cx="12" cy="12" r="11" fill="#1f3a5f" />
                      <path d="M7.5 12.4l3 3 6-6.4" stroke="#e89b0c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* An example card, labelled as one. */}
            <div className="rounded-2xl bg-white p-7 shadow-[0_12px_40px_rgba(31,58,95,0.10)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-muted">Example · 30-year fixed</p>
                  <p className="mt-1 font-display text-[19px] font-bold text-navy">
                    $650,000 · 5% down
                  </p>
                </div>
                <span className="rounded-full bg-navy px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Sample
                </span>
              </div>

              <p className="figure mt-6 text-5xl text-navy sm:text-6xl">$4,812</p>
              <p className="mt-1 text-[15px] text-muted">per month, all in</p>

              <dl className="mt-7 flex flex-col gap-2.5 border-t border-warm pt-5 text-[15px]">
                {[
                  ["Principal & interest", "$3,944"],
                  ["Taxes & insurance", "$702"],
                  ["Mortgage insurance", "$166"],
                  ["Rate / APR", "6.875% / 7.042%"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-semibold tabular-nums text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
                Illustration only, not a quote. Assumes 760 FICO, owner-occupied
                single family, 30-day lock. Your rate, APR and payment depend on
                credit, income, assets, property and program. Not a commitment
                to lend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <p className="eyebrow text-amber-600">How it works</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
          Three steps, and none of them is a form.
        </h2>

        <div className="mt-11 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-warm-deep bg-white p-7">
              <p className="figure text-3xl text-amber">{s.n}</p>
              <h3 className="mt-3 text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-2.5 text-[16px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Loan options ─────────────────────────────────────────── */}
      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-amber-600">Loan options</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                There is more than one way to buy a house.
              </h2>
            </div>
            <Link
              href="/loan-options/"
              className="rounded-full border-2 border-navy px-6 py-3 text-[15px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              See all options
            </Link>
          </div>

          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OPTIONS.map((o) => (
              <div key={o.name} className="rounded-2xl bg-white p-6">
                <h3 className="font-display text-[19px] font-bold text-navy">{o.name}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{o.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing band ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="rounded-3xl bg-navy px-7 py-14 text-center text-white sm:px-14">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            So — what&rsquo;s a payment on the place you&rsquo;re looking at?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-navy">
            Run it yourself in about a minute, or send us the address and
            we&rsquo;ll price it properly and send the options back.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/payment-calculator/"
              className="rounded-full bg-amber px-7 py-3.5 text-[16px] font-semibold text-navy transition-opacity hover:opacity-90"
            >
              Run the numbers
            </Link>
            <Link
              href="/contact/"
              className="rounded-full border border-white/35 px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Send us the address
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
