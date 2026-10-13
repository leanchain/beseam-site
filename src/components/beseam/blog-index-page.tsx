import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import FirstMonthPromise from "@/components/beseam/first-month-promise";
import Halftone from "@/components/beseam/halftone";
import { Reveal } from "@/components/beseam/reveal";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import { formatPostDate, getBlogPosts } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/seo";

export default function BlogIndexPage({ locale = "en" }: { locale?: Locale }) {
  const copy = getPageCopy(locale);
  const t = copy.blog;
  const link = (href: string) => localizedPath(href, locale);
  const posts = getBlogPosts(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}${link("/blog")}#blog`,
    url: `${SITE_URL}${link("/blog")}`,
    name: t.jsonLdName,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}${link(`/blog/${post.slug}`)}`,
      datePublished: post.published,
    })),
  };

  return (
    <div className="bg-ground text-[#151515]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="relative isolate overflow-hidden bg-[#fff9e8]">
        <Halftone corner="top-right" size={220} className="hidden xl:block" />
        <div className="relative z-10 mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <nav
            aria-label={copy.common.breadcrumb}
            className="text-[13px] font-medium text-black/55"
          >
            <Link
              href={link("/")}
              className="text-ink-deep underline-offset-4 hover:underline"
            >
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>{t.breadcrumb}</span>
          </nav>
          <Reveal className="mt-8">
            <h1 className="max-w-[18ch] text-balance font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
              {t.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
              {t.intro}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={link(`/blog/${post.slug}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-media border border-black/10 bg-white transition-colors hover:border-black/30"
                >
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    width={1200}
                    height={630}
                    className="aspect-[1200/630] w-full border-b border-black/10 object-cover"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[13px] font-medium text-black/50">
                      {formatPostDate(post.published, copy.common.dateLocale)} ·{" "}
                      {t.minRead(post.readingMinutes)}
                    </p>
                    <h2 className="mt-3 text-balance font-display text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink-deep">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-black/64">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-deep group-hover:underline group-hover:underline-offset-4">
                      {t.readGuide}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FirstMonthPromise locale={locale} />
    </div>
  );
}
