import { afterEach, describe, expect, it, spyOn } from "bun:test";

import {
  BESEAM_PRODUCTION_UMAMI_CONFIG,
  UMAMI_BEFORE_SEND_GLOBAL,
  UMAMI_CONSENT_GLOBAL,
  UMAMI_SCRIPT_ID,
  landingUmamiConfig,
  loadUmami,
  sanitizeUmamiPayload,
  sanitizedUmamiUrl,
  setUmamiConsent,
  umamiBeforeSend,
  umamiConfig,
} from "./umami.ts";

const ORIGIN = "https://beseam.com";
const CONFIG = {
  websiteId: "site-1",
  scriptUrl: "https://a.beseam.com/script.js",
  domains: "beseam.com,www.beseam.com",
};

/**
 * A page view as the tracker builds it on the answer-check hand-off. `id` and
 * `cache` are here so the exact-match test below sees any field the allowlist
 * would let through: a distinct id, and one the module has never heard of.
 */
function pageview(overrides = {}) {
  return {
    website: "site-1",
    hostname: "beseam.com",
    language: "de-CH",
    screen: "390x844",
    title: "acme-outdoor.com — AI answer check",
    url: `${ORIGIN}/scan?domain=acme-outdoor.com&verified=1&utm_source=newsletter`,
    referrer: "",
    id: "user-42",
    cache: "abc",
    ...overrides,
  };
}

describe("landing Umami payload", () => {
  it("drops the checked store address and the title, and keeps campaign tags", () => {
    const out = sanitizeUmamiPayload("event", pageview(), ORIGIN);
    expect(out).toEqual({
      website: "site-1",
      hostname: "beseam.com",
      language: "de-CH",
      screen: "390x844",
      url: `${ORIGIN}/scan?utm_source=newsletter`,
      referrer: "",
    });
    expect(JSON.stringify(out)).not.toContain("acme-outdoor");
  });

  it("reduces a same-origin referrer to its path and keeps an external one", () => {
    expect(sanitizedUmamiUrl("/?domain=acme-outdoor.com", ORIGIN)).toBe("/");
    expect(sanitizedUmamiUrl("https://www.google.com/", ORIGIN)).toBe(
      "https://www.google.com/",
    );
  });

  it("sends page views only", () => {
    expect(
      sanitizeUmamiPayload("event", pageview({ name: "cta_click" }), ORIGIN),
    ).toBeNull();
    expect(sanitizeUmamiPayload("identify", pageview(), ORIGIN)).toBeNull();
  });

  it("refuses a send whose URL is missing or not the web, and drops the fragment", () => {
    expect(
      sanitizeUmamiPayload("event", pageview({ url: "" }), ORIGIN),
    ).toBeNull();
    expect(
      sanitizeUmamiPayload(
        "event",
        pageview({ url: "javascript:alert(1)" }),
        ORIGIN,
      ),
    ).toBeNull();
    expect(
      sanitizeUmamiPayload(
        "event",
        pageview({ url: "ftp://beseam.com/scan" }),
        ORIGIN,
      ),
    ).toBeNull();
    const withFragment = pageview({
      url: `${ORIGIN}/scan#domain=acme-outdoor.com`,
    });
    expect(sanitizeUmamiPayload("event", withFragment, ORIGIN)?.url).toBe(
      `${ORIGIN}/scan`,
    );
  });

  it("sanitises the referrer it sends, not only the page URL", () => {
    const fromScan = pageview({
      referrer: "/scan?domain=acme-outdoor.com&utm_medium=email",
    });
    expect(sanitizeUmamiPayload("event", fromScan, ORIGIN)?.referrer).toBe(
      "/scan?utm_medium=email",
    );
    const fromSearch = pageview({
      referrer: "https://www.google.com/search?q=acme-outdoor.com",
    });
    expect(sanitizeUmamiPayload("event", fromSearch, ORIGIN)?.referrer).toBe(
      "https://www.google.com/search",
    );
  });
});

describe("landing Umami consent latch", () => {
  const realWindow = globalThis.window;
  afterEach(() => {
    globalThis.window = realWindow;
  });

  it("sends nothing unless consent is latched", () => {
    globalThis.window = { location: { origin: ORIGIN } };
    const hook = umamiBeforeSend();
    expect(hook("event", pageview())).toBeNull();
    globalThis.window[UMAMI_CONSENT_GLOBAL] = true;
    expect(hook("event", pageview())?.url).toBe(
      `${ORIGIN}/scan?utm_source=newsletter`,
    );
    globalThis.window[UMAMI_CONSENT_GLOBAL] = false;
    expect(hook("event", pageview())).toBeNull();
  });
});

describe("landing Umami tracker tag", () => {
  const realWindow = globalThis.window;
  const realDocument = globalThis.document;
  afterEach(() => {
    globalThis.window = realWindow;
    globalThis.document = realDocument;
  });

  /** Just enough DOM for `loadUmami`; records the hook the page holds when the tag lands. */
  function fakePage() {
    const tags = [];
    const page = { tags, hookWhenMounted: undefined };
    globalThis.window = { location: { origin: ORIGIN } };
    globalThis.document = {
      getElementById: (id) => tags.find((tag) => tag.id === id) ?? null,
      createElement: (tagName) => ({
        tagName,
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
      }),
      head: {
        appendChild(tag) {
          page.hookWhenMounted = globalThis.window[UMAMI_BEFORE_SEND_GLOBAL];
          tags.push(tag);
        },
      },
    };
    return page;
  }

  it("installs the hook before the tag exists and mounts one tag, however often it is called", () => {
    const page = fakePage();
    expect(loadUmami(CONFIG)).toBe(true);
    expect(loadUmami(CONFIG)).toBe(true);
    expect(typeof page.hookWhenMounted).toBe("function");
    expect(page.tags).toHaveLength(1);
    expect(page.tags[0]).toMatchObject({
      tagName: "script",
      id: UMAMI_SCRIPT_ID,
      async: true,
      src: CONFIG.scriptUrl,
      attributes: {
        "data-website-id": CONFIG.websiteId,
        "data-before-send": UMAMI_BEFORE_SEND_GLOBAL,
        "data-domains": CONFIG.domains,
        "data-exclude-hash": "true",
        "data-do-not-track": "true",
      },
    });
  });

  it("keeps the installed hook silent until consent is latched, and again once it is withdrawn", () => {
    fakePage();
    loadUmami(CONFIG);
    const hook = globalThis.window[UMAMI_BEFORE_SEND_GLOBAL];
    expect(hook("event", pageview())).toBeNull();
    setUmamiConsent(true);
    expect(hook("event", pageview())?.url).toBe(
      `${ORIGIN}/scan?utm_source=newsletter`,
    );
    setUmamiConsent(false);
    expect(hook("event", pageview())).toBeNull();
  });
});

describe("landing Umami config", () => {
  it("is silently off when unset outside production", () => {
    expect(landingUmamiConfig({}, "development")).toBeNull();
    expect(landingUmamiConfig({}, "test")).toBeNull();
  });

  it("uses committed public defaults in production so Git builds cannot silently disable it", () => {
    expect(landingUmamiConfig({}, "production")).toEqual(BESEAM_PRODUCTION_UMAMI_CONFIG);
  });

  it("lets build-time values override production defaults", () => {
    expect(
      landingUmamiConfig(
        { websiteId: "override-site", domains: "preview.beseam.com" },
        "production",
      ),
    ).toEqual({
      ...BESEAM_PRODUCTION_UMAMI_CONFIG,
      websiteId: "override-site",
      domains: "preview.beseam.com",
    });
  });

  it("is silently off when raw config is unset", () => {
    const errors = spyOn(console, "error").mockImplementation(() => {});
    expect(umamiConfig({})).toBeNull();
    expect(errors).not.toHaveBeenCalled();
    errors.mockRestore();
  });

  it("accepts a complete HTTPS configuration", () => {
    expect(umamiConfig(CONFIG)).toEqual(CONFIG);
  });

  it("refuses partial or plain-HTTP settings loudly", () => {
    const errors = spyOn(console, "error").mockImplementation(() => {});
    expect(umamiConfig({ ...CONFIG, domains: "" })).toBeNull();
    expect(
      umamiConfig({ ...CONFIG, scriptUrl: "http://a.beseam.com/script.js" }),
    ).toBeNull();
    expect(errors).toHaveBeenCalledTimes(2);
    errors.mockRestore();
  });

  it("refuses a plain-HTTP loopback script URL like any other plain-HTTP one", () => {
    const errors = spyOn(console, "error").mockImplementation(() => {});
    expect(
      umamiConfig({ ...CONFIG, scriptUrl: "http://localhost:3000/script.js" }),
    ).toBeNull();
    expect(
      umamiConfig({ ...CONFIG, scriptUrl: "http://127.0.0.1:3000/script.js" }),
    ).toBeNull();
    expect(errors).toHaveBeenCalledTimes(2);
    expect(errors).toHaveBeenCalledWith(
      "[umami] incomplete or unsafe Umami settings; Umami stays off",
    );
    errors.mockRestore();
  });

  it("refuses a missing website id or script URL loudly", () => {
    const errors = spyOn(console, "error").mockImplementation(() => {});
    expect(umamiConfig({ ...CONFIG, websiteId: "" })).toBeNull();
    expect(umamiConfig({ ...CONFIG, scriptUrl: "" })).toBeNull();
    expect(errors).toHaveBeenCalledTimes(2);
    errors.mockRestore();
  });
});
