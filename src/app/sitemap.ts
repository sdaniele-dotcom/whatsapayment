import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { INDEXABLE_ROUTES } from "@/lib/routes";

export const dynamic = "force-static";

/**
 * There was no sitemap.xml — /sitemap.xml served the 404 page.
 *
 * The route list lives in lib/routes so this file cannot drift from what is
 * actually public; see the note there.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return INDEXABLE_ROUTES.map((path) => ({
    url: `${site.siteUrl}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
