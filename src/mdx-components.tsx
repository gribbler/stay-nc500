import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1
        className="text-cream text-4xl md:text-5xl mt-12 mb-6 leading-tight first:mt-0"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="text-cream text-2xl md:text-3xl mt-10 mb-4 leading-snug"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-cream text-xl mt-8 mb-3 leading-snug"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-cream-dim text-base uppercase tracking-widest mt-6 mb-2 font-semibold">
        {children}
      </h4>
    ),

    // Paragraphs & inline
    p: ({ children }) => (
      <p className="text-cream-dim text-base leading-relaxed mb-5">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="text-cream font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-heather-light not-italic italic">{children}</em>
    ),

    // Links
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href ?? "#"}
          className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
        >
          {children}
        </Link>
      );
    },

    // Lists
    ul: ({ children }) => (
      <ul className="mb-5 space-y-2 pl-0 list-none">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-5 space-y-2 pl-0 list-none counter-reset-item">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3 text-cream-dim text-base leading-relaxed">
        <span className="text-gold mt-1 flex-shrink-0 text-xs">✦</span>
        <span>{children}</span>
      </li>
    ),

    // Block elements
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold pl-6 my-6 text-heather-light italic text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="border-none h-px bg-gradient-to-r from-gold/40 via-dim to-transparent my-10" />
    ),

    // Code
    code: ({ children }) => (
      <code className="bg-elevated text-heather-light text-sm px-1.5 py-0.5 rounded-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-elevated border border-dim p-5 overflow-x-auto text-sm font-mono text-cream-dim mb-5 rounded-sm">
        {children}
      </pre>
    ),

    // Images
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full border border-dim my-8"
        loading="lazy"
      />
    ),

    ...components,
  };
}
