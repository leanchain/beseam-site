import type { ReactNode } from "react";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "de" }];
}

/**
 * `output: "export"` renders one shared root layout for every route, so Next
 * initially emits `lang="en"` here. The inline script keeps dev/client renders
 * correct, while `scripts/fix-export-locales.mjs` rewrites the two exported
 * German HTML files to `lang="de"` for crawlers before deployment.
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
