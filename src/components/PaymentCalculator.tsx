"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";

/*
  The brand guide's rule: rate/APR, a date and the assumptions sit next to any
  payment. The rate here is an INPUT, not a quote we are publishing, and the
  output restates it with today's date and the assumptions underneath so the
  figure can never travel on its own.

  No APR is shown. APR folds in lender fees, which vary by file — computing one
  from a rate alone would produce a number that looks authoritative and is
  wrong, and APR is exactly the figure people compare lenders on.
*/

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Standard amortising payment. Handles the 0% case rather than dividing by zero. */
function principalAndInterest(loan: number, annualRate: number, years: number): number {
  const n = years * 12;
  if (loan <= 0 || n <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
  max,
  slider = false,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  slider?: boolean;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-[14px] font-semibold text-navy">{label}</span>
        {hint && <span className="text-[14px] text-muted">{hint}</span>}
      </span>
      <span className="mt-1.5 flex items-center rounded-xl border border-warm-deep bg-white focus-within:border-amber focus-within:ring-2 focus-within:ring-amber/30">
        {prefix && <span className="pl-3 text-[16px] text-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-transparent px-3 py-2.5 text-[16px] font-medium text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && (
          <span className="whitespace-nowrap pr-3 text-[16px] text-muted">{suffix}</span>
        )}
      </span>
      {slider && max !== undefined && (
        <input
          aria-label={`${label} slider`}
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="mt-2.5 w-full accent-[var(--amber)]"
        />
      )}
    </label>
  );
}

export function PaymentCalculator() {
  const [price, setPrice] = useState(650_000);
  const [downPct, setDownPct] = useState(5);
  const [rate, setRate] = useState(6.875);
  const [years, setYears] = useState(30);
  const [taxPct, setTaxPct] = useState(1.25);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);

  const r = useMemo(() => {
    const down = price * (downPct / 100);
    const loan = Math.max(0, price - down);
    const pi = principalAndInterest(loan, rate, years);
    const tax = (price * (taxPct / 100)) / 12;
    const ins = insurance / 12;
    // Mortgage insurance is a rough mid-range estimate and only applies under
    // 20% down; it is labelled as an estimate in the breakdown.
    const mi = downPct >= 20 ? 0 : (loan * 0.0055) / 12;
    return { down, loan, pi, tax, ins, mi, total: pi + tax + ins + mi + hoa };
  }, [price, downPct, rate, years, taxPct, insurance, hoa]);

  const asOf = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
      {/* Inputs */}
      <div className="rounded-2xl border border-warm-deep bg-warm/40 p-6 sm:p-7">
        <h2 className="font-display text-xl font-bold text-navy">Your numbers</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Home price" value={price} onChange={setPrice} prefix="$" step={5000} min={50000} max={5000000} slider />
          </div>
          <Field label="Down payment" value={downPct} onChange={setDownPct} suffix="%" step={0.5} min={0} max={50} slider hint={money(r.down)} />
          <Field label="Interest rate" value={rate} onChange={setRate} suffix="%" step={0.125} min={1} max={14} slider />
          <Field label="Loan term" value={years} onChange={setYears} suffix="yrs" step={5} min={10} max={30} />
          <Field label="Property tax" value={taxPct} onChange={setTaxPct} suffix="% / yr" step={0.05} min={0} max={4} />
          <Field label="Home insurance" value={insurance} onChange={setInsurance} prefix="$" suffix="/ yr" step={100} min={0} />
          <Field label="HOA dues" value={hoa} onChange={setHoa} prefix="$" suffix="/ mo" step={25} min={0} />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl bg-navy p-7 text-white sm:p-8">
        <p className="eyebrow text-amber">Estimated monthly payment</p>
        <p className="figure mt-3 text-[3.2rem] leading-none sm:text-6xl">
          {money(r.total)}
        </p>
        <p className="mt-2 text-[16px] text-muted-navy">
          {money(r.loan)} loan · {downPct}% down · {years}-year fixed
        </p>

        <dl className="mt-7 flex flex-col gap-3 border-t border-white/15 pt-6 text-[16px]">
          {[
            ["Principal & interest", money(r.pi)],
            ["Property taxes", money(r.tax)],
            ["Home insurance", money(r.ins)],
            ...(r.mi > 0 ? [["Mortgage insurance (est.)", money(r.mi)] as const] : []),
            ...(hoa > 0 ? [["HOA dues", money(hoa)] as const] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-muted-navy">{k}</dt>
              <dd className="font-semibold tabular-nums">{v}</dd>
            </div>
          ))}
          <div className="mt-1 flex justify-between gap-4 border-t border-white/15 pt-3">
            <dt className="font-bold">Total monthly</dt>
            <dd className="figure text-[20px]">{money(r.total)}</dd>
          </div>
        </dl>

        {/* The guide's rule, rendered: rate, date, assumptions, beside the figure. */}
        <p className="mt-6 rounded-xl bg-white/10 p-4 text-[14px] leading-relaxed text-muted-navy">
          At <strong className="text-white">{rate}%</strong> on a {years}-year
          fixed, as entered on {asOf}. Assumes an owner-occupied purchase, taxes
          at {taxPct}% of the price per year, and mortgage insurance estimated
          at a mid-range rate where the down payment is under 20%. Not a quote,
          not an APR, and not a commitment to lend — your actual rate, APR and
          payment depend on credit, income, assets, property and program.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={site.bookingUrl}
            className="rounded-full bg-amber px-6 py-3 text-[16px] font-semibold text-navy transition-opacity hover:opacity-90"
          >
            Get a real quote
          </a>
          <a
            href={`tel:${site.phoneHref}`}
            className="rounded-full border border-white/35 px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
