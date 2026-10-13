import type { ReactNode } from "react";

import { LOCALES } from "@/i18n/locale-rules.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== "en").map((locale) => ({
    locale,
  }));
}

/**
 * `output: "export"` renders one shared root layout for every route, so Next
 * initially emits `lang="en"` here. The inline script keeps dev/client renders
 * correct, while `scripts/fix-export-locales.mjs` rewrites the exported
 * localized HTML files to their own `lang` for crawlers before deployment.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      {children}
    </>
  );
}
