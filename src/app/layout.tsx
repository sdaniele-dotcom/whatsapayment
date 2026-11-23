import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmSans.variable} antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
