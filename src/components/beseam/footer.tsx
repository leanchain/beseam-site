"use client";

import Link from "next/link";

import Logo from "@/components/beseam/logo";
import { useDictionary } from "@/i18n/use-locale";

const FOOTER_GROUPS = [
  {
    key: "product",
    links: [
      { key: "platform", href: "/platform" },
      { key: "aiShoppingDiscovery", href: "/ai-visibility-monitoring" },
      { key: "compare", href: "/compare" },
    ],
  },
  {
    key: "aiShoppingAgents",
    links: [
      { key: "aiShoppingData", href: "/data" },
      { key: "forShoppingAgents", href: "/agents" },
      { key: "report", href: "/benchmarks" },
    ],
  },
  {
    key: "company",
    links: [
      { key: "howWeWork", href: "/how-we-work" },
      { key: "about", href: "/about" },
      { key: "manifesto", href: "/manifesto" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    key: "fieldbook",
    links: [{ key: "fieldbook", href: "/resources" }],
  },
] as const;

export default function BeseamFooter() {
  const t = useDictionary();

  return (
    <footer className="relative overflow-hidden bg-ink-deep text-white">
      <div className="relative mx-auto max-w-[92rem] px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="grid gap-12 border-b border-white/18 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:gap-20">
          <div>
            <Link
              href="/"
              aria-label={t.footer.homeAriaLabel}
              className="inline-flex max-w-full"
            >
              <Logo
                variant="secondary-inverted"
                className="text-white"
                style={{ fontSize: "clamp(72px, 9vw, 96px)" }}
                markGlow={
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 opacity-90 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,91,61,0.22) 0%, rgba(255,91,61,0.10) 34%, rgba(255,91,61,0.025) 56%, transparent 72%)",
                    }}
                  />
                }
              />
            </Link>
            <p className="mt-7 max-w-[20ch] font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-white/92">
              {t.footer.tagline.before}{" "}
              <span className="text-signal">{t.footer.tagline.highlight}</span>.
            </p>
            <p className="mt-6 max-w-[54ch] text-[14px] leading-relaxed text-white/62">
              {t.footer.description}
            </p>
          </div>

          <div
            className="grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-8"
            style={{ maxWidth: "48rem", marginLeft: "auto" }}
          >
            {FOOTER_GROUPS.map((group) => {
              const groupCopy = t.footer.groups[group.key];
              return (
                <nav key={group.key} aria-label={groupCopy.label}>
                  <p className="text-[13px] font-semibold text-white">
                    {groupCopy.label}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {group.links.map((link) => {
                      // Each footer group has a differently-shaped `links`
                      // record, so mapping over the flattened FOOTER_GROUPS
                      // union loses the per-group key correlation TS would
                      // otherwise verify. The cast is scoped to this one
                      // lookup; the exhaustiveness guarantee still comes from
                      // `de: Dictionary` requiring every one of these keys.
                      const groupLinks = groupCopy.links as Record<
                        string,
                        string
                      >;
                      return (
                        <li key={link.key}>
                          <Link
                            href={link.href}
                            className="inline-flex min-h-11 items-center text-[13px] text-white/62 transition-colors hover:text-white lg:min-h-9"
                          >
                            {groupLinks[link.key]}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-[12px] text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p>{t.footer.copyright(new Date().getFullYear())}</p>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-white"
            >
              {t.footer.terms}
            </Link>
            <Link href="/bot" className="transition-colors hover:text-white">
              {t.footer.bot}
            </Link>
          </div>

          <p className="inline-flex items-center gap-2 sm:justify-end">
            <span>{t.footer.madeWith}</span>
            <span
              aria-label={t.footer.swissFlagAriaLabel}
              role="img"
              className="relative inline-block h-4 w-4 shrink-0 bg-[#d52b1e]"
            >
              <span className="absolute left-1/2 top-[3px] h-[10px] w-[3px] -translate-x-1/2 bg-white" />
              <span className="absolute left-[3px] top-1/2 h-[3px] w-[10px] -translate-y-1/2 bg-white" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
