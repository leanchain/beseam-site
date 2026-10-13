import type { Locale } from "../locale-rules.mjs";
import { pagesDe } from "./de";
import { pagesEn, type PageCopy } from "./en";
import { pagesNl } from "./nl";

const PAGE_COPY: Record<Locale, PageCopy> = {
  en: pagesEn,
  de: pagesDe,
  nl: pagesNl,
};

export function getPageCopy(locale: Locale): PageCopy {
  return PAGE_COPY[locale];
}

export type { PageCopy };
