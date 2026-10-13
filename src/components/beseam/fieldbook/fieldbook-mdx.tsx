import type { ComponentPropsWithoutRef, ReactNode } from "react";

import Link from "next/link";

import { ExternalLink, Link2 } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";

import { slugifyHeading } from "@/lib/fieldbook-content";
import { cn } from "@/lib/utils";

export async function FieldbookMdx({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components: {
      h2: MdxH2,
      h3: MdxH3,
      p: MdxParagraph,
      a: MdxLink,
      ul: MdxUnorderedList,
      ol: MdxOrderedList,
      li: MdxListItem,
      blockquote: MdxBlockquote,
      pre: MdxPre,
      code: MdxCode,
      hr: MdxRule,
      Callout,
    },
    options: { parseFrontmatter: false },
  });

  return <div className="fieldbook-prose">{content}</div>;
}

export function Callout({
  type = "evidence",
  title,
  children,
}: {
  type?: "evidence" | "boundary" | "warning" | "operator" | "experimental";
  title: string;
  children: ReactNode;
}) {
  const labels = {
    evidence: "Evidence",
    boundary: "Boundary",
    warning: "Warning",
    operator: "Operator check",
    experimental: "Working note",
  } as const;
  return (
    <aside
      className={cn(
        "my-8 border-l-2 bg-[var(--beseam-panel)] px-5 py-5",
        type === "warning"
          ? "border-[#c74a2a]"
          : type === "experimental"
            ? "border-[#8b5cf6]"
            : "border-[var(--beseam-accent)]",
      )}
    >
      <p className="!m-0 font-display text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--beseam-accent)]">
        {labels[type]}
      </p>
      <p className="!mb-0 !mt-2 text-[14px] font-semibold text-[var(--beseam-ink)]">
        {title}
      </p>
      <div className="mt-2 text-[13px] leading-relaxed text-black/60 [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

function headingText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number")
    return String(children);
  if (Array.isArray(children)) return children.map(headingText).join("");
  if (children && typeof children === "object" && "props" in children)
    return headingText(
      (children as { props?: { children?: ReactNode } }).props?.children,
    );
  return "section";
}

function MdxH2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  const id = slugifyHeading(headingText(children));
  return (
    <h2
      id={id}
      {...props}
      className="group scroll-mt-36 border-t border-black/18 pt-9 font-serif text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08] tracking-[-0.035em] text-[var(--beseam-ink)]"
    >
      <a
        href={`#${id}`}
        className="inline-flex items-start gap-2 text-inherit no-underline"
      >
        <span>{children}</span>
        <Link2 className="mt-2 h-4 w-4 shrink-0 text-[var(--beseam-accent)] opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </h2>
  );
}

function MdxH3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const id = slugifyHeading(headingText(children));
  return (
    <h3
      id={id}
      {...props}
      className="group scroll-mt-36 text-[20px] font-semibold leading-snug text-[var(--beseam-ink)]"
    >
      <a
        href={`#${id}`}
        className="inline-flex items-start gap-2 text-inherit no-underline"
      >
        <span>{children}</span>
        <Link2 className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--beseam-accent)] opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </h3>
  );
}

function MdxParagraph(props: ComponentPropsWithoutRef<"p">) {
  return <p {...props} className="text-[15px] leading-[1.78] text-black/64" />;
}

function MdxLink({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const external = href.startsWith("http");
  if (!external && href.startsWith("/"))
    return (
      <Link
        href={href}
        className="font-semibold text-[var(--beseam-accent)] underline decoration-[var(--beseam-accent)]/25 underline-offset-4 hover:decoration-[var(--beseam-accent)]"
      >
        {children}
      </Link>
    );
  return (
    <a
      href={href}
      {...props}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-1 font-semibold text-[var(--beseam-accent)] underline decoration-[var(--beseam-accent)]/25 underline-offset-4 hover:decoration-[var(--beseam-accent)]"
    >
      {children}
      {external && <ExternalLink className="h-3 w-3" />}
    </a>
  );
}

function MdxUnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      {...props}
      className="space-y-2 border-l border-black/16 pl-5 text-[14px] leading-relaxed text-black/62 marker:text-[var(--beseam-accent)]"
    />
  );
}

function MdxOrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      {...props}
      className="space-y-3 border-l border-black/16 pl-7 text-[14px] leading-relaxed text-black/62 marker:font-mono marker:text-[11px] marker:text-[var(--beseam-accent)]"
    />
  );
}

function MdxListItem(props: ComponentPropsWithoutRef<"li">) {
  return <li {...props} className="pl-1" />;
}

function MdxBlockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      {...props}
      className="border-l-2 border-[var(--beseam-accent)] pl-5 font-serif text-[22px] leading-relaxed text-black/68"
    />
  );
}

function MdxPre(props: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      {...props}
      className="overflow-x-auto border border-white/12 bg-[var(--beseam-technical)] p-5 text-[12px] leading-relaxed text-white/78"
    />
  );
}

function MdxCode({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  const block = Boolean(className);
  return (
    <code
      {...props}
      className={
        block
          ? className
          : "border border-black/12 bg-[var(--beseam-panel)] px-1.5 py-0.5 font-mono text-[0.86em] text-[var(--beseam-ink)]"
      }
    />
  );
}

function MdxRule(props: ComponentPropsWithoutRef<"hr">) {
  return <hr {...props} className="border-0 border-t border-black/18" />;
}
