import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  getAllPosts,
  getPostBySlug,
  categoryLabels,
  categoryColours,
  formatPostDate,
} from "@/lib/contentful";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.staync500.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://www.staync500.com/blog/${slug}`,
      publishedTime: post.publishedDate,
      authors: ["Stay NC500"],
      tags: [categoryLabels[post.category], "NC500", "North Coast 500", "Scottish Highlands"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);

  if (!post) notFound();

  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = idx < allPosts.length - 1 ? allPosts[idx + 1] : null; // older
  const next = idx > 0 ? allPosts[idx - 1] : null;                   // newer

  const catStyle = categoryColours[post.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: { "@type": "Organization", name: "Stay NC500", url: "https://www.staync500.com" },
    publisher: { "@type": "Organization", name: "Stay NC500", url: "https://www.staync500.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.staync500.com/blog/${post.slug}` },
  };

  return (
    <main className="min-h-screen bg-highland">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
        <article>
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
              ul: ({ children }) => <ul className="mb-5 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="mb-5 space-y-2">{children}</ol>,
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

        {/* CTA + nav */}
        <div className="mt-16 border-t border-dim pt-10">
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
            <p className="text-mist text-sm mb-6">
              Find and book accommodation at every stop on the route.
            </p>
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

          <div className="grid grid-cols-2 gap-px bg-dim">
            <div>
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex items-start gap-4 bg-surface hover:bg-elevated p-6 transition-colors h-full"
                >
                  <span className="text-mist group-hover:text-gold text-lg transition-colors mt-0.5">
                    &larr;
                  </span>
                  <div>
                    <p className="text-mist text-xs uppercase tracking-widest mb-1">Older</p>
                    <p className="text-cream group-hover:text-gold-light transition-colors text-sm leading-snug">
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="bg-surface p-6 h-full" />
              )}
            </div>
            <div>
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex items-start justify-end gap-4 bg-surface hover:bg-elevated p-6 transition-colors h-full text-right"
                >
                  <div>
                    <p className="text-mist text-xs uppercase tracking-widest mb-1">Newer</p>
                    <p className="text-cream group-hover:text-gold-light transition-colors text-sm leading-snug">
                      {next.title}
                    </p>
                  </div>
                  <span className="text-mist group-hover:text-gold text-lg transition-colors mt-0.5">
                    &rarr;
                  </span>
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
