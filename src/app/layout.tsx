import { Figtree, Inter_Tight } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { EarlyAccessDialog } from "@/components/beseam/early-access-cta";
import BeseamFooter from "@/components/beseam/footer";
import BeseamNavbar from "@/components/beseam/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { HOME_SOCIAL_IMAGE, SITE_URL } from "@/lib/seo";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "optional",
  preload: true,
});

// Display face for marketing headings.
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Beseam | Make AI a revenue channel for your webshop",
    template: "%s | Beseam",
  },
  description:
    "Beseam is the easiest way to get your products recommended by AI to millions of shoppers. Optimise descriptions, content and technical performance in minutes.",
  authors: [{ name: "Beseam" }],
  creator: "Beseam",
  publisher: "Beseam",
  metadataBase: new URL(SITE_URL),
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Beseam | Make AI a revenue channel for your webshop",
    description:
      "Beseam is the easiest way to get your products recommended by AI to millions of shoppers. Optimise descriptions, content and technical performance in minutes.",
    url: "/",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: HOME_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Beseam: make AI a revenue channel for your webshop",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam | Make AI a revenue channel for your webshop",
    description:
      "Beseam is the easiest way to get your products recommended by AI to millions of shoppers. Optimise descriptions, content and technical performance in minutes.",
    images: [HOME_SOCIAL_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Beseam",
        url: `${SITE_URL}/`,
        description:
          "Beseam makes AI a revenue channel for webshops: it gets products recommended by AI assistants like ChatGPT, Claude and Gemini, and links AI visibility to traffic and revenue.",
        sameAs: ["https://www.linkedin.com/company/beseam/"],
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon/apple-touch-icon.png`,
          width: 180,
          height: 180,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Beseam",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${figtree.variable} ${interTight.variable} antialiased`}
      >
        {/* `Reveal` waits for the viewport before it plays, so without
            scripting its sections would stay at opacity 0 forever. Twenty-odd
            call sites, one fallback. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>.marketing-stage{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <CookieConsentProvider>
            <AnalyticsScripts />
            <div
              data-theme-scope="public"
              className="flex min-h-screen flex-col bg-background"
            >
              <BeseamNavbar />
              <main id="main-content" tabIndex={-1} className="flex-1">
                {children}
              </main>
              <BeseamFooter />
            </div>
            <EarlyAccessDialog />
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
