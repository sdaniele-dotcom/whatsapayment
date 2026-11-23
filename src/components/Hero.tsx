import { LogoIcon } from "@/components/Logo";

/** The navy page-opener every inside page uses, so they feel like one site. */
export function Hero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <LogoIcon
        tone="white"
        className="pointer-events-none absolute -right-8 top-2 h-[280px] w-auto opacity-[0.07] sm:right-8 lg:h-[360px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <p className="eyebrow text-amber">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[2.2rem] font-extrabold leading-[1.08] sm:text-5xl">
          {title}
        </h1>
        {children && (
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-navy">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
