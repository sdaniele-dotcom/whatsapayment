/**
 * Loan options, written for a buyer rather than an agent.
 *
 * The facts here (down payments, who qualifies, the trade-offs) come from the
 * loan-programs data already published on crushyourmarket.com. Nothing is
 * invented: where a figure would vary by file, the copy says so instead of
 * naming a number.
 */

export type Program = {
  slug: string;
  name: string;
  hook: string;
  down: string;
  forYou: string;
  tradeoff: string;
};

/** The programs most buyers end up in. */
export const MAIN: Program[] = [
  {
    slug: "conventional",
    name: "Conventional",
    hook: "The default, and usually the cheapest over time.",
    down: "3% – 20% down",
    forYou:
      "You have reasonable credit and some savings. Put less than 20% down and you'll pay mortgage insurance — but unlike FHA, it comes off once you've built enough equity.",
    tradeoff: "Stricter on credit and debt than FHA.",
  },
  {
    slug: "fha",
    name: "FHA",
    hook: "Built for buyers the banks make nervous.",
    down: "3.5% down",
    forYou:
      "Your credit is thinner, or your debts are higher than a conventional lender wants. FHA is government-insured, so the rules bend further.",
    tradeoff:
      "Mortgage insurance is charged upfront and monthly, and on most FHA loans it stays for the life of the loan.",
  },
  {
    slug: "va",
    name: "VA",
    hook: "If you served, this is almost always the answer.",
    down: "Nothing down",
    forYou:
      "Veterans, active duty, and in many cases surviving spouses. No down payment and no monthly mortgage insurance at all.",
    tradeoff:
      "There's a one-time funding fee, which some borrowers are exempt from.",
  },
  {
    slug: "usda",
    name: "USDA",
    hook: "Nothing down, if the address qualifies.",
    down: "Nothing down",
    forYou:
      "The home is in an eligible rural or edge-of-suburban area — and that covers more of California than people expect. Household income limits apply.",
    tradeoff: "The property has to be in the map, and income is capped.",
  },
  {
    slug: "jumbo",
    name: "Jumbo",
    hook: "For the price points conforming limits don't reach.",
    down: "Typically 10% – 20% down",
    forYou:
      "The loan is larger than the conforming limit for the county — which, on the coast, is most of the market.",
    tradeoff: "Credit, reserves and documentation requirements are tighter.",
  },
  {
    slug: "bank-statement",
    name: "Bank statement",
    hook: "When your tax returns don't show what you really make.",
    down: "Typically 10%+ down",
    forYou:
      "You're self-employed and you write off enough that your returns understate your income. We qualify you on 12 months of business bank statements instead.",
    tradeoff: "Non-QM, so the rate and reserve requirements run higher.",
  },
];

/** The ones people only find out about by asking. */
export const HARDER: { name: string; line: string }[] = [
  {
    name: "Doctor loans",
    // "Student debt treated differently" was here. It is NOT on the Medical
    // Professionals product sheet, and crushyourmarket.com deliberately left
    // it out for that reason — an ordinary physician-loan feature that may
    // well be true of this product, but is not confirmed against the
    // guidelines. It does not get published under the licensee's NMLS here
    // when it was withheld there.
    line: "Physicians, dentists and residents — up to 100% financing, with no mortgage insurance.",
  },
  {
    name: "Down payment assistance",
    line: "Hundreds of California grants and deferred loans from cities, counties, the state and employers.",
  },
  {
    name: "Self-employed FHA",
    line: "Qualify on the business, not only on what the returns say you earned.",
  },
  {
    name: "Lease-to-own",
    line: "A 15-year FHA path to ownership when traditional lending can't get there yet.",
  },
  {
    name: "HELOCs",
    line: "Pull equity out — including options that don't ask for tax returns.",
  },
  {
    name: "Grants",
    line: "Help toward the purchase that never has to be paid back, if you qualify.",
  },
];
