"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { useDictionary } from "@/i18n/use-locale";

export default function CookieConsent() {
  const t = useDictionary();
  const { status, accept, decline } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer =
      status === "undecided"
        ? window.setTimeout(() => setIsVisible(true), 400)
        : undefined;
    if (status !== "undecided") setIsVisible(false);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [status]);

  if (!isVisible) return null;

  return (
    <aside
      aria-label={t.cookies.ariaLabel}
      className="fixed bottom-0 left-0 right-0 z-50 w-full border border-white/16 bg-ink-deep p-3 shadow-[0_-6px_24px_rgba(17,19,24,0.18)] sm:bottom-5 sm:left-5 sm:right-auto sm:w-[calc(100%-2.5rem)] sm:max-w-[22rem]"
    >
      <p className="text-[11.5px] leading-[1.5] text-white/68">
        {t.cookies.text}{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-white underline decoration-white/30 underline-offset-3 hover:decoration-signal"
        >
          {t.cookies.policy}
        </Link>
      </p>
      <div className="mt-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={decline}
          className="min-h-8 border border-white/28 px-3 text-[11.5px] font-semibold text-white/88 transition-colors hover:border-signal hover:text-signal"
        >
          {t.cookies.reject}
        </button>
        <button
          type="button"
          onClick={accept}
          className="min-h-8 bg-signal-ink px-3 text-[11.5px] font-semibold text-white"
        >
          {t.cookies.accept}
        </button>
      </div>
    </aside>
  );
}
