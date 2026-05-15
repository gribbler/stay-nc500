import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  posts,
  getPost,
  categoryLabels,
  categoryColours,
  formatPostDate,
} from "@/content/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Stay NC500`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: PostContent } = await import(`@/content/posts/${slug}.mdx`);

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const sortedIndex = sorted.findIndex((p) => p.slug === slug);
  const prevPost = sortedIndex < sorted.length - 1 ? sorted[sortedIndex + 1] : null;
  const nextPost = sortedIndex > 0 ? sorted[sortedIndex - 1] : null;
  void postIndex;

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

          {/* Category badge */}
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
            <span>{formatPostDate(post.date)}</span>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <article>
          <PostContent />
        </article>

        {/* Divider */}
        <div className="mt-16 border-t border-dim pt-10">

          {/* Booking CTA */}
          <div
            className="p-8 border border-dim text-center mb-10"
            style={{
              background: "linear-gradient(135deg, #1a1530 0%, #131720 100%)",
            }}
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
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex items-start gap-4 bg-surface hover:bg-elevated p-6 transition-colors h-full"
                >
                  <span className="text-mist group-hover:text-gold text-lg transition-colors mt-0.5">&larr;</span>
                  <div>
                    <p className="text-mist text-xs uppercase tracking-widest mb-1">Older</p>
                    <p className="text-cream group-hover:text-gold-light transition-colors text-sm leading-snug">
                      {prevPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="bg-surface p-6 h-full" />
              )}
            </div>
            <div>
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex items-start justify-end gap-4 bg-surface hover:bg-elevated p-6 transition-colors h-full text-right"
                >
                  <div>
                    <p className="text-mist text-xs uppercase tracking-widest mb-1">Newer</p>
                    <p className="text-cream group-hover:text-gold-light transition-colors text-sm leading-snug">
                      {nextPost.title}
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
