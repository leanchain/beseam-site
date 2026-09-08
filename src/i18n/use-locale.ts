"use client";

import { usePathname } from "next/navigation";

import { localeFromPathname, type Locale } from "./locale-rules.mjs";
import { getDictionary, type Dictionary } from ".";

/**
 * The navbar and footer live in the root layout and are shared by all 19
 * routes, so they cannot take a locale prop from a page. Under `output:
 * "export"` there is no request object either -- the path is the only locale
 * signal available at render time, and it is an exact one.
 */
export function useLocale(): Locale {
  return localeFromPathname(usePathname() ?? "/");
}

export function useDictionary(): Dictionary {
  return getDictionary(useLocale());
}
