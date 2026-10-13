import type { ReactNode } from "react";

import type { Metadata } from "next";

/**
 * The Fieldbook under /resources predates Beseam's focus on AI search for
 * webshops, so it stays online for existing links but is kept out of search
 * results. No page below sets its own `robots`, so this applies to all of
 * them; it is also left out of the sitemap.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return children;
}
