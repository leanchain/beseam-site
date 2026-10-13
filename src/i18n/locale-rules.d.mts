export type Locale = "en" | "de" | "nl";

export declare const LOCALES: readonly ["en", "de", "nl"];
export declare const DEFAULT_LOCALE: "en";
export declare const LOCALE_COOKIE: "bs_lang";
export declare const LOCALIZED_ROUTES: Readonly<
  Record<string, Readonly<Record<Exclude<Locale, "en">, string>>>
>;

export declare function normalizePath(pathname: string): string;
export declare function localeFromPathname(pathname: string): Locale;
export declare function counterpartPath(
  pathname: string,
  target: Locale,
): string | null;
export declare function readLocaleCookie(
  cookieHeader: string | null | undefined,
): Locale | null;
export declare function serializeLocaleCookie(
  locale: Locale,
  secure: boolean,
): string;
export declare function primaryLanguage(
  header: string | null | undefined,
): string | null;
export declare function preferredLocale(
  country: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Exclude<Locale, "en"> | null;
export declare function prefersGerman(
  country: string | null | undefined,
  acceptLanguage: string | null | undefined,
): boolean;
export declare function isCrawler(
  userAgent: string | null | undefined,
): boolean;
export declare function redirectTargetFor(input: {
  method: string;
  pathname: string;
  search: string;
  cookieHeader: string | null | undefined;
  acceptLanguage: string | null | undefined;
  country: string | null | undefined;
  userAgent: string | null | undefined;
  hasLangParam: boolean;
}): string | null;
export declare function localizedPath(href: string, locale: Locale): string;
export declare const TRANSLATED_PAGES: readonly string[];
