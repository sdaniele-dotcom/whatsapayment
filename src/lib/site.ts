/**
 * What's a Payment — site configuration.
 *
 * LICENSING. "What's a Payment" is the brand; Crush Mortgage Corp is the
 * licensed entity, and it is the licensee that must be named wherever credit
 * terms appear. Every page footer, every flyer and every payment post carries
 * the licensee line below — the brand guide's rule, and the law's.
 *
 * The DRE number here is taken from the What's a Payment brand guide (v1,
 * November 2026), which prints it on its own sample flyer.
 *
 * The company NMLS is 169136. The brand guide's sample flyer prints 2332050,
 * which is Shannon Daniele's individual MLO number, not the company's —
 * confirmed by Shannon. An individual's number published as the licensed
 * entity's is a disclosure error, not a typo, so the brand guide is wrong
 * here and this file does not follow it.
 */
export const site = {
  brand: "What's a Payment",
  tagline: "Home loans, explained simply.",

  seoTitle: "What's a Payment — home loans, explained simply",
  shortDescription:
    "Tell us the house, we'll tell you the payment — with the rate, the APR and the assumptions right next to it. No jargon, no pressure.",

  siteUrl: "https://whatsapayment.com",

  // ── The licensed entity ───────────────────────────────────────────
  licensee: "Crush Mortgage Corp",
  companyNmls: "169136",
  dreLicense: "02142680",
  caLicenseLine:
    "Real estate broker, California Department of Real Estate, License #02142680",

  phone: "(562) 256-5779",
  phoneHref: "+15622565779",
  email: "info@crushmortgage.com",
  address: "3750 Schaufele Ave, Suite 270A, Long Beach, CA 90808",

  applyUrl: "https://crushmortgage.floify.com/",
  bookingUrl: "https://calendly.com/sdaniele-crushmortgage/30min",

  /**
   * A static export has no server, so the contact form posts to a relay —
   * the same mechanism crushyourmarket.com uses.
   *
   * ⚠️ NOT LIVE YET. FormSubmit delivers nothing until the first POST's
   * confirmation email is clicked at info@crushmortgage.com. Do that before
   * launch, then replace the address below with the alias hash FormSubmit
   * issues, so the inbox address is not sitting in the page source for
   * scrapers to harvest.
   */
  formEndpoint: "https://formsubmit.co/ajax/info@crushmortgage.com",

  // The agent-facing suite, for the one link across to it.
  agentSuiteUrl: "https://crushyourmarket.com",

  social: {
    instagram: "https://instagram.com/whatsapayment",
  },
} as const;

/** Printed under every page and beside every payment figure. */
export const LICENSEE_LINE = `${site.licensee} · NMLS #${site.companyNmls} · CA DRE #${site.dreLicense} · Equal Housing Opportunity`;

/**
 * The standing caveat for any figure on the site. The brand guide requires
 * rate/APR, a date and the assumptions next to any payment; the calculator
 * supplies the first two and this supplies the rest.
 */
export const ESTIMATE_DISCLOSURE =
  "Figures are estimates for education only, not a commitment to lend or a rate lock. Actual rate, APR and payment depend on credit, income, assets, property, occupancy and program, and are subject to change.";

/**
 * Shown beside the contact form's submit button and stored with every
 * submission, so the wording somebody agreed to is the wording they saw.
 *
 * It follows the pattern already used for the webinar and guide forms in the
 * crushmortgage codebase: name the licensee rather than the brand, cover
 * automated calls and texts to the number given, and say plainly that
 * agreeing is not a condition of getting a loan — which is what keeps a
 * consent line from being treated as a condition of credit.
 */
export const CONTACT_CONSENT_TEXT = `By sending this you agree that ${site.licensee} (doing business as ${site.brand}) may contact you about your enquiry by phone, text or email at the details above, including with automated technology. Consent is not a condition of any loan or of buying anything, message rates may apply, and you can ask us to stop at any time.`;
