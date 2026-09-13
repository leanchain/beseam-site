import { Figtree, Lora } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
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

// Established display face for marketing headings and serif accents.
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-lora",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Beseam | Find why your products are being overlooked",
    template: "%s | Beseam",
  },
  description:
    "Beseam finds why important ecommerce products are being overlooked, helps fix the problems worth acting on first, and verifies what changed.",
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
    title: "Beseam | Find why your products are being overlooked",
    description:
      "Beseam finds why important ecommerce products are being overlooked, helps fix the problems worth acting on first, and verifies what changed.",
    url: "/",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: HOME_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Beseam showing where shoppers find, choose, and buy products",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam | Find why your products are being overlooked",
    description:
      "Beseam finds why important ecommerce products are being overlooked, helps fix the problems worth acting on first, and verifies what changed.",
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
          "Beseam finds why important ecommerce products are being overlooked, helps merchants fix the highest-value problems, and verifies what changed afterward.",
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
      <body className={`${figtree.variable} ${lora.variable} antialiased`}>
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
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
