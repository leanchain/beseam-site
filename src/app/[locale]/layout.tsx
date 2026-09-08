import type { ReactNode } from "react";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "de" }];
}

/**
 * `output: "export"` renders one shared root layout for every route, so the
 * exported HTML carries `lang="en"` even here. Setting it from an inline
 * script is the accepted cost of not restructuring 17 English route folders
 * into an `(en)/` group; the reciprocal hreflang pair, `og:locale` and the
 * JSON-LD `inLanguage` are what a crawler reads without executing script.
 */
export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: 'document.documentElement.lang="de";',
        }}
      />
      {children}
    </>
  );
}
