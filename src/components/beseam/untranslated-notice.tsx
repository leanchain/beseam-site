"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { X } from "lucide-react";

import { useDictionary } from "@/i18n/use-locale";
import { counterpartPath, readLocaleCookie } from "@/i18n/locale-rules.mjs";

const DISMISS_KEY = "bs_lang_notice_dismissed";

/**
 * Shown only to someone who has asked for German while standing on a page that
 * has none. Reading the cookie is a client effect on purpose: the notice never
 * appears in the exported HTML, so it cannot confuse a crawler or force a Vary
 * on a cached asset.
 */
export default function UntranslatedNotice() {
  const t = useDictionary();
  const pathname = usePathname() ?? "/";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const wantsGerman = readLocaleCookie(document.cookie) === "de";
    const hasGerman =
      counterpartPath(pathname, "de") !== null || pathname.startsWith("/de");
    const dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    setShow(wantsGerman && !hasGerman && !dismissed);
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="border-b border-black/14 bg-[#faf1eb]">
      <div className="mx-auto flex max-w-[92rem] items-center justify-center gap-3 px-4 py-2.5 text-[13px] text-black/70 sm:px-6 lg:px-8">
        <span>{t.notice.text}</span>
        <Link
          href="/de"
          className="font-semibold text-ink-deep underline decoration-black/25 underline-offset-4 hover:decoration-signal-ink"
        >
          {t.notice.link}
        </Link>
        <button
          type="button"
          aria-label={t.notice.dismiss}
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1");
            setShow(false);
          }}
          className="ml-1 inline-flex h-11 w-11 items-center justify-center text-black/50 hover:text-ink-deep focus-visible:ring-2 focus-visible:ring-signal-ink"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
