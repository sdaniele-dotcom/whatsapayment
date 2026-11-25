import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * There was no robots.txt at all — /robots.txt served the 404 page. Crawlers
 * got no sitemap pointer and no host preference, which matters here because
 * the site is also reachable at its GitHub Pages URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The link-in-bio page sets noindex in its own metadata; saying it here
      // too means a crawler that never fetches the page still knows.
      disallow: "/go",
    },
    sitemap: `${site.siteUrl}/sitemap.xml`,
    host: site.siteUrl,
  };
}
