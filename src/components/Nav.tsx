"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/Logo";
import { site } from "@/lib/site";

const LINKS = [
  { href: "/loan-options/", label: "Loan options" },
  { href: "/payment-calculator/", label: "Payment calculator" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-warm-deep/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" aria-label={site.brand} className="shrink-0">
          <Wordmark height={26} className="h-[21px] w-auto sm:h-[25px]" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-ink/80 transition-colors hover:text-navy"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneHref}`}
            className="text-[15px] font-semibold text-navy"
          >
            {site.phone}
          </a>
          <a
            href={site.applyUrl}
            className="rounded-full bg-navy px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Get started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menu"
          className="rounded-lg p-2 text-navy lg:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-warm-deep/70 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-warm py-3 text-[16px] font-medium text-ink/85 last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.applyUrl}
              className="mt-4 mb-2 rounded-full bg-navy px-5 py-3 text-center text-[16px] font-semibold text-white"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
