import type { Metadata } from "next";

import PyorPreviewPage from "@/components/beseam/pyor-preview-page";

/**
 * A reading copy, not a public page: `noindex` keeps it out of search and it
 * is deliberately absent from the nav and the sitemap. It exists so the
 * claim-led register can be read against the production homepage at the same
 * screen size.
 */
export const metadata: Metadata = {
  title: "Preview · claim-led homepage",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PyorPreviewPage />;
}
