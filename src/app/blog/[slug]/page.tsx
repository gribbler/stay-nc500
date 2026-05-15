"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  categoryLabels,
  categoryColours,
  formatPostDate,
  type BlogPost,
} from "@/lib/contentful";

// Individual post page — fetches its data from the /api/blog/[slug] route
// so it works as a fully dynamic edge-rendered page on Cloudflare.

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [post, setPost] = useState<BlogPost | null | "loading">("loading");
  const [adjacent, setAdjacent] = useState<{ prev: BlogPost | null; next: BlogPost | null }>({
    prev: null,
    next: null,
  });
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then(({ post: p, prev, next }) => {
        setPost(p ?? null);
        setAdjacent({ prev: prev ?? null, next: next ?? null });
      })
      .catch(() => setPost(null));
  }, [slug]);

  if (post === "loading") {
    return (
      <main className="min-h-screen bg-highland flex items-center justify-center">
        <div className="text-mist text-sm tracking-widest uppercase animate-pulse">Loading…</div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-highland flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream text-xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Post not found
          </p>
          <Link href="/blog" className="text-gold hover:text-gold-light text-sm transition-colors">
            &larr; Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const catStyle = categoryColours[post.category];

  return (
    <main className="min-h-screen bg-highland">

      {/* Hero */}
      <section className="relative overflow-hidden grain border-b border-dim py-24">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1a1530 0%, #0b0e15 60%, #0e1520 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 15% 55%, rgba(124,107,140,0.2) 0%, transparent 55%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-mist hover:text-gold text-xs tracking-widest uppercase mb-8 inline-block transition-colors"
          >
            &larr; All posts
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${catStyle.dot}`} />
            <span className={`text-xs border px-2 py-0.5 ${catStyle.label}`}>
              {categoryLabels[post.category]}
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl text-cream mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            {post.title}
          </h1>

          <p className="text-cream-dim text-lg leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex items-center gap-4 text-xs text-mist uppercase tracking-wider">
            <span>{formatPostDate(post.publishedDate)}</span>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <article className="blog-body">
          <ReactMarkdown
            components={{
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
                  className="text-cream text-xl mt-8 mb-3"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-cream-dim text-base leading-relaxed mb-5">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="text-cream font-semibold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-heather-light italic">{children}</em>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="mb-5 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-5 space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-3 text-cream-dim text-base leading-relaxed">
                  <span className="text-gold mt-1 flex-shrink-0 text-xs">✦</span>
                  <span>{children}</span>
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-gold pl-6 my-6 text-heather-light italic text-lg leading-relaxed">
                  {children}
                </blockquote>
              ),
              hr: () => (
                <hr className="border-none h-px bg-gradient-to-r from-gold/40 via-dim to-transparent my-10" />
              ),
              code: ({ children }) => (
                <code className="bg-elevated text-heather-light text-sm px-1.5 py-0.5 font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </article>

        {/* Divider */}
        <div className="mt-16 border-t border-dim pt-10">

          {/* Booking CTA */}
          <div
            className="p-8 border border-dim text-center mb-10"
            style={{ background: "linear-gradient(135deg, #1a1530 0%, #131720 100%)" }}
          >
            <p
              className="text-cream text-xl mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Planning your NC500?
            </p>
            <p className="text-mist text-sm mb-6">Find and book accommodation at every stop on the route.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/accommodation"
                className="bg-gold hover:bg-gold-light text-highland text-xs font-semibold px-6 py-3 transition-colors uppercase tracking-widest"
              >
                Find Accommodation
              </Link>
              <Link
                href="/itineraries"
                className="border border-dim hover:border-heather text-cream-dim hover:text-cream text-xs px-6 py-3 transition-colors uppercase tracking-widest"
              >
                View Itineraries
              </Link>
            </div>
          </div>

          {/* Prev / next */}
          <div className="grid grid-cols-2 gap-px bg-dim">
            <div>
              {adjacent.prev ? (
                <Link
                  href={`/blog/${adjacent.prev.slug}`}
                  className="group flex items-start gap-4 bg-surface hover:bg-elevated p-6 transition-colors h-full"
                >
                  <span className="text-mist group-hover:text-gold text-lg transition-colors mt-0.5">&larr;</span>
                  <div>
                    <p className="text-mist text-xs uppercase tracking-widest mb-1">Older</p>
                    <p className="text-cream group-hover:text-gold-light transition-colors text-sm leading-snug">
                      {adjacent.prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="bg-surface p-6 h-full" />
              )}
            </div>
            <div>
              {adjacent.next ? (
                <Link
                  href={`/blog/${adjacent.next.slug}`}
                  className="group flex items-start justify-end gap-4 bg-surface hover:bg-elevated p-6 transition-colors h-full text-right"
                >
                  <div>
                    <p className="text-mist text-xs uppercase tracking-widest mb-1">Newer</p>
                    <p className="text-cream group-hover:text-gold-light transition-colors text-sm leading-snug">
                      {adjacent.next.title}
                    </p>
                  </div>
                  <span className="text-mist group-hover:text-gold text-lg transition-colors mt-0.5">&rarr;</span>
                </Link>
              ) : (
                <div className="bg-surface p-6 h-full" />
              )}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
