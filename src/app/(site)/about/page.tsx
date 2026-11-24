import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { site, LICENSEE_LINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "What's a Payment is the consumer side of Crush Mortgage Corp — a Long Beach mortgage team that answers the payment question in plain English.",
};

/** Straight from the team data published on crushyourmarket.com. */
const TEAM = [
  { name: "Shannon Daniele", nmls: "2332050", phone: "(562) 256-5779", email: "sdaniele@crushmortgage.com", photo: "/team/shannon-daniele.jpg" },
  { name: "Josh Amescua", nmls: "1202316", phone: "(562) 688-3804", email: "jamescua@crushmortgage.com", photo: "/team/josh-amescua.jpg" },
  { name: "Amraj Kaur", nmls: "2787571", phone: "(562) 416-5366", email: "amraj@crushmortgage.com", photo: "/team/amraj-kaur.jpg" },
  { name: "Silvia Robles", nmls: "2323986", phone: "(562) 912-7769", email: "srobles@crushmortgage.com", photo: "/team/silvia-robles.jpg" },
];

export default function About() {
  return (
    <>
      <Hero eyebrow="About" title={<>We named the company after the question everyone actually asks.</>}>
        <p>
          Not &ldquo;what&rsquo;s my rate.&rdquo; Not &ldquo;how much can I
          qualify for.&rdquo; People want to know what it costs every month to
          live there. So that is the question we answer first, and plainly.
        </p>
      </Hero>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:py-20">
        <div className="flex flex-col gap-6 text-[17px] leading-relaxed text-muted">
          <p>
            Mortgage lending has a habit of answering simple questions with
            complicated ones. Ask what a house would cost you and you get a
            range, a disclaimer and an invitation to apply. We think you should
            be able to find out what the payment would be before you hand over
            your social security number.
          </p>
          <p>
            So that is how this works. Tell us the house — an address, or just
            a price and a zip code. A real loan officer prices it across every
            program you qualify for and sends the options back side by side,
            with the rate and the assumptions printed next to each one. If the
            answer is that now is not the moment, we will say that too.
          </p>
          <p>
            <strong className="text-navy">What&rsquo;s a Payment</strong> is the
            consumer side of{" "}
            <strong className="text-navy">{site.licensee}</strong>, a mortgage
            team based in Long Beach. Same people, same licence — just the name
            we use when we are talking to buyers instead of to agents.
          </p>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <p className="eyebrow text-amber-600">The people</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            You will be talking to one of these four.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            The same person each time you call, and they pick up.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {TEAM.map((m) => (
              <div key={m.name} className="flex items-center gap-5 rounded-2xl bg-white p-5 sm:p-6">
                <Image
                  src={m.photo}
                  alt={m.name}
                  width={96}
                  height={96}
                  className="h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-[19px] font-bold text-navy">{m.name}</h3>
                  <p className="text-[14px] text-muted">Loan Officer · NMLS #{m.nmls}</p>
                  <p className="mt-1.5 text-[15px] text-ink/80">{m.phone}</p>
                  <a href={`mailto:${m.email}`} className="break-all text-[14.5px] text-navy underline decoration-amber underline-offset-4">
                    {m.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:py-20">
        <div className="rounded-2xl border border-warm-deep bg-white p-7 sm:p-8">
          <p className="eyebrow text-amber-600">Licensing</p>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-navy">
            Who you are actually dealing with
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            What&rsquo;s a Payment is a registered trade name of{" "}
            {site.licensee}. The licence, and the obligations that come with
            it, sit with {site.licensee} — which is why that name appears on
            every quote, flyer and disclosure we send.
          </p>
          <p className="mt-5 border-t border-warm pt-5 text-[14.5px] font-semibold text-navy">
            {LICENSEE_LINE}
          </p>
          <p className="mt-3 text-[15px] text-muted">{site.address}</p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact/"
            className="inline-block rounded-full bg-navy px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
