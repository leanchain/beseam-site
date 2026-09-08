"use client";

import Script from "next/script";

import { useCookieConsent } from "@/contexts/CookieConsentContext";

/**
 * Every tag here sits behind the same gate: analytics consent accepted and the
 * feature flag on. Hotjar is opt-in per environment -- it renders only when
 * `NEXT_PUBLIC_HOTJAR_ID` holds a numeric site id, so a missing id is an
 * absent script rather than a broken one. It records interactions, so it is
 * named in the privacy policy (section 6) beside Google's tags.
 */
function HotjarScript({ siteId }: { siteId: string }) {
  const bootstrap =
    "(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};" +
    "h._hjSettings={hjid:" +
    siteId +
    ",hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;" +
    "r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);" +
    "})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');";

  return (
    <Script id="hotjar" strategy="afterInteractive">
      {bootstrap}
    </Script>
  );
}

export function AnalyticsScripts() {
  const { status } = useCookieConsent();
  const enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";
  const measurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-GT7632NCQT";
  const tagManagerId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-K5XM33MJ";
  const rawHotjarId = (process.env.NEXT_PUBLIC_HOTJAR_ID ?? "").trim();
  const hotjarId = /^[0-9]+$/.test(rawHotjarId) ? rawHotjarId : "";

  if (!enabled || status !== "accepted") return null;

  if (tagManagerId) {
    const bootstrap =
      "window.dataLayer=window.dataLayer||[];" +
      "window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};" +
      "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
      "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
      "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
      "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
      "})(window,document,'script','dataLayer'," +
      JSON.stringify(tagManagerId) +
      ");";

    return (
      <>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {bootstrap}
        </Script>
        {hotjarId ? <HotjarScript siteId={hotjarId} /> : null}
      </>
    );
  }

  const configure =
    "window.dataLayer=window.dataLayer||[];" +
    "window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};" +
    "window.gtag('js',new Date());window.gtag('config'," +
    JSON.stringify(measurementId) +
    ",{page_path:window.location.pathname});";

  return (
    <>
      <Script
        src={"https://www.googletagmanager.com/gtag/js?id=" + measurementId}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {configure}
      </Script>
      {hotjarId ? <HotjarScript siteId={hotjarId} /> : null}
    </>
  );
}
