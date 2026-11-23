import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { site, LICENSEE_LINE, ESTIMATE_DISCLOSURE } from "@/lib/site";

/**
 * The licensee line is not decoration. Credit terms appear on this site, so
 * the entity holding the licence has to be named wherever they do — brand on
 * top, licensee underneath.
 */
export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark tone="white" height={28} className="h-[26px] w-auto" />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-navy">
              {site.tagline} Tell us the house and we&rsquo;ll tell you the
              payment — with the rate, the APR and the assumptions right next
              to it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.applyUrl}
                className="rounded-full bg-amber px-5 py-2.5 text-[15px] font-semibold text-navy transition-opacity hover:opacity-90"
              >
                Get started
              </a>
              <a
                href={site.bookingUrl}
                className="rounded-full border border-white/35 px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book a call
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-amber">Explore</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px] text-muted-navy">
              <li><Link href="/loan-options/" className="hover:text-white">Loan options</Link></li>
              <li><Link href="/payment-calculator/" className="hover:text-white">Payment calculator</Link></li>
              <li><Link href="/how-it-works/" className="hover:text-white">How it works</Link></li>
              <li><Link href="/about/" className="hover:text-white">About</Link></li>
              <li><Link href="/contact/" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-amber">Talk to us</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px] text-muted-navy">
              <li><a href={`tel:${site.phoneHref}`} className="hover:text-white">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
              <li className="leading-relaxed">{site.address}</li>
              <li className="pt-2">
                <a href={site.agentSuiteUrl} className="font-semibold text-white underline decoration-amber underline-offset-4">
                  Real estate agent? Start here
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-7">
          <p className="text-[14px] font-semibold text-white">
            {site.brand} is a registered trade name of {site.licensee}.
          </p>
          <p className="mt-1.5 text-[13.5px] text-muted-navy">{LICENSEE_LINE}</p>
          <p className="mt-3 max-w-4xl text-[12.5px] leading-relaxed text-muted-navy/85">
            {ESTIMATE_DISCLOSURE}
          </p>
          <p className="mt-4 text-[12.5px] text-muted-navy/70">
            © {new Date().getFullYear()} {site.licensee}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
