"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Check, ChevronDown, Globe } from "lucide-react";

import useAnalytics from "@/hooks/useAnalytics";
import { useDictionary, useLocale } from "@/i18n/use-locale";
import {
  LOCALES,
  counterpartPath,
  serializeLocaleCookie,
  type Locale,
} from "@/i18n/locale-rules.mjs";
import { getMarketingProperties } from "@/lib/marketing-analytics";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  placement,
  className,
}: {
  placement: "navbar" | "mobile_nav";
  className?: string;
}) {
  const locale = useLocale();
  const t = useDictionary();
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(LOCALES.indexOf(locale));
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close(false);
    };
    const onScroll = () => close(false);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open, close]);

  const select = useCallback(
    (next: Locale) => {
      // The cookie write must land before the navigation. `main.js` redirects
      // "/" to "/de" whenever bs_lang=de, so switching German -> English would
      // bounce straight back if the navigation went first.
      document.cookie = serializeLocaleCookie(
        next,
        typeof location !== "undefined" && location.protocol === "https:",
      );
      // Same-origin signal for anything (e.g. UntranslatedNotice) that needs
      // to react to the cookie change without a route transition.
      window.dispatchEvent(new Event("bs:locale-change"));
      const destination = counterpartPath(pathname, next);
      trackEvent({
        action: "language_switched",
        category: "marketing",
        from: locale,
        to: next,
        ...getMarketingProperties(placement, destination ?? pathname),
      });
      close(true);
      // No counterpart: stay put. The notice above picks up the cookie
      // change via the "bs:locale-change" event -- no router.refresh() is
      // needed, since locale/dictionary here are derived from the pathname,
      // not from server state that a refresh would refetch.
      if (destination) router.push(destination);
    },
    [close, locale, pathname, placement, router, trackEvent],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (
      !open &&
      (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(LOCALES.indexOf(locale));
      return;
    }
    if (!open) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % LOCALES.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + LOCALES.length) % LOCALES.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(LOCALES.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(LOCALES[activeIndex]);
    } else if (event.key === "Tab") {
      close(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onKeyDown={onKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={t.switcher.triggerAriaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open ? `${listboxId}-${LOCALES[activeIndex]}` : undefined
        }
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 items-center gap-1.5 px-2 text-[14px] font-semibold text-black/62 transition-colors hover:text-signal-ink focus-visible:ring-2 focus-visible:ring-signal-ink"
      >
        <Globe aria-hidden="true" className="h-4 w-4" />
        {t.switcher.names[locale]}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={t.switcher.listboxAriaLabel}
          tabIndex={-1}
          className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] border border-black/14 bg-ground shadow-lg"
        >
          {LOCALES.map((option, index) => (
            <li
              key={option}
              id={`${listboxId}-${option}`}
              role="option"
              aria-selected={option === locale}
              onPointerEnter={() => setActiveIndex(index)}
              onClick={() => select(option)}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2 px-3 text-[14px] text-ink-deep",
                index === activeIndex && "bg-black/5",
              )}
            >
              <Check
                aria-hidden="true"
                className={cn(
                  "h-3.5 w-3.5",
                  option === locale ? "opacity-100" : "opacity-0",
                )}
              />
              {t.switcher.names[option]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
