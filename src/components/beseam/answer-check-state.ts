import type { AnswerCheckResult, Finding } from "./answer-check-types";

export type HomepageAuditCardState =
  | "gated"
  | "reading"
  | "failed"
  | "complete";

export function deriveDeepAuditCardState(result: AnswerCheckResult) {
  const audits = result.page_audits ?? [];
  const status =
    result.page_audits_status ?? (audits.length ? "complete" : "not_started");
  const inFlight = status === "queued" || status === "running";
  const gated = status === "not_started" && audits.length === 0;
  const homepage = result.homepage_audit;
  const siteKind = result.site_kind ?? "store";

  let homepageState: HomepageAuditCardState;
  if (gated) homepageState = "gated";
  else if (inFlight && !homepage) homepageState = "reading";
  else if (homepage?.ok === false) homepageState = "failed";
  else if (homepage?.ok === true) homepageState = "complete";
  else homepageState = status === "failed" ? "failed" : "reading";

  return {
    siteKind,
    status,
    inFlight,
    gated,
    homepageState,
    showProductPages: siteKind !== "brand_site",
  } as const;
}

export function isCatalogFinding(finding: Finding): boolean {
  return !new Set([
    "page_audit",
    "catalog_sample",
    "homepage_audit",
    "entity_page_audit",
  ]).has(finding.source ?? "catalog");
}
