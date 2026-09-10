import type { AnswerCheckResult, Finding } from "./answer-check-types";

export type HomepageAuditCardState =
  "gated" | "reading" | "failed" | "complete";

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
    "category_page_audit",
    "content_page_audit",
  ]).has(finding.source ?? "catalog");
}

export function deriveSampledAuditGroups(result: AnswerCheckResult) {
  const pageTypes =
    result.site_inventory?.entity_page_types ??
    result.site_inventory?.page_types ??
    {};
  const collectionCandidates = Math.min(
    result.page_audit_plan?.category ?? pageTypes.collection ?? 0,
    2,
  );
  const contentCandidates = Math.min(
    result.page_audit_plan?.content ??
      (pageTypes.article ?? 0) + (pageTypes.blog ?? 0) + (pageTypes.page ?? 0),
    2,
  );
  const collectionAudits = result.category_page_audits ?? [];
  const contentAudits = result.content_page_audits ?? [];

  return {
    collectionCandidates,
    contentCandidates,
    showCollections: collectionCandidates > 0 || collectionAudits.length > 0,
    showContent: contentCandidates > 0 || contentAudits.length > 0,
  } as const;
}
