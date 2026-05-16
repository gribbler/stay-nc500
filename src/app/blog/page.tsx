import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllPosts,
  categoryLabels,
  categoryColours,
  formatPostDate,
  type PostCategory,
} from "@/lib/contentful";

const categoryPhotos: Record<PostCategory, string> = {
  destination:   "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop",
  "travel-tips": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&fit=crop",
  seasonal:      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop",
  itinerary:     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop",
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — NC500 Travel Writing | Stay NC500",
  description:
    "Guides, tips, itinerary stories, and seasonal advice for driving the North Coast 500 in Scotland. Written for first-timers and repeat visitors alike.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen bg-highland">

      {/* Header */}
      <section className="relative overflow-hidden grain border-b border-dim py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&fit=crop')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,14,21,0.88) 0%, rgba(11,14,21,0.72) 60%, rgba(26,21,48,0.68) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="rule-gold" />
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">Journal</p>
          <h1
            className="text-5xl md:text-6xl text-cream mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            NC500 Stories
          </h1>
          <p className="text-cream-dim text-lg max-w-2xl leading-relaxed">
            Guides, travel tips, itinerary write-ups, and seasonal advice for driving Scotland&apos;s
            greatest road.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {posts.length === 0 ? (
          <div className="text-center py-24 text-mist">
            <p className="text-cream text-xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
              No posts yet
            </p>
            <p className="text-sm">Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block bg-surface border border-dim hover:border-heather transition-colors mb-16 overflow-hidden"
              >
                <div className="h-64 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${categoryPhotos[featured.category]}')` }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,14,21,0.90) 0%, rgba(11,14,21,0.40) 60%, transparent 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-heather-light text-xs tracking-[0.2em] uppercase">
                      Featured &mdash; {categoryLabels[featured.category]}
                    </span>
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <h2
                    className="text-cream text-3xl md:text-4xl mb-4 leading-snug group-hover:text-gold-light transition-colors"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-cream-dim leading-relaxed mb-6 max-w-3xl">{featured.excerpt}</p>
                  <div className="flex items-center gap-6 text-xs text-mist uppercase tracking-wider">
                    <span>{formatPostDate(featured.publishedDate)}</span>
                    <span>&middot;</span>
                    <span>{featured.readingTime}</span>
                    <span className="ml-auto text-gold group-hover:text-gold-light transition-colors tracking-[0.15em]">
                      Read more &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of posts */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dim">
                {rest.map((post) => {
                  const style = categoryColours[post.category];
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group bg-surface hover:bg-elevated transition-colors flex flex-col overflow-hidden"
                    >
                      <div className="h-32 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                          style={{ backgroundImage: `url('${categoryPhotos[post.category]}')` }}
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,14,21,0.70) 0%, transparent 100%)" }} />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                          <span className={`text-xs border px-2 py-0.5 ${style.label} backdrop-blur-sm`}>
                            {categoryLabels[post.category]}
                          </span>
                        </div>
                      </div>

                      <div className="p-7 flex-1">
                        <h2
                          className="text-cream text-xl mb-3 leading-snug group-hover:text-gold-light transition-colors"
                          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                        >
                          {post.title}
                        </h2>

                        <p className="text-cream-dim text-sm leading-relaxed line-clamp-3 mb-5">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="px-7 pb-6 border-t border-dim pt-4 flex items-center justify-between gap-4">
                        <span className="text-mist text-xs uppercase tracking-wider">
                          {formatPostDate(post.publishedDate)}
                        </span>
                        <span className="text-mist text-xs">{post.readingTime}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

    </main>
  );
}
