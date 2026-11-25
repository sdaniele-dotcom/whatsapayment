/**
 * The pages a search engine should know about.
 *
 * This site had neither a robots.txt nor a sitemap.xml — both returned the
 * 404 page — which for a consumer site whose whole job is to be found is a
 * gap rather than a nicety. They exist now, and they read this list.
 *
 * ONE LIST, because the agent suite learned that lesson the hard way: its
 * sitemap was maintained separately from the code that decides what is
 * public, the two drifted, and it ended up advertising 21 pages that
 * redirect to a login. A page is listed here or it is not in the sitemap;
 * there is no second place to forget.
 *
 * /go is deliberately absent. It is the link-in-bio landing page and sets
 * `robots: { index: false }` itself — it exists to be reached from a profile
 * link, not from a search result, and listing it here would contradict the
 * page's own metadata.
 */
export const INDEXABLE_ROUTES = [
  "/",
  "/how-it-works",
  "/payment-calculator",
  "/loan-options",
  "/social",
  "/about",
  "/contact",
] as const;
