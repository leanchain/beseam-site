"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { X } from "lucide-react";

import { getDictionary } from "@/i18n";
import {
  DEFAULT_LOCALE,
  counterpartPath,
  localeFromPathname,
  readLocaleCookie,
  type Locale,
} from "@/i18n/locale-rules.mjs";

const DISMISS_KEY = "bs_lang_notice_dismissed";

/**
 * Shown only to someone who has asked for a translated language while standing
 * on a page that has none. It speaks the language they asked for, not the
 * language of the page they are on. Reading the cookie is a client effect on purpose: the notice never
 * appears in the exported HTML, so it cannot confuse a crawler or force a Vary
 * on a cached asset.
 */
export default function UntranslatedNotice() {
  const pathname = usePathname() ?? "/";
  const [wanted, setWanted] = useState<Locale | null>(null);

  useEffect(() => {
    const evaluate = () => {
      const chosen = readLocaleCookie(document.cookie);
      const hasTranslation =
        chosen === null ||
        chosen === DEFAULT_LOCALE ||
        localeFromPathname(pathname) === chosen ||
        counterpartPath(pathname, chosen) !== null;
      const dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
      setWanted(!hasTranslation && !dismissed ? chosen : null);
    };
    evaluate();
    window.addEventListener("bs:locale-change", evaluate);
    return () => window.removeEventListener("bs:locale-change", evaluate);
  }, [pathname]);

  if (!wanted) return null;
  const t = getDictionary(wanted);

  return (
    <div className="border-b border-black/14 bg-[#fff9e8]">
      <div className="mx-auto flex max-w-[92rem] items-center justify-center gap-3 px-4 py-2.5 text-[13px] text-black/70 sm:px-6 lg:px-8">
        <span>{t.notice.text}</span>
        <Link
          href={`/${wanted}`}
          className="font-semibold text-ink-deep underline decoration-black/25 underline-offset-4 hover:decoration-signal-ink"
        >
          {t.notice.link}
        </Link>
        <button
          type="button"
          aria-label={t.notice.dismiss}
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1");
            setWanted(null);
          }}
          className="ml-1 inline-flex h-11 w-11 items-center justify-center text-black/50 hover:text-ink-deep focus-visible:ring-2 focus-visible:ring-signal-ink"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
