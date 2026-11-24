/**
 * fetch-instagram.mjs — pull recent @whatsapayment posts at BUILD time.
 *
 * Runs in CI before `next build`. There is no server behind a static export,
 * so the feed is baked into the HTML and refreshed by rebuilding (the deploy
 * workflow runs on a daily schedule as well as on push).
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE: Instagram must never be able to break
 * the website. A missing token, an expired token, a Meta outage, a rate limit —
 * every one of them writes an empty feed, logs a warning and exits 0. The
 * social page renders without a grid and every other page is untouched. The
 * failure we are avoiding is a marketing site that stops deploying because a
 * 60-day token quietly lapsed.
 *
 * IMAGES ARE DOWNLOADED, NOT HOTLINKED. Graph API media URLs are signed and
 * expire within hours, so linking them straight from the page would leave a
 * grid of broken images between rebuilds. They are fetched into public/ig/ and
 * served from our own domain — which also means Meta is not handed a request
 * log of everyone who views the page.
 *
 * Credentials come from the environment and never from the repository:
 *   IG_USER_ID       the Instagram Business account's id
 *   IG_ACCESS_TOKEN  a long-lived token, stored as a GitHub Actions secret
 *
 * Neither is ever written into the build output — only the post text, the
 * permalink, the timestamp and the downloaded image.
 */

import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const OUT_JSON = path.join(process.cwd(), "src/data/instagram.json");
const OUT_DIR = path.join(process.cwd(), "public/ig");
const LIMIT = 9;

/** Write the feed file and stop. Always exits 0 — see the header. */
async function finish(posts, note) {
  await mkdir(path.dirname(OUT_JSON), { recursive: true });
  await writeFile(
    OUT_JSON,
    JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2),
  );
  console.log(`[instagram] ${posts.length} post(s) written — ${note}`);
  process.exit(0);
}

const userId = process.env.IG_USER_ID;
const token = process.env.IG_ACCESS_TOKEN;

if (!userId || !token) {
  await finish(
    [],
    "IG_USER_ID / IG_ACCESS_TOKEN not set, so the social page ships without a grid. This is not an error.",
  );
}

const FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
].join(",");

let posts = [];
try {
  const url =
    `https://graph.instagram.com/v21.0/${encodeURIComponent(userId)}/media` +
    `?fields=${FIELDS}&limit=${LIMIT}&access_token=${encodeURIComponent(token)}`;

  const res = await fetch(url);
  if (!res.ok) {
    // Meta puts the useful part in the body; the status alone rarely says
    // whether the token expired or the account is wired up wrong.
    const body = await res.text().catch(() => "");
    await finish([], `Graph API returned ${res.status}. ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const items = Array.isArray(data?.data) ? data.data : [];

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  for (const m of items.slice(0, LIMIT)) {
    // A video's media_url is the video itself; its thumbnail is the still.
    const src = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
    if (!src || !m.permalink) continue;

    let image = null;
    try {
      const img = await fetch(src);
      if (img.ok) {
        const buf = Buffer.from(await img.arrayBuffer());
        const file = `${m.id}.jpg`;
        await writeFile(path.join(OUT_DIR, file), buf);
        image = `/ig/${file}`;
      }
    } catch {
      // One unreachable image should not cost us the other eight.
    }

    posts.push({
      id: m.id,
      caption: typeof m.caption === "string" ? m.caption : "",
      permalink: m.permalink,
      timestamp: m.timestamp ?? null,
      isVideo: m.media_type === "VIDEO",
      image,
    });
  }
} catch (err) {
  await finish([], `fetch failed: ${err?.message ?? err}`);
}

await finish(posts, "fetched from the Instagram Graph API");
