import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * Every page that belongs to the site proper: header, content, footer.
 *
 * The one page outside this group is `/go`, the Instagram bio link, which
 * wants a visitor's whole attention on four tap targets rather than a nav bar.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
