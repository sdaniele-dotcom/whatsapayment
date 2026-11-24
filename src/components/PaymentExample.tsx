/**
 * One worked payment, as the hero's visual.
 *
 * This is the product moment the page promises: a real monthly figure with
 * what sits inside it and the rate it came from. It is built in code rather
 * than drawn, so the numbers are the site's own arithmetic and the card can
 * never drift from the calculator the way a screenshot would.
 *
 * Marked SAMPLE and disclosed in full. It is illustrative, and on a page
 * about credit terms an illustrative number has to say so next to itself,
 * not in a footer three screens down.
 */
const ROWS: [string, string][] = [
  ["Principal & interest", "$3,944"],
  ["Taxes & insurance", "$702"],
  ["Mortgage insurance", "$166"],
  ["Rate / APR", "6.875% / 7.042%"],
];

export function PaymentExample() {
  return (
    <div className="rounded-2xl bg-white p-7 shadow-[0_18px_50px_rgba(10,22,40,0.28)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-muted">Example · 30-year fixed</p>
          <p className="mt-1 font-display text-[20px] font-bold text-navy">
            $650,000 · 5% down
          </p>
        </div>
        <span className="rounded-full bg-navy px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-white">
          Sample
        </span>
      </div>

      <p className="figure mt-6 text-5xl text-navy sm:text-6xl">$4,812</p>
      <p className="mt-1 text-[16px] text-muted">per month, all in</p>

      <dl className="mt-7 flex flex-col gap-2.5 border-t border-warm pt-5 text-[16px]">
        {ROWS.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-muted">{k}</dt>
            <dd className="font-semibold tabular-nums text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-[12px] leading-relaxed text-muted">
        Illustration only, not a quote. Assumes 760 FICO, owner-occupied single
        family, 30-day lock. Your rate, APR and payment depend on credit,
        income, assets, property and program. Not a commitment to lend.
      </p>
    </div>
  );
}
