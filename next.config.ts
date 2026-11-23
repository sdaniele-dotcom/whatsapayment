import type { NextConfig } from "next";

/**
 * Static export — the consumer site is all marketing pages and a calculator
 * that runs in the browser, so there is nothing to run on a server.
 *
 * BASE_PATH is set at build time only for a GitHub Pages *project* site.
 */
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
