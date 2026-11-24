"use client";

import { useState } from "react";
import { site, CONTACT_CONSENT_TEXT } from "@/lib/site";

/*
  There is no server behind a static export, so the form posts to the same
  relay crushyourmarket.com already uses.

  ⚠️ FormSubmit will not deliver anything until the endpoint is activated: the
  first POST triggers a confirmation email to the destination address that
  somebody has to click. Until that happens every submission fails, which is
  why the failure path below gives the phone number and the email address
  rather than a generic "try again".

  The consent sentence is stored with the submission and rendered beside the
  button, so what somebody agreed to is the text they actually saw.
*/

type State = "idle" | "sending" | "sent" | "error";

const input =
  "mt-1.5 w-full rounded-xl border border-warm-deep bg-white px-3.5 py-2.5 text-[16px] text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber/30";
const label = "text-[14px] font-semibold text-navy";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_subject", "What's a Payment — new enquiry");
    data.append("consent_text", CONTACT_CONSENT_TEXT);
    setState("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-warm-deep bg-white p-8">
        <h2 className="font-display text-2xl font-extrabold text-navy">
          Got it — thank you.
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-muted">
          A loan officer will come back to you with the numbers. If it is
          urgent, call or text {site.phone} and someone will pick up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-warm-deep bg-white p-6 sm:p-8">
      <h2 className="font-display text-2xl font-extrabold text-navy">
        Tell us about the house
      </h2>
      <p className="mt-2 text-[16px] leading-relaxed text-muted">
        An address is ideal. A price and a zip code is plenty to start.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Your name</span>
          <input name="name" required autoComplete="name" className={input} />
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={input} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={input} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>The property</span>
          <input
            name="property"
            placeholder="123 Main St, Long Beach — or $650,000 in 90808"
            className={input}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Anything else?</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Self-employed, first home, turned down somewhere else — whatever matters."
            className={`${input} min-h-[110px]`}
          />
        </label>
      </div>

      <p className="mt-6 text-[12px] leading-relaxed text-muted">
        {CONTACT_CONSENT_TEXT}
      </p>

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 w-full rounded-full bg-navy px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-navy-700 disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending…" : "Send it over"}
      </button>

      {state === "error" && (
        <p className="mt-4 rounded-xl bg-warm p-4 text-[14px] leading-relaxed text-ink">
          That didn&rsquo;t go through. Call or text{" "}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-navy underline decoration-amber underline-offset-4">
            {site.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-navy underline decoration-amber underline-offset-4">
            {site.email}
          </a>{" "}
          and we&rsquo;ll pick it up from there.
        </p>
      )}
    </form>
  );
}
