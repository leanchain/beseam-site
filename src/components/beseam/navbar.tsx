"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowRight, Menu, X } from "lucide-react";

import Logo from "@/components/beseam/logo";
import TrackedLink from "@/components/beseam/tracked-link";
import { useDictionary } from "@/i18n/use-locale";
import { APP_LOGIN_URL } from "@/lib/app-urls";
import { cn } from "@/lib/utils";
// Fieldbook stays reachable from the footer; primary nav keeps only what a
// buyer needs to understand and start: product, method, research.
const NAV_LINKS = [
  { key: "platform", href: "/platform" },
  { key: "howWeWork", href: "/how-we-work" },
  { key: "report", href: "/benchmarks" },
] as const;

export default function BeseamNavbar() {
  const t = useDictionary();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // The homepage hero carries its own scan form, so the navbar CTA would ask
  // for the same action twice above the fold. Everywhere else it is the only
  // primary action in view and stays put.
  const showCta = pathname !== "/" || pastHero;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      <div className="mx-auto max-w-[92rem] px-4 transition-all duration-200 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-200",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <Link
            href="/"
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="min-h-11 whitespace-nowrap px-3 py-3 text-[14px] font-medium text-black/62 transition-colors hover:text-ink-deep focus-visible:ring-2 focus-visible:ring-signal-ink xl:px-4"
              >
                {t.nav.links[link.key]}
              </Link>
            ))}
          </nav>

          <div
            className={cn(
              "hidden items-center lg:flex",
              scrolled ? "gap-3" : "gap-5",
            )}
          >
            <TrackedLink
              href={APP_LOGIN_URL}
              eventName="login_clicked"
              placement="navbar"
              className="text-[14px] font-semibold text-black/62 transition-colors hover:text-signal-ink"
            >
              {t.nav.login}
            </TrackedLink>
            {showCta && (
              <TrackedLink
                href="/scan"
                eventName="marketing_primary_cta_clicked"
                eventCategory="conversion"
                placement="navbar"
                preserveUtm
                className="group inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap bg-signal-ink px-4 text-[13px] font-semibold text-white focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-3"
              >
                {t.nav.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-black/40 text-ink-deep lg:hidden"
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
            "border-t border-black/18 lg:hidden",
            scrolled ? "bg-ground/88 backdrop-blur-2xl" : "bg-ground",
          )}
        >
          <div className="mx-auto max-w-[92rem] px-5 pb-7 sm:px-8">
            <nav
              aria-label={t.nav.mobileAriaLabel}
              className="border-b border-black/18 py-3"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-black/14 py-4 text-[14px] font-semibold text-black/68 last:border-b-0"
                >
                  {t.nav.links[link.key]}
                </Link>
              ))}
            </nav>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <TrackedLink
                href={APP_LOGIN_URL}
                eventName="login_clicked"
                placement="mobile_nav"
                className="flex min-h-12 items-center justify-center border border-black/40 text-[14px] font-semibold text-ink-deep"
              >
                {t.nav.login}
              </TrackedLink>
              <TrackedLink
                href="/scan"
                eventName="marketing_primary_cta_clicked"
                eventCategory="conversion"
                placement="mobile_nav"
                preserveUtm
                onClick={() => setMobileOpen(false)}
                className="flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-5 text-[14px] font-semibold text-white"
              >
                {t.nav.cta}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
