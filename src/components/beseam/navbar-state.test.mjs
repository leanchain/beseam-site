import { describe, expect, it } from "bun:test";

import { shouldShowPrimaryCta } from "./navbar-state.ts";

describe("navbar primary CTA", () => {
  it("never bypasses the scan result handoff with generic registration", () => {
    expect(shouldShowPrimaryCta({ isHome: false, isScanPage: true, pastHero: false })).toBe(false);
    expect(shouldShowPrimaryCta({ isHome: false, isScanPage: true, pastHero: true })).toBe(false);
  });

  it("keeps the homepage CTA quiet until the hero has passed", () => {
    expect(shouldShowPrimaryCta({ isHome: true, isScanPage: false, pastHero: false })).toBe(false);
    expect(shouldShowPrimaryCta({ isHome: true, isScanPage: false, pastHero: true })).toBe(true);
  });

  it("shows the scan CTA on other marketing pages", () => {
    expect(shouldShowPrimaryCta({ isHome: false, isScanPage: false, pastHero: false })).toBe(true);
  });
});
