import { createClient } from "contentful";

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type PostCategory = "travel-tips" | "destination" | "itinerary" | "seasonal";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: PostCategory;
  publishedDate: string;
  readingTime: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEntry(entry: any): BlogPost {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    slug: f.slug,
    title: f.title,
    excerpt: f.excerpt,
    body: f.body,
    category: f.category,
    publishedDate: f.publishedDate,
    readingTime: f.readingTime ?? "",
  };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------
export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await client.getEntries({
    content_type: "blogPost",
    order: ["-fields.publishedDate"],
    limit: 100,
  });
  return res.items.map(mapEntry);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });
  if (res.items.length === 0) return null;
  return mapEntry(res.items[0]);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export const categoryLabels: Record<PostCategory, string> = {
  "travel-tips": "Travel Tips",
  destination: "Destination Guide",
  itinerary: "Itinerary",
  seasonal: "Seasonal",
};

export const categoryColours: Record<PostCategory, { dot: string; label: string; active: string }> = {
  "travel-tips": { dot: "bg-blue-400",    label: "text-blue-300 border-blue-800",       active: "bg-blue-900 text-blue-200 border-blue-600" },
  destination:   { dot: "bg-heather",     label: "text-heather-light border-heather-dim", active: "bg-heather-dim text-heather-light border-heather" },
  itinerary:     { dot: "bg-gold",        label: "text-gold border-gold-dim",            active: "bg-gold-dim text-gold border-gold" },
  seasonal:      { dot: "bg-emerald-400", label: "text-emerald-300 border-emerald-800",  active: "bg-emerald-900 text-emerald-200 border-emerald-600" },
};

export function formatPostDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function estimateReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}
