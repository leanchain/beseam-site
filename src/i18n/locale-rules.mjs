/**
 * Locale rules shared by the browser and the Cloudflare Worker.
 *
 * Plain ESM on purpose: `main.js` bundles this file directly, so the redirect
 * the Worker performs and the navigation the language switcher performs can
 * never disagree about which paths pair up or what the cookie means. Nothing
 * here touches the DOM, `window`, or a Worker API -- every function takes its
 * inputs as arguments so `node --test` can exercise all of it.
 */

/** @type {readonly ["en", "de"]} */
export const LOCALES = ["en", "de"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_COOKIE = "bs_lang";

const COOKIE_MAX_AGE_SECONDS = 31536000; // one year

/**
 * The only pairs that exist. English path -> German path. Adding a page to
 * this map is the single edit that makes the switcher, the notice and the
 * Worker redirect all agree about it.
 */
export const LOCALIZED_ROUTES = Object.freeze({
  "/": "/de",
  "/scan": "/de/scan",
});

const GERMAN_TO_ENGLISH = Object.freeze(
  Object.fromEntries(
    Object.entries(LOCALIZED_ROUTES).map(([english, german]) => [
      german,
      english,
    ]),
  ),
);

// Country is a proxy for language, never a statement about it. CH and LI are
// multilingual and are mapped to German deliberately: German is the largest
// language in both, the switcher is one click away, and there is no French or
// Italian page to send anyone to yet.
const GERMAN_COUNTRIES = new Set(["DE", "AT", "CH", "LI"]);

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
  return path === "/de" || path.startsWith("/de/") ? "de" : DEFAULT_LOCALE;
}

/**
 * @param {string} pathname
 * @param {"en" | "de"} target
 * @returns {string | null} the same page in `target`, or null when it has none.
 */
export function counterpartPath(pathname, target) {
  const path = normalizePath(pathname);
  const table = target === "de" ? LOCALIZED_ROUTES : GERMAN_TO_ENGLISH;
  return Object.hasOwn(table, path) ? table[path] : null;
}

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
 * @param {"en" | "de"} locale
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
 * @param {string | null | undefined} country
 * @param {string | null | undefined} acceptLanguage
 */
export function prefersGerman(country, acceptLanguage) {
  if (country && GERMAN_COUNTRIES.has(country.toUpperCase())) return true;
  return primaryLanguage(acceptLanguage) === "de";
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
  if (chosen === "en") return null;

  if (chosen !== "de") {
    if (isCrawler(input.userAgent)) return null;
    if (!prefersGerman(input.country, input.acceptLanguage)) return null;
  }

  return LOCALIZED_ROUTES[path] + (input.search || "");
}
