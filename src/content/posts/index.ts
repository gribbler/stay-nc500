export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "travel-tips" | "destination" | "itinerary" | "seasonal";
  readingTime: string;
}

export const posts: Post[] = [
  {
    slug: "nc500-tips-before-you-go",
    title: "10 Things to Know Before Driving the NC500",
    excerpt:
      "Fuel stops 40 miles apart, midges that can ruin a sunset, and single-track roads that demand patience. Everything we wish someone had told us before we set off.",
    date: "2026-05-10",
    category: "travel-tips",
    readingTime: "6 min read",
  },
  {
    slug: "applecross-peninsula-guide",
    title: "The Applecross Peninsula: Scotland's Most Dramatic Drive",
    excerpt:
      "The Bealach na Bà is the highest mountain pass in the UK. Here's everything you need to know before you cross it — and what to do on the other side.",
    date: "2026-05-01",
    category: "destination",
    readingTime: "7 min read",
  },
  {
    slug: "nc500-in-autumn",
    title: "The NC500 in Autumn: Why September Is the Best Month to Go",
    excerpt:
      "Fewer caravans, golden light on the hills, red deer rutting in the glens, and accommodation that's still open. Autumn is the NC500's best-kept secret.",
    date: "2026-04-20",
    category: "seasonal",
    readingTime: "5 min read",
  },
  {
    slug: "five-days-nc500-first-timer",
    title: "Five Days on the NC500: A First-Timer's Drive",
    excerpt:
      "I had five days, a hire car, and no idea what to expect. Here's the honest account of my first NC500 circuit — the highlights, the mistakes, and the moment I nearly ran out of fuel near Tongue.",
    date: "2026-04-08",
    category: "itinerary",
    readingTime: "9 min read",
  },
];

export const categoryLabels: Record<Post["category"], string> = {
  "travel-tips": "Travel Tips",
  destination: "Destination Guide",
  itinerary: "Itinerary",
  seasonal: "Seasonal",
};

export const categoryColours: Record<Post["category"], { dot: string; label: string; active: string }> = {
  "travel-tips": { dot: "bg-blue-400",    label: "text-blue-300 border-blue-800",    active: "bg-blue-900 text-blue-200 border-blue-600" },
  destination:   { dot: "bg-heather",     label: "text-heather-light border-heather-dim", active: "bg-heather-dim text-heather-light border-heather" },
  itinerary:     { dot: "bg-gold",        label: "text-gold border-gold-dim",        active: "bg-gold-dim text-gold border-gold" },
  seasonal:      { dot: "bg-emerald-400", label: "text-emerald-300 border-emerald-800", active: "bg-emerald-900 text-emerald-200 border-emerald-600" },
};

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
