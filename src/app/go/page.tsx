import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { site, LICENSEE_LINE } from "@/lib/site";

/*
  /go — the link in the @whatsapayment bio.

  Deliberately NOT the site's layout. Someone arriving here tapped a link in a
  story three seconds ago on a phone, on cellular, half-interested. A header
  with five nav items gives them five ways to leave before they have read
  anything, so this page has no nav and no footer links: a mark, one line, four
  targets, and the licensee.

  The order is by how ready the visitor is, not by what we would prefer they
  do. Someone who just watched a payment breakdown on a specific house wants
  that house priced — not a calculator, and certainly not a phone call.
*/

export const metadata: Metadata = {
  title: "Start here",
  description:
    "Saw a payment post? Send us the address and we'll price it — or run the numbers yourself.",
  // A bio link gets pasted into group chats and DMs; it should not be indexed
  // as a doorway page competing with the real home page.
  robots: { index: false, follow: true },
};

const LINKS = [
  {
    href: "/contact/",
    internal: true,
    title: "Price a specific house",
    sub: "Send the address. We send back what it would cost.",
    primary: true,
    icon: (
      <>
        <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
  },
  {
    href: "/payment-calculator/",
    internal: true,
    title: "Run a payment yourself",
    sub: "No form, nothing sent anywhere.",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2.5" />
        <path d="M8.5 7.5h7M8.5 12h2M13 12h2.5M8.5 16h2M13 16h2.5" />
      </>
    ),
  },
  {
    href: `sms:${site.phoneHref}`,
    title: "Text a loan officer",
    sub: site.phone,
    icon: (
      <>
        <path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H8l-4 3.5V6a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 6Z" />
      </>
    ),
  },
  {
    href: site.bookingUrl,
    title: "Book 30 minutes",
    sub: "A real conversation, no pressure.",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </>
    ),
  },
];

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

export default function Go() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center bg-navy px-5 py-10 text-white">
      <div className="flex w-full max-w-md flex-1 flex-col">
        <div className="text-center">
          <Wordmark tone="white" height={34} className="mx-auto h-[30px] w-auto" />
          <h1 className="mt-7 text-[1.75rem] font-extrabold leading-[1.15]">
            Saw a payment post?
            <br />
            Let&rsquo;s price <span className="highlight">yours.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-[15.5px] leading-relaxed text-muted-navy">
            Tell us the house and a loan officer sends back the real monthly
            number. No application, no credit pull.
          </p>
        </div>

        <nav className="mt-8 flex flex-col gap-3">
          {LINKS.map((l) => {
            const inner = (
              <>
                <span
                  className={
                    l.primary
                      ? "text-navy"
                      : "text-amber transition-colors group-hover:text-amber"
                  }
                >
                  <Icon>{l.icon}</Icon>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16.5px] font-semibold">{l.title}</span>
                  <span
                    className={`block text-[13.5px] ${
                      l.primary ? "text-navy/70" : "text-muted-navy"
                    }`}
                  >
                    {l.sub}
                  </span>
                </span>
                <span aria-hidden className={l.primary ? "text-navy/50" : "text-white/35"}>
                  ›
                </span>
              </>
            );
            // 64px of height and the full width: a thumb target, not a link.
            const cls = `group flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors ${
              l.primary
                ? "bg-amber text-navy hover:opacity-90"
                : "border border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.12]"
            }`;
            return l.internal ? (
              <Link key={l.title} href={l.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <a key={l.title} href={l.href} className={cls}>
                {inner}
              </a>
            );
          })}
        </nav>

        <div className="mt-8 text-center">
          <a
            href={site.social.instagram}
            className="text-[14.5px] font-semibold text-white underline decoration-amber underline-offset-4"
          >
            @whatsapayment
          </a>
          <span className="px-2 text-white/30">·</span>
          <Link
            href="/"
            className="text-[14.5px] font-semibold text-white underline decoration-amber underline-offset-4"
          >
            Full site
          </Link>
        </div>

        <p className="mt-auto pt-10 text-center text-[11.5px] leading-relaxed text-muted-navy/80">
          {LICENSEE_LINE}
        </p>
      </div>
    </main>
  );
}
