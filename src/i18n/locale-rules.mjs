/**
 * Locale rules shared by the browser and the Cloudflare Worker.
 *
 * Plain ESM on purpose: `main.js` bundles this file directly, so the redirect
 * the Worker performs and the navigation the language switcher performs can
 * never disagree about which paths pair up or what the cookie means. Nothing
 * here touches the DOM, `window`, or a Worker API -- every function takes its
 * inputs as arguments so `node --test` can exercise all of it.
 */

/** @type {readonly ["en", "de", "nl"]} */
export const LOCALES = ["en", "de", "nl"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_COOKIE = "bs_lang";

/** Every locale that lives under its own path prefix (`/de`, `/nl`). */
const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

const COOKIE_MAX_AGE_SECONDS = 31536000; // one year

/**
 * Pages the Worker may redirect a first-time visitor to their own language.
 * Only these run through the Worker (see `run_worker_first` in
 * wrangler.jsonc); every other page is served straight from the assets.
 */
const REDIRECTED_PATHS = Object.freeze(["/", "/scan"]);

/**
 * Every English page that has a German and a Dutch version, under the same
 * path behind a `/de` or `/nl` prefix. Every prefixed locale translates the
 * same set, so adding a page here is the single edit that makes the switcher,
 * the notice and in-page links agree about it.
 */
const TRANSLATED_PATHS = Object.freeze([
  ...REDIRECTED_PATHS,
  "/about",
  "/contact",
  "/pricing",
  "/blog",
  "/benchmarks",
  "/compare",
]);

/** Sections whose every page is translated, e.g. `/product/<slug>`. */
const TRANSLATED_PREFIXES = Object.freeze([
  "/product/",
  "/solutions/",
  "/blog/",
  "/compare/",
]);

/** @param {string} englishPath */
function isTranslated(englishPath) {
  return (
    TRANSLATED_PATHS.includes(englishPath) ||
    TRANSLATED_PREFIXES.some((prefix) => englishPath.startsWith(prefix))
  );
}

/** @param {string} locale @param {string} englishPath */
function prefixed(locale, englishPath) {
  return englishPath === "/" ? `/${locale}` : `/${locale}${englishPath}`;
}

/**
 * English path -> that page in every prefixed locale, e.g.
 * `LOCALIZED_ROUTES["/"].de === "/de"`.
 */
export const LOCALIZED_ROUTES = Object.freeze(
  Object.fromEntries(
    REDIRECTED_PATHS.map((path) => [
      path,
      Object.freeze(
        Object.fromEntries(
          PREFIXED_LOCALES.map((locale) => [locale, prefixed(locale, path)]),
        ),
      ),
    ]),
  ),
);

// Country is a proxy for language, never a statement about it. CH and LI are
// multilingual and are mapped to German deliberately: German is the largest
// language in both, the switcher is one click away, and there is no French or
// Italian page to send anyone to yet. Belgium is left to Accept-Language: it
// splits between Dutch and French, and guessing wrong sends half of it to a
// language it does not read.
const COUNTRY_LOCALE = Object.freeze({
  DE: "de",
  AT: "de",
  CH: "de",
  LI: "de",
  NL: "nl",
});

// Crawler names carry `bot` as a compound suffix (`Googlebot/2.1`,
// `SemrushBot-BA`), so a left `\b` would break them. What separates a crawler
// from a product name is what follows: a crawler's `bot` is terminal or
// delimited, while `iRobot Home App` and `iRobotApp/3.2` run on into another
// word. Verified against 13 real crawler UAs (Googlebot, bingbot, AhrefsBot,
// SemrushBot-BA, Twitterbot, Applebot, PetalBot, DuckDuckBot-Https, Slurp,
// Yandex crawler, facebookexternalhit, HeadlessChrome) and 7 real browser and
// device UAs: all 13 match, none of the 7 do.
// `crawler` precedes `crawl` because alternation is leftmost-first.
const CRAWLER =
  /bot(?=[/;)_,-]|$)|(?:crawler|crawl|spider|slurp)(?![a-z])|bingpreview|facebookexternalhit|embedly|quora link preview|outbrain|pinterest|w3c_validator|lighthouse|headlesschrome/i;

/** @param {string} pathname */
export function normalizePath(pathname) {
  if (!pathname) return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

/** @param {string} pathname */
export function localeFromPathname(pathname) {
  const path = normalizePath(pathname);
  for (const locale of PREFIXED_LOCALES) {
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return locale;
  }
  return DEFAULT_LOCALE;
}

/** @param {string} pathname the English path behind any locale prefix. */
function englishPathOf(pathname) {
  const path = normalizePath(pathname);
  const locale = localeFromPathname(path);
  if (locale === DEFAULT_LOCALE) return path;
  return normalizePath(path.slice(locale.length + 1));
}

/**
 * @param {string} pathname
 * @param {"en" | "de" | "nl"} target
 * @returns {string | null} the same page in `target`, or null when it has
 *   none or the path is already in `target`.
 */
export function counterpartPath(pathname, target) {
  const path = normalizePath(pathname);
  if (localeFromPathname(path) === target) return null;
  const english = englishPathOf(path);
  if (!isTranslated(english)) return null;
  return target === DEFAULT_LOCALE ? english : prefixed(target, english);
}

/**
 * Where an internal link should point for a reader of `locale`: the page in
 * their language when it exists, otherwise the English page. Anchors and
 * query strings are kept; external URLs and `#` links pass through.
 *
 * @param {string} href an English path such as `/product/x` or `/#faq`.
 * @param {"en" | "de" | "nl"} locale
 */
export function localizedPath(href, locale) {
  if (locale === DEFAULT_LOCALE || !href.startsWith("/")) return href;
  const match = /^([^?#]*)(.*)$/.exec(href);
  const path = normalizePath(match?.[1] ?? href);
  const rest = match?.[2] ?? "";
  if (!isTranslated(path)) return href;
  return prefixed(locale, path) + rest;
}

/** Every translated English path that is a fixed page (not a section). */
export const TRANSLATED_PAGES = TRANSLATED_PATHS;

/** @param {string | null | undefined} cookieHeader */
export function readLocaleCookie(cookieHeader) {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() !== LOCALE_COOKIE) continue;
    const value = part.slice(separator + 1).trim();
    return LOCALES.includes(/** @type {any} */ (value)) ? value : null;
  }
  return null;
}

/**
 * @param {"en" | "de" | "nl"} locale
 * @param {boolean} secure `Secure` is dropped by the browser on the http
 *   localhost dev worker, which would make the redirect untestable locally.
 */
export function serializeLocaleCookie(locale, secure) {
  const parts = [
    `${LOCALE_COOKIE}=${locale}`,
    "Path=/",
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

/** @param {string | null | undefined} header */
export function primaryLanguage(header) {
  if (!header) return null;
  const first = header.split(",")[0];
  if (!first) return null;
  const tag = first.split(";")[0].trim().toLowerCase().split("-")[0];
  return tag || null;
}

/**
 * The translated locale a first-time visitor most likely reads, or null for
 * English. A browser language of German or Dutch wins over the country, so a
 * Dutch speaker in Zurich is not sent to the German page.
 *
 * @param {string | null | undefined} country
 * @param {string | null | undefined} acceptLanguage
 * @returns {"de" | "nl" | null}
 */
export function preferredLocale(country, acceptLanguage) {
  const language = primaryLanguage(acceptLanguage);
  if (PREFIXED_LOCALES.includes(/** @type {any} */ (language))) {
    return /** @type {"de" | "nl"} */ (language);
  }
  if (!country) return null;
  return (
    COUNTRY_LOCALE[
      /** @type {keyof typeof COUNTRY_LOCALE} */ (country.toUpperCase())
    ] ?? null
  );
}

/**
 * @param {string | null | undefined} country
 * @param {string | null | undefined} acceptLanguage
 */
export function prefersGerman(country, acceptLanguage) {
  return preferredLocale(country, acceptLanguage) === "de";
}

/** @param {string | null | undefined} userAgent */
export function isCrawler(userAgent) {
  return Boolean(userAgent) && CRAWLER.test(userAgent);
}

/**
 * The whole redirect decision, as one pure function.
 *
 * @param {{
 *   method: string,
 *   pathname: string,
 *   search: string,
 *   cookieHeader: string | null | undefined,
 *   acceptLanguage: string | null | undefined,
 *   country: string | null | undefined,
 *   userAgent: string | null | undefined,
 *   hasLangParam: boolean,
 * }} input
 * @returns {string | null} the path to redirect to, or null to serve the asset.
 */
export function redirectTargetFor(input) {
  if (input.method !== "GET" && input.method !== "HEAD") return null;

  const path = normalizePath(input.pathname);
  if (!Object.hasOwn(LOCALIZED_ROUTES, path)) return null;

  // Escape hatch for support links and debugging: ?lang= anything pins the
  // URL you were given, whatever the cookie or the IP say.
  if (input.hasLangParam) return null;

  const chosen = readLocaleCookie(input.cookieHeader);
  if (chosen === DEFAULT_LOCALE) return null;

  let target = chosen;
  if (!target) {
    if (isCrawler(input.userAgent)) return null;
    target = preferredLocale(input.country, input.acceptLanguage);
    if (!target) return null;
  }

  return LOCALIZED_ROUTES[path][target] + (input.search || "");
}
