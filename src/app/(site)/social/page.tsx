import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { site, LICENSEE_LINE } from "@/lib/site";
import feed from "@/data/instagram.json";

/*
  The feed is baked in at build time by scripts/fetch-instagram.mjs and the
  deploy runs daily, so posts are at most a day behind. When no token is
  configured — or Meta is down, or the token has lapsed — `posts` is simply
  empty and this page renders everything except the grid. That is the whole
  reason the grid is a conditional block rather than a component that assumes
  it has data.
*/

export const metadata: Metadata = {
  title: "Social",
  description:
    "Real payments on real houses, posted daily. Follow @whatsapayment for payment breakdowns on active listings, program explainers and the myths that cost buyers money.",
};

type Post = {
  id: string;
  caption: string;
  permalink: string;
  timestamp: string | null;
  isVideo: boolean;
  image: string | null;
};

const posts = (feed.posts ?? []) as Post[];

const ACCOUNTS = [
  {
    handle: "@whatsapayment",
    url: site.social.instagram,
    what: "Payment breakdowns on houses actually for sale right now.",
    primary: true,
  },
  {
    handle: "@crushmortgage",
    url: "https://instagram.com/crushmortgage",
    what: "The team, the closings, and what is moving in the market.",
    primary: false,
  },
];

const WE_POST = [
  {
    title: "What this one actually costs",
    body: "An active listing, priced across every program a buyer might use, with the rate and the assumptions on screen. The post people screenshot and send to their partner.",
  },
  {
    title: "The programs nobody mentioned",
    body: "Down payment assistance, bank-statement loans, doctor loans, 3% down. Most buyers never hear these exist, and that is usually what stops them.",
  },
  {
    title: "Myths that cost money",
    body: "“You need 20% down.” “Renting is throwing money away.” “Wait for rates to drop.” Each one is worth a straight answer rather than a slogan.",
  },
  {
    title: "Agents’ listings, co-branded",
    body: "We feature partner agents’ listings with the payment math on them — their name on the post, our numbers underneath.",
  },
];

/** Captions run long and the first line is the hook; the rest is hashtags. */
function firstLine(caption: string): string {
  const line = caption.split("\n").find((l) => l.trim().length > 0) ?? "";
  return line.length > 120 ? `${line.slice(0, 117).trimEnd()}…` : line;
}

export default function Social() {
  return (
    <>
      <Hero eyebrow="Social" title={<>Real payments, on real houses, every week.</>}>
        <p>
          The fastest way to see what we do is to watch us do it. We price
          houses that are on the market right now and show the whole monthly
          number.
        </p>
      </Hero>

      {/* ── Follow ─────────────────────────────────────────────── */}
      {/* Less bottom padding with no grid under it, or the empty state leaves
          a visible dead zone between the follow cards and "What you'll see". */}
      <section
        className={`mx-auto max-w-6xl px-5 pt-14 lg:pt-16 ${
          posts.length > 0 ? "pb-14 lg:pb-16" : "pb-2"
        }`}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {ACCOUNTS.map((a) => (
            <a
              key={a.handle}
              href={a.url}
              className={`group flex items-center gap-5 rounded-2xl p-6 transition-colors sm:p-7 ${
                a.primary
                  ? "bg-navy text-white hover:bg-navy-700"
                  : "border border-warm-deep bg-white hover:border-amber"
              }`}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className={`shrink-0 ${a.primary ? "text-amber" : "text-navy"}`}
                aria-hidden
              >
                <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" />
                <circle cx="12" cy="12" r="4.4" />
                <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" stroke="none" />
              </svg>
              <span className="min-w-0">
                <span
                  className={`block font-display text-[19px] font-bold ${
                    a.primary ? "text-white" : "text-navy"
                  }`}
                >
                  {a.handle}
                </span>
                <span
                  className={`mt-1 block text-[15px] leading-relaxed ${
                    a.primary ? "text-muted-navy" : "text-muted"
                  }`}
                >
                  {a.what}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── The grid, when there is one ────────────────────────── */}
      {posts.length > 0 && (
        <section className="bg-warm">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <p className="eyebrow text-amber-600">Lately</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              The last {posts.length} posts.
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <a
                  key={p.id}
                  href={p.permalink}
                  className="group overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-lg"
                >
                  {p.image && (
                    <span className="relative block aspect-square overflow-hidden">
                      <Image
                        src={p.image}
                        alt=""
                        width={640}
                        height={640}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {p.isVideo && (
                        <span className="absolute right-3 top-3 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                          Reel
                        </span>
                      )}
                    </span>
                  )}
                  <span className="block p-5">
                    <span className="block text-[15px] leading-relaxed text-ink/85">
                      {firstLine(p.caption) || "View this post on Instagram"}
                    </span>
                    {p.timestamp && (
                      <span className="mt-2.5 block text-[13px] text-muted">
                        {new Date(p.timestamp).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-8 text-[13px] text-muted">
              Posts are refreshed daily. Figures in them are estimates for
              education only — see the full disclosure below.
            </p>
          </div>
        </section>
      )}

      {/* ── What we post ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <p className="eyebrow text-amber-600">What you&rsquo;ll see</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
          Four things, over and over.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {WE_POST.map((w) => (
            <div key={w.title} className="rounded-2xl border border-warm-deep bg-white p-6 sm:p-7">
              <h3 className="font-display text-[19px] font-bold text-navy">{w.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Two asks ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-16 lg:pb-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl bg-navy px-7 py-11 text-white sm:px-10">
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              Want your house done next?
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-navy">
              Send the address. You get the numbers whether or not they ever
              make it into a post.
            </p>
            <Link
              href="/contact/"
              className="mt-7 inline-block rounded-full bg-amber px-7 py-3.5 text-[16px] font-semibold text-navy transition-opacity hover:opacity-90"
            >
              Send us the address
            </Link>
          </div>

          <div className="rounded-3xl bg-warm px-7 py-11 sm:px-10">
            <h2 className="text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
              Agents — we&rsquo;ll feature your listing.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Co-branded, your name on the post, the payment math underneath.
              It runs through the agent suite along with the flyers.
            </p>
            <a
              href={site.agentSuiteUrl}
              className="mt-7 inline-block rounded-full bg-navy px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-navy-700"
            >
              Go to the agent suite
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-warm-deep pt-6 text-[13px] leading-relaxed text-muted">
          {LICENSEE_LINE}
        </p>
      </section>
    </>
  );
}
