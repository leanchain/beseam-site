import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRight, ExternalLink } from "lucide-react";

import BlogText from "@/components/beseam/blog-text";
import FaqGrid from "@/components/beseam/faq-grid";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import { Reveal } from "@/components/beseam/reveal";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy } from "@/i18n/pages";
import {
  formatPostDate,
  getBlogPost,
  getBlogPosts,
  type BlogBlock,
} from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/seo";

/**
 * One blog post: answer-first summary, a table of contents, question-shaped
 * sections, FAQ (also as FAQPage data), linked sources and related posts.
 */
export default function BlogPostPage({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: Locale;
}) {
  const post = getBlogPost(slug, locale);
  if (!post) notFound();

  const copy = getPageCopy(locale);
  const t = copy.blog;
  const link = (href: string) => localizedPath(href, locale);
  const date = (value: string) => formatPostDate(value, copy.common.dateLocale);
  const url = `${SITE_URL}${link(`/blog/${post.slug}`)}`;
  const others = getBlogPosts(locale).filter(
    (other) => other.slug !== post.slug,
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.metaDescription,
        url,
        mainEntityOfPage: url,
        image: `${SITE_URL}${post.image.og}`,
        datePublished: post.published,
        dateModified: post.updated,
        inLanguage: locale,
        keywords: post.keywords.join(", "),
        abstract: post.summary,
        author: {
          "@type": "Organization",
          name: t.author,
          "@id": `${SITE_URL}/#organization`,
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
        citation: post.sources.map((source) => source.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beseam",
            item: `${SITE_URL}${link("/")}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t.breadcrumb,
            item: `${SITE_URL}${link("/blog")}`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <article className="bg-ground text-[#151515]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-[#fff9e8]">
        <div className="mx-auto max-w-[56rem] px-5 pb-12 pt-14 sm:px-8 sm:pt-16 lg:pb-14 lg:pt-20">
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
            <Link
              href={link("/blog")}
              className="text-ink-deep underline-offset-4 hover:underline"
            >
              {t.breadcrumb}
            </Link>
          </nav>
          <Reveal>
            <h1 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink-deep">
              {post.title}
            </h1>
            <p className="mt-5 text-[14px] font-medium text-black/55">
              {t.by(t.author)} · {t.updated}{" "}
              <time dateTime={post.updated}>{date(post.updated)}</time> ·{" "}
              {t.minRead(post.readingMinutes)}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={1200}
              height={630}
              priority
              className="mt-8 w-full rounded-media border border-black/10"
            />
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-[56rem] px-5 py-12 sm:px-8 lg:py-16">
        {/* Answer first: the short version for readers and AI assistants. */}
        <aside className="rounded-media border-l-4 border-signal bg-[#fff9e8] p-6 sm:p-7">
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-black/55">
            {t.inShort}
          </p>
          <p className="mt-2 text-[18px] leading-[1.65] text-ink-deep">
            {post.summary}
          </p>
        </aside>

        <nav
          aria-label={t.onThisPage}
          className="mt-8 rounded-media border border-black/10 p-6"
        >
          <p className="text-[15px] font-semibold text-ink-deep">
            {t.onThisPage}
          </p>
          <ol className="mt-3 space-y-2 text-[15px]">
            {post.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-black/68 underline-offset-4 hover:text-ink-deep hover:underline"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-4">
          {post.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="mt-12 text-balance font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink-deep">
                {section.heading}
              </h2>
              {section.blocks.map((block, index) => (
                <Block key={index} block={block} locale={locale} />
              ))}
            </section>
          ))}
        </div>
      </div>

      <FaqGrid
        heading={copy.common.faqHeading}
        items={post.faqs}
        eyebrow={null}
        className="bg-[#fff9e8]"
      />

      <section className="bg-ground">
        <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
          <div>
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em] text-ink-deep">
              {t.sources}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {post.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-[15px] font-medium text-black/68 underline-offset-4 transition-colors hover:text-ink-deep hover:underline"
                  >
                    {source.label}
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.02em] text-ink-deep">
              {t.keepReading}
            </h2>
            <ul className="mt-5 space-y-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={link(`/blog/${other.slug}`)}
                    className="group flex items-center justify-between gap-3 rounded-media border border-black/10 bg-white px-5 py-4 text-[15px] font-semibold text-ink-deep transition-colors hover:border-black/30"
                  >
                    {other.title}
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FirstMonthPromise locale={locale} />
    </article>
  );
}

function Block({ block, locale }: { block: BlogBlock; locale: Locale }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-5 text-[17px] leading-[1.75] text-black/76">
          <BlogText text={block.text} locale={locale} />
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-8 text-[20px] font-semibold tracking-[-0.01em] text-ink-deep">
          {block.text}
        </h3>
      );
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List
          className={`mt-5 space-y-3 pl-6 text-[17px] leading-[1.7] text-black/76 ${
            block.type === "ol"
              ? "list-decimal marker:font-semibold marker:text-ink-deep"
              : "list-disc marker:text-[#a98bf0]"
          }`}
        >
          {block.items.map((item) => (
            <li key={item} className="pl-1.5">
              <BlogText text={item} locale={locale} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className="mt-6 overflow-hidden rounded-media border border-black/10">
          <table className="w-full table-fixed border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-[#fff9e8]">
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="px-4 py-3 font-semibold text-ink-deep"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-black/8">
                  {row.map((cell, index) => (
                    <td
                      key={index}
                      className="px-4 py-3 align-top leading-[1.6] text-black/72"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className="mt-6 rounded-media bg-[#e3d3ff]/60 p-6">
          <p className="text-[16px] font-semibold text-ink-deep">
            {block.title}
          </p>
          <p className="mt-2 text-[16px] leading-[1.7] text-black/76">
            <BlogText text={block.text} locale={locale} />
          </p>
        </div>
      );
  }
}
