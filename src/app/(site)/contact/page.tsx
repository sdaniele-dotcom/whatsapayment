import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send us an address and we'll price it. Call, text, email or book a thirty-minute call — whichever you prefer.",
};

export default function Contact() {
  return (
    <>
      <Hero eyebrow="Contact" title={<>Send us the address. We&rsquo;ll price it.</>}>
        <p>
          No application and no credit pull to get a real answer. Tell us the
          house you are looking at and we will send back what it would cost,
          across every option you qualify for.
        </p>
      </Hero>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <ContactForm />

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-navy p-7 text-white">
              <p className="eyebrow text-amber">Rather just talk?</p>
              <p className="mt-3 text-[18px] leading-relaxed text-muted-navy">
                Call or text. A loan officer picks up.
              </p>
              <a
                href={`tel:${site.phoneHref}`}
                className="figure mt-4 block text-3xl text-white sm:text-4xl"
              >
                {site.phone}
              </a>
              <a
                href={site.bookingUrl}
                className="mt-6 inline-block rounded-full bg-amber px-6 py-3 text-[16px] font-semibold text-navy transition-opacity hover:opacity-90"
              >
                Book 30 minutes
              </a>
            </div>

            <div className="rounded-2xl border border-warm-deep bg-white p-7">
              <h2 className="font-display text-lg font-bold text-navy">Other ways</h2>
              <ul className="mt-4 flex flex-col gap-3 text-[16px]">
                <li>
                  <a href={`mailto:${site.email}`} className="text-navy underline decoration-amber underline-offset-4">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.applyUrl} className="text-navy underline decoration-amber underline-offset-4">
                    Start an application
                  </a>
                </li>
                <li className="leading-relaxed text-muted">{site.address}</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-warm p-7">
              <h2 className="font-display text-lg font-bold text-navy">
                Real estate agent?
              </h2>
              <p className="mt-2.5 text-[16px] leading-relaxed text-muted">
                There is a whole separate toolkit for you — co-branded flyers,
                payment scenarios for your listings and marketing you can put
                your name on.
              </p>
              <a
                href={site.agentSuiteUrl}
                className="mt-4 inline-block font-semibold text-navy underline decoration-amber underline-offset-4"
              >
                Go to the agent suite
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
