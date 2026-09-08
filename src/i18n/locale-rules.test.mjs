import assert from "node:assert/strict";
import test from "node:test";

import {
  counterpartPath,
  isCrawler,
  localeFromPathname,
  normalizePath,
  prefersGerman,
  primaryLanguage,
  readLocaleCookie,
  redirectTargetFor,
  serializeLocaleCookie,
} from "./locale-rules.mjs";

function redirectInput(overrides = {}) {
  return {
    method: "GET",
    pathname: "/",
    search: "",
    cookieHeader: null,
    acceptLanguage: null,
    country: null,
    userAgent: "Mozilla/5.0 (Macintosh) Chrome/140.0.0.0 Safari/537.36",
    hasLangParam: false,
    ...overrides,
  };
}

test("normalizePath strips trailing slashes and keeps the root", () => {
  assert.equal(normalizePath("/"), "/");
  assert.equal(normalizePath("/scan/"), "/scan");
  assert.equal(normalizePath("/de/"), "/de");
  assert.equal(normalizePath(""), "/");
  assert.equal(normalizePath("/scan//"), "/scan");
  assert.equal(normalizePath("/de//"), "/de");
  assert.equal(normalizePath("//"), "/");
});

test("localeFromPathname reads the /de prefix and nothing else", () => {
  assert.equal(localeFromPathname("/"), "en");
  assert.equal(localeFromPathname("/scan"), "en");
  assert.equal(localeFromPathname("/de"), "de");
  assert.equal(localeFromPathname("/de/"), "de");
  assert.equal(localeFromPathname("/de/scan"), "de");
  assert.equal(
    localeFromPathname("/design-system"),
    "en",
    "a path merely starting with the letters de is English",
  );
});

test("counterpartPath maps only the pairs that exist", () => {
  assert.equal(counterpartPath("/", "de"), "/de");
  assert.equal(counterpartPath("/scan", "de"), "/de/scan");
  assert.equal(counterpartPath("/de", "en"), "/");
  assert.equal(counterpartPath("/de/scan", "en"), "/scan");
  assert.equal(counterpartPath("/platform", "de"), null);
  assert.equal(counterpartPath("/", "en"), null, "already English");
  assert.equal(counterpartPath("/de", "de"), null, "already German");
});

test("readLocaleCookie accepts only known locales", () => {
  assert.equal(readLocaleCookie("bs_lang=de"), "de");
  assert.equal(readLocaleCookie("a=1; bs_lang=en; b=2"), "en");
  assert.equal(readLocaleCookie("bs_lang=fr"), null);
  assert.equal(readLocaleCookie("bs_langue=de"), null, "prefix must not match");
  assert.equal(readLocaleCookie(null), null);
  assert.equal(readLocaleCookie(""), null);
});

test("serializeLocaleCookie omits Secure off https", () => {
  assert.equal(
    serializeLocaleCookie("de", true),
    "bs_lang=de; Path=/; Max-Age=31536000; SameSite=Lax; Secure",
  );
  assert.equal(
    serializeLocaleCookie("en", false),
    "bs_lang=en; Path=/; Max-Age=31536000; SameSite=Lax",
  );
});

test("primaryLanguage takes the first tag, without its region or quality", () => {
  assert.equal(primaryLanguage("de-DE,de;q=0.9,en;q=0.8"), "de");
  assert.equal(primaryLanguage("en-US,en;q=0.9"), "en");
  assert.equal(primaryLanguage("DE"), "de");
  assert.equal(primaryLanguage(null), null);
});

test("prefersGerman covers the DACH countries and German speakers abroad", () => {
  for (const country of ["DE", "AT", "CH", "LI", "de"]) {
    assert.equal(prefersGerman(country, "en-US"), true, country);
  }
  assert.equal(prefersGerman("US", "de-DE,de;q=0.9"), true);
  assert.equal(prefersGerman("US", "en-US,en;q=0.9"), false);
  assert.equal(prefersGerman(null, null), false);
});

test("isCrawler matches the common bots and not a real browser", () => {
  const crawlers = [
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (compatible; bingbot/2.0)",
    "Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)",
    "Mozilla/5.0 (compatible; SemrushBot-BA)",
    "Mozilla/5.0 (compatible; PetalBot;+https://aspiegel.com/petalbot)",
    "Mozilla/5.0 (compatible; DuckDuckBot-Https/1.1)",
    "Mozilla/5.0 (compatible; SomeBot)",
    "Twitterbot/1.0",
    "Applebot/0.1",
    "Slurp",
    "Mozilla/5.0 (compatible; Yandex crawler)",
    "facebookexternalhit/1.1",
    "Mozilla/5.0 Chrome/140 HeadlessChrome/140",
  ];

  for (const ua of crawlers) {
    assert.equal(isCrawler(ua), true, `Expected crawler: ${ua}`);
  }

  const browsers = [
    "Mozilla/5.0 iRobot Home App",
    "Mozilla/5.0 (Linux; U; iRobotApp/3.2)",
    "Mozilla/5.0 (Bothell County Library Kiosk)",
    "Mozilla/5.0 RobotShop/1.0",
    "Mozilla/5.0 (Macintosh) Chrome/140.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; CrOS x86_64) AppleWebKit/537.36 Chrome/140",
    "Mozilla/5.0 (Windows NT 10.0; Xbox; Xbox One)",
  ];

  for (const ua of browsers) {
    assert.equal(isCrawler(ua), false, `Expected non-crawler: ${ua}`);
  }

  assert.equal(isCrawler(null), false);
});

test("a German visitor with no cookie is sent to the German page", () => {
  assert.equal(redirectTargetFor(redirectInput({ country: "DE" })), "/de");
  assert.equal(
    redirectTargetFor(redirectInput({ country: "AT", pathname: "/scan" })),
    "/de/scan",
  );
  assert.equal(redirectTargetFor(redirectInput({ country: "CH" })), "/de");
  assert.equal(
    redirectTargetFor(
      redirectInput({ country: "US", acceptLanguage: "de-DE,de;q=0.9" }),
    ),
    "/de",
  );
});

test("the redirect preserves the query string so UTM survives", () => {
  assert.equal(
    redirectTargetFor(
      redirectInput({ country: "DE", search: "?utm_source=x&utm_campaign=y" }),
    ),
    "/de?utm_source=x&utm_campaign=y",
  );
});

test("a remembered German choice beats geo", () => {
  assert.equal(
    redirectTargetFor(
      redirectInput({ country: "US", cookieHeader: "bs_lang=de" }),
    ),
    "/de",
  );
});

test("a remembered English choice is final", () => {
  assert.equal(
    redirectTargetFor(
      redirectInput({ country: "DE", cookieHeader: "bs_lang=en" }),
    ),
    null,
  );
});

test("nothing else is redirected", () => {
  assert.equal(
    redirectTargetFor(redirectInput({ country: "US" })),
    null,
    "English visitor",
  );
  assert.equal(
    redirectTargetFor(redirectInput({ country: "DE", method: "POST" })),
    null,
    "not a navigation",
  );
  assert.equal(
    redirectTargetFor(redirectInput({ country: "DE", pathname: "/platform" })),
    null,
    "untranslated route",
  );
  assert.equal(
    redirectTargetFor(redirectInput({ country: "DE", pathname: "/de" })),
    null,
    "already German",
  );
  assert.equal(
    redirectTargetFor(redirectInput({ country: "DE", hasLangParam: true })),
    null,
    "explicit override",
  );
  assert.equal(
    redirectTargetFor(
      redirectInput({
        country: "DE",
        userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1)",
      }),
    ),
    null,
    "crawlers must reach both languages directly",
  );
});

test("doubled-slash paths redirect correctly", () => {
  assert.equal(
    redirectTargetFor(redirectInput({ country: "DE", pathname: "/scan//" })),
    "/de/scan",
  );
});
