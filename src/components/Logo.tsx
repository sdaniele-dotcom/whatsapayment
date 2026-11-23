/**
 * The What's a Payment wordmark, icon and badge.
 *
 * These are the REAL marks, lifted out of the brand guide PDF rather than
 * redrawn — the P is a custom glyph whose bowl and tail read as a question
 * mark, and no typeface reproduces it. An earlier version of this file set the
 * word in Sora ExtraBold with the amber dot beneath the P, which carried the
 * signature element but not the glyph; the files replaced it.
 *
 * PNG, not SVG, because the guide embeds its artwork as raster: converting it
 * would mean tracing, and a traced curve is a redrawing again. They are
 * exported at roughly 4x their largest on-page size, so they stay sharp on a
 * retina screen without being worth optimising further.
 *
 * Every mark carries its amber dot already. Nothing here should ever recolour
 * it — the one rule the guide states twice.
 */
import Image from "next/image";

const WORDMARK_RATIO = 1180 / 168;
const ICON_RATIO = 240 / 460;

export function Wordmark({
  className = "",
  tone = "navy",
  height = 26,
}: {
  className?: string;
  /** "navy" on light backgrounds, "white" on Deep Navy or Black. */
  tone?: "navy" | "white";
  /** Rendered height in px; width follows the mark's own ratio. */
  height?: number;
}) {
  return (
    <Image
      src={tone === "white" ? "/brand/wordmark-white.png" : "/brand/wordmark-navy.png"}
      alt="What's a Payment"
      width={Math.round(height * WORDMARK_RATIO)}
      height={height}
      className={className}
      priority
    />
  );
}

/** The standalone mark: the question-mark P with its amber dot. */
export function LogoIcon({
  className = "",
  tone = "navy",
  height = 40,
}: {
  className?: string;
  tone?: "navy" | "white";
  height?: number;
}) {
  return (
    <Image
      src={tone === "white" ? "/brand/icon-white.png" : "/brand/icon-navy.png"}
      alt=""
      aria-hidden
      width={Math.round(height * ICON_RATIO)}
      height={height}
      className={className}
    />
  );
}

/**
 * The logo inside a navy bubble — what the guide calls a badge. Use this over
 * photos and busy backgrounds; never the bare wordmark.
 *
 * One flat image rather than a wordmark inside a styled box: the badge's
 * corner radius and the padding around the word are part of the artwork, and
 * rebuilding them in CSS drifts from it at every size.
 */
export function LogoBadge({
  className = "",
  height = 44,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <Image
      src="/brand/badge-navy.png"
      alt="What's a Payment"
      width={Math.round((height * 900) / 280)}
      height={height}
      className={className}
    />
  );
}
