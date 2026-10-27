"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/beseam/logo";
import type { Dictionary } from "@/i18n";
import {
  LOCALIZED_ROUTES,
  localizedPath,
  normalizePath,
} from "@/i18n/locale-rules.mjs";
import { useDictionary, useLocale } from "@/i18n/use-locale";
import { PRICING_PUBLIC } from "@/lib/pricing";

const ASK_AI_PROMPT = encodeURIComponent(
  "What is Beseam and what does it do for ecommerce brands?",
);

const ASK_AI_LINKS = [
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${ASK_AI_PROMPT}` },
  { label: "Claude", href: `https://claude.ai/new?q=${ASK_AI_PROMPT}` },
  {
    label: "Gemini",
    href: `https://www.google.com/search?udm=50&source=searchlabs&q=${ASK_AI_PROMPT}`,
  },
  { label: "Grok", href: `https://grok.com/?q=${ASK_AI_PROMPT}` },
  {
    label: "Perplexity",
    href: `https://www.perplexity.ai/search?q=${ASK_AI_PROMPT}`,
  },
] as const;

/**
 * The footer mirrors the navbar's four menu groups, with the same labels
 * (`nav.menu`). Pricing sits under Product once `PRICING_PUBLIC` is on.
 */
function footerGroups(t: Dictionary) {
  const menu = t.nav.menu;
  return [
    {
      label: menu.product.label,
      links: [
        {
          label: menu.product.items.tracking,
          href: "/product/ai-visibility-tracking",
        },
        {
          label: menu.product.items.descriptions,
          href: "/product/product-descriptions",
        },
        {
          label: menu.product.items.content,
          href: "/product/content-creation",
        },
        {
          label: menu.product.items.technical,
          href: "/product/technical-performance",
        },
        ...(PRICING_PUBLIC ? [{ label: menu.pricing, href: "/pricing" }] : []),
      ],
    },
    {
      label: menu.solutions.label,
      links: [
        { label: menu.solutions.items.footwear, href: "/solutions/footwear" },
        {
          label: menu.solutions.items.apparel,
          href: "/solutions/fashion-apparel",
        },
        {
          label: menu.solutions.items.beauty,
          href: "/solutions/beauty-cosmetics",
        },
        {
          label: menu.solutions.items.electronics,
          href: "/solutions/consumer-electronics",
        },
        { label: menu.solutions.items.shopify, href: "/solutions/shopify" },
      ],
    },
    {
      label: menu.resources.label,
      links: [
        { label: menu.resources.items.blog, href: "/blog" },
        { label: menu.resources.items.report, href: "/benchmarks" },
        { label: menu.resources.items.compare, href: "/compare" },
      ],
    },
    {
      label: menu.company.label,
      links: [
        { label: menu.company.items.about, href: "/about" },
        { label: menu.company.items.contact, href: "/contact" },
      ],
    },
  ];
}

const SCAN_PATHS = new Set([
  "/scan",
  ...Object.values(LOCALIZED_ROUTES["/scan"]),
]);

const LINKEDIN_URL = "https://www.linkedin.com/company/beseam";

export default function BeseamFooter() {
  const t = useDictionary();
  const locale = useLocale();
  const pathname = usePathname();
  const compactReportFooter = SCAN_PATHS.has(normalizePath(pathname ?? "/"));

  if (compactReportFooter) {
    return (
      <footer className="border-t border-white/12 bg-ink-deep text-white">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <Link
            href={localizedPath("/", locale)}
            aria-label={t.footer.homeAriaLabel}
            className="inline-flex"
          >
            <Logo
              variant="secondary-inverted"
              className="text-white"
              style={{ fontSize: "38px" }}
            />
          </Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px] text-white/56">
            <p>{t.footer.copyright(new Date().getFullYear())}</p>
            <Link
              href="/privacy-policy"
              className="text-signal transition-colors hover:text-white"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-signal transition-colors hover:text-white"
            >
              {t.footer.terms}
            </Link>
            <Link
              href={localizedPath("/contact", locale)}
              className="text-signal transition-colors hover:text-white"
            >
              {t.nav.menu.company.items.contact}
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden bg-ink-deep text-white">
      <div className="relative mx-auto max-w-[92rem] px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="grid gap-12 border-b border-white/18 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:gap-20">
          <div>
            <Link
              href={localizedPath("/", locale)}
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
                        "radial-gradient(circle, rgba(255,225,77,0.16) 0%, rgba(255,225,77,0.07) 34%, rgba(255,225,77,0.02) 56%, transparent 72%)",
                    }}
                  />
                }
              />
            </Link>
            <p className="mt-7 max-w-[20ch] font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-white/92">
              {/* Same words as the hero, so the page opens and closes on one
                  promise. */}
              {t.hero.headlineBefore}
              <span className="text-signal">{t.hero.headlineAccent}</span>
              {t.hero.headlineAfter}
            </p>
            <p className="mt-6 max-w-[54ch] text-[14px] leading-relaxed text-white/62">
              {t.hero.sub}
            </p>
          </div>

          <div
            className="grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-8"
            style={{ maxWidth: "48rem", marginLeft: "auto" }}
          >
            {footerGroups(t).map((group) => (
              <nav key={group.label} aria-label={group.label}>
                <p className="text-[13px] font-semibold text-white">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localizedPath(link.href, locale)}
                        className="inline-flex min-h-11 items-center text-[13px] text-white/62 hyphens-auto transition-colors hover:text-white lg:min-h-9"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="col-span-2 border-t border-white/12 pt-5 sm:col-span-4">
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-white/44">
                {t.footer.askAi}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {ASK_AI_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-white/62 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-[12px] text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p>{t.footer.copyright(new Date().getFullYear())}</p>
            <Link
              href="/privacy-policy"
              className="text-signal transition-colors hover:text-white"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-signal transition-colors hover:text-white"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="/bot"
              className="text-signal transition-colors hover:text-white"
            >
              {t.footer.bot}
            </Link>
          </div>

          <div className="flex items-center gap-5 sm:justify-end">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.linkedin}
              title={t.footer.linkedin}
              className="inline-flex h-11 w-11 items-center justify-center rounded-button text-white/62 transition-colors hover:text-white lg:h-9 lg:w-9"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                fill="currentColor"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>
            <p className="inline-flex items-center gap-2">
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
      </div>
    </footer>
  );
}
