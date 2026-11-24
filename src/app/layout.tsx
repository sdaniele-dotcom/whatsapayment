import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

/*
  Both faces are the brand guide's: Sora for headlines, payment numbers and
  the logo; DM Sans for body text, details and disclosures. The guide notes
  both are free Google Fonts.
*/
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.seoTitle,
    template: `%s · ${site.brand}`,
  },
  description: site.shortDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: site.seoTitle,
    description: site.shortDescription,
    url: site.siteUrl,
  },
};

/**
 * The root layout carries the document and the fonts and nothing else.
 *
 * The site's header and footer live in the `(site)` route group instead, so a
 * page can opt out of them. `/go` does: it is the link in the Instagram bio,
 * where a nav bar is five ways to leave before reading anything. Route groups
 * do not appear in URLs, so every path is unchanged.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
