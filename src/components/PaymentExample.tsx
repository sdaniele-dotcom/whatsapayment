/**
 * One worked payment, as the hero's visual.
 *
 * This is the product moment the page promises: a real monthly figure with
 * what sits inside it and the rate it came from.
 *
 * THE NUMBERS ARE COMPUTED, NOT TYPED, and that is the whole point of this
 * file. They used to be hardcoded strings under a comment claiming they were
 * "the site's own arithmetic" and so "can never drift from the calculator".
 * They had drifted: principal and interest read $3,944 against a stated
 * 6.875% on $617,500, where the correct figure is $4,056.54. The advertised
 * all-in was $4,812 when it should have been $4,925 — a payment understated
 * by $112 a month on a consumer page, next to an APR.
 *
 * $3,944 is the payment for 6.601%, or for about 8% down. It was almost
 * certainly correct for an earlier scenario and was left behind when the
 * inputs around it changed. A typed number cannot notice that; a computed
 * one cannot do it at all. So the inputs are the only thing stated here, and
 * amortize() is the same formula the calculator uses.
 *
 * APR stays a stated figure. It folds in lender fees, which are not inputs
 * here, so it cannot be derived from the scenario — if the fee assumption
 * behind it changes, this constant has to change with it.
 *
 * Marked SAMPLE and disclosed in full. It is illustrative, and on a page
 * about credit terms an illustrative number has to say so next to itself,
 * not in a footer three screens down.
 */

/** The scenario. Everything else on the card follows from these. */
const PRICE = 650_000;
const DOWN_PCT = 5;
const RATE_PCT = 6.875;
const YEARS = 30;

/** Monthly escrow and MI for the scenario, from the pricing sheet. */
const TAXES_AND_INSURANCE = 702;
const MORTGAGE_INSURANCE = 166;

/** Stated, not derived — see the note above. */
const APR_PCT = 7.042;

/** The standard amortisation formula, as in PaymentCalculator. */
function amortize(loan: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (loan <= 0 || n <= 0) return 0;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

const LOAN = PRICE * (1 - DOWN_PCT / 100);
const PI = amortize(LOAN, RATE_PCT, YEARS);
const TOTAL = PI + TAXES_AND_INSURANCE + MORTGAGE_INSURANCE;

const money = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

const ROWS: [string, string][] = [
  ["Principal & interest", money(PI)],
  ["Taxes & insurance", money(TAXES_AND_INSURANCE)],
  ["Mortgage insurance", money(MORTGAGE_INSURANCE)],
  ["Rate / APR", `${RATE_PCT}% / ${APR_PCT}%`],
];

export function PaymentExample() {
  return (
    <div className="rounded-2xl bg-white p-7 shadow-[0_18px_50px_rgba(10,22,40,0.28)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-muted">Example · {YEARS}-year fixed</p>
          <p className="mt-1 font-display text-[20px] font-bold text-navy">
            {money(PRICE)} · {DOWN_PCT}% down
          </p>
        </div>
        <span className="rounded-full bg-navy px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-white">
          Sample
        </span>
      </div>

      <p className="figure mt-6 text-5xl text-navy sm:text-6xl">{money(TOTAL)}</p>
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
