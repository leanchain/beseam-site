"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { shouldShowPrimaryCta } from "./navbar-state";

import { EarlyAccessCta } from "@/components/beseam/early-access-cta";
import LanguageSwitcher from "@/components/beseam/language-switcher";
import Logo from "@/components/beseam/logo";
import TrackedLink from "@/components/beseam/tracked-link";
import UntranslatedNotice from "@/components/beseam/untranslated-notice";
import {
  LOCALIZED_ROUTES,
  localizedPath,
  normalizePath,
} from "@/i18n/locale-rules.mjs";
import { useDictionary, useLocale } from "@/i18n/use-locale";
import { APP_LOGIN_URL } from "@/lib/app-urls";
import { PRICING_PUBLIC } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type Menu = ReturnType<typeof useDictionary>["nav"]["menu"];
type GroupKey = Exclude<keyof Menu, "pricing">;

// Every homepage, not just the English one. Derived from LOCALIZED_ROUTES so
// that adding a locale cannot leave a translated homepage behind.
const HOME_PATHS = new Set(["/", ...Object.values(LOCALIZED_ROUTES["/"])]);
const SCAN_PATHS = new Set([
  "/scan",
  ...Object.values(LOCALIZED_ROUTES["/scan"]),
]);

/**
 * Where each menu item points. An entry starting with "#" would be a section
 * of the (current-language) homepage; every item has its own page now.
 */
const DESTINATIONS: {
  [G in GroupKey]: Record<keyof Menu[G]["items"], string>;
} & { pricing: string } = {
  product: {
    tracking: "/product/ai-visibility-tracking",
    descriptions: "/product/product-descriptions",
    content: "/product/content-creation",
    technical: "/product/technical-performance",
  },
  solutions: {
    footwear: "/solutions/footwear",
    apparel: "/solutions/fashion-apparel",
    beauty: "/solutions/beauty-cosmetics",
    electronics: "/solutions/consumer-electronics",
    shopify: "/solutions/shopify",
  },
  resources: {
    blog: "/blog",
    report: "/benchmarks",
    compare: "/compare",
  },
  company: {
    about: "/about",
    contact: "/contact",
  },
  pricing: "/pricing",
};

const GROUPS: readonly GroupKey[] = [
  "product",
  "solutions",
  "resources",
  "company",
];

export default function BeseamNavbar() {
  const t = useDictionary();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const currentPath = normalizePath(pathname ?? "/");
  const isScanPage = SCAN_PATHS.has(currentPath);
  const homePath = locale === "en" ? "/" : `/${locale}`;
  // Menu targets are English paths; send each reader to their language.
  const resolve = (target: string) =>
    localizedPath(target.startsWith("#") ? `/${target}` : target, locale);

  // The scan itself owns the activation handoff because only its finished result
  // can carry scan_domain into registration. A generic navbar Register link on
  // this page would silently lose the store the visitor just scanned.
  const showCta = shouldShowPrimaryCta({
    isHome: HOME_PATHS.has(currentPath),
    isScanPage,
    pastHero,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const groupLinks = (group: GroupKey) =>
    (
      Object.entries(t.nav.menu[group].items) as [
        keyof Menu[typeof group]["items"],
        string,
      ][]
    ).map(([key, label]) => ({
      key: String(key),
      label,
      href: resolve(
        (DESTINATIONS[group] as Record<string, string>)[String(key)],
      ),
    }));

  return (
    <header
      className={cn(
        "sticky z-50 mx-auto border transition-all duration-200",
        scrolled
          ? "top-3 w-[calc(100%-1.5rem)] max-w-[95rem] rounded-none border-black/14 bg-ground/72 shadow-lg backdrop-blur-2xl"
          : "top-0 w-full border-x-transparent border-t-transparent border-b-black/10 bg-ground/92 backdrop-blur-md",
      )}
    >
      <a
        href="#main-content"
        className="absolute left-4 top-2 -translate-y-20 bg-ink-deep px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        {t.nav.skipToContent}
      </a>

      <UntranslatedNotice />

      <div className="mx-auto max-w-[92rem] px-4 transition-all duration-200 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-200",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <Link
            href={homePath}
            className="flex items-center"
            aria-label={t.nav.homeAriaLabel}
          >
            <Logo
              variant="secondary"
              className="text-ink-deep"
              markClassName="drop-shadow-none"
            />
          </Link>

          <nav
            aria-label={t.nav.primaryAriaLabel}
            className="hidden items-center lg:flex"
          >
            {GROUPS.slice(0, 2).map((group) => (
              <NavDropdown
                key={group}
                label={t.nav.menu[group].label}
                links={groupLinks(group)}
              />
            ))}
            {PRICING_PUBLIC ? (
              <Link
                href={resolve(DESTINATIONS.pricing)}
                className="min-h-11 whitespace-nowrap px-3 py-3 text-[14px] font-medium text-black/62 transition-colors hover:text-ink-deep focus-visible:ring-2 focus-visible:ring-signal-ink xl:px-4"
              >
                {t.nav.menu.pricing}
              </Link>
            ) : null}
            {GROUPS.slice(2).map((group) => (
              <NavDropdown
                key={group}
                label={t.nav.menu[group].label}
                links={groupLinks(group)}
              />
            ))}
          </nav>

          <div
            className={cn(
              "hidden items-center lg:flex",
              scrolled ? "gap-3" : "gap-5",
            )}
          >
            <LanguageSwitcher placement="navbar" />
            <TrackedLink
              href={APP_LOGIN_URL}
              eventName="login_clicked"
              placement="navbar"
              className="text-[14px] font-semibold text-black/62 transition-colors hover:text-signal-ink"
            >
              {t.nav.login}
            </TrackedLink>
            {showCta && (
              <EarlyAccessCta
                placement="navbar"
                className="group inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-button bg-signal-ink px-4 text-[13px] font-semibold text-white focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-3"
              >
                {t.nav.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </EarlyAccessCta>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-button border border-black/40 text-ink-deep lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileOpen ? t.nav.closeNavigation : t.nav.openNavigation
            }
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className={cn(
            "max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-black/18 lg:hidden",
            scrolled ? "bg-ground/88 backdrop-blur-2xl" : "bg-ground",
          )}
        >
          <div className="mx-auto max-w-[92rem] px-5 pb-7 sm:px-8">
            <nav
              aria-label={t.nav.mobileAriaLabel}
              className="grid gap-6 border-b border-black/18 py-5 sm:grid-cols-2"
            >
              {GROUPS.map((group) => (
                <div key={group}>
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-black/50">
                    {t.nav.menu[group].label}
                  </p>
                  <ul className="mt-2">
                    {groupLinks(group).map((link) => (
                      <li key={link.key}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-[15px] font-semibold text-ink-deep"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {PRICING_PUBLIC ? (
                <Link
                  href={resolve(DESTINATIONS.pricing)}
                  onClick={() => setMobileOpen(false)}
                  className="text-[15px] font-semibold text-ink-deep"
                >
                  {t.nav.menu.pricing}
                </Link>
              ) : null}
            </nav>
            <div className="mt-5">
              <LanguageSwitcher placement="mobile_nav" className="w-full" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <TrackedLink
                href={APP_LOGIN_URL}
                eventName="login_clicked"
                placement="mobile_nav"
                className="flex min-h-12 items-center justify-center rounded-button border border-black/40 text-[14px] font-semibold text-ink-deep"
              >
                {t.nav.login}
              </TrackedLink>
              {showCta ? (
                <EarlyAccessCta
                  placement="mobile_nav"
                  onOpen={() => setMobileOpen(false)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-button bg-signal-ink px-5 text-[14px] font-semibold text-white"
                >
                  {t.nav.cta}
                  <ArrowRight className="h-4 w-4" />
                </EarlyAccessCta>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * One menu group: opens on hover (with a short grace period so the pointer
 * can travel into the panel) and on click, closes on Escape, on a click
 * elsewhere, or when focus leaves it.
 */
function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: { key: string; label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  }, [cancelClose]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => cancelClose, [cancelClose]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap px-3 py-3 text-[14px] font-medium text-black/62 transition-colors hover:text-ink-deep focus-visible:ring-2 focus-visible:ring-signal-ink xl:px-4"
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-50 min-w-[15rem] rounded-media border border-black/10 bg-white p-2 shadow-[0_18px_40px_-20px_rgba(17,19,24,0.35)]">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-button px-3 py-2.5 text-[14px] font-medium text-ink-deep transition-colors hover:bg-[#fff9e8] focus-visible:bg-[#fff9e8] focus-visible:outline-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
