/**
 * One-time setup script:
 * 1. Creates the "Blog Post" content type in Contentful
 * 2. Publishes the content type
 * 3. Migrates the four existing sample posts
 *
 * Run with: node scripts/setup-contentful.mjs
 */

import { createClient } from "contentful-management";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID ?? "8u50htcddaej";
const ENVIRONMENT_ID = "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!MANAGEMENT_TOKEN) {
  console.error("Set CONTENTFUL_MANAGEMENT_TOKEN env var before running this script.");
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

const ctx = { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID };

// ---------------------------------------------------------------------------
// Posts to migrate
// ---------------------------------------------------------------------------
const posts = [
  {
    slug: "nc500-tips-before-you-go",
    title: "10 Things to Know Before Driving the NC500",
    excerpt:
      "Fuel stops 40 miles apart, midges that can ruin a sunset, and single-track roads that demand patience. Everything we wish someone had told us before we set off.",
    category: "travel-tips",
    readingTime: "6 min read",
    publishedDate: "2026-05-10T09:00:00",
    bodyFile: "nc500-tips-before-you-go.mdx",
  },
  {
    slug: "applecross-peninsula-guide",
    title: "The Applecross Peninsula: Scotland's Most Dramatic Drive",
    excerpt:
      "The Bealach na Bà is the highest mountain pass in the UK. Here's everything you need to know before you cross it — and what to do on the other side.",
    category: "destination",
    readingTime: "7 min read",
    publishedDate: "2026-05-01T09:00:00",
    bodyFile: "applecross-peninsula-guide.mdx",
  },
  {
    slug: "nc500-in-autumn",
    title: "The NC500 in Autumn: Why September Is the Best Month to Go",
    excerpt:
      "Fewer caravans, golden light on the hills, red deer rutting in the glens, and accommodation that's still open. Autumn is the NC500's best-kept secret.",
    category: "seasonal",
    readingTime: "5 min read",
    publishedDate: "2026-04-20T09:00:00",
    bodyFile: "nc500-in-autumn.mdx",
  },
  {
    slug: "five-days-nc500-first-timer",
    title: "Five Days on the NC500: A First-Timer's Drive",
    excerpt:
      "I had five days, a hire car, and no idea what to expect. Here's the honest account of my first NC500 circuit — the highlights, the mistakes, and the moment I nearly ran out of fuel near Tongue.",
    category: "itinerary",
    readingTime: "9 min read",
    publishedDate: "2026-04-08T09:00:00",
    bodyFile: "five-days-nc500-first-timer.mdx",
  },
];

function readPost(filename) {
  const p = resolve(__dirname, "../src/content/posts", filename);
  const raw = readFileSync(p, "utf8");
  return raw.replace(/^(import|export)\s.+$/gm, "").trim();
}

async function main() {
  // ── 1. Content type ──────────────────────────────────────────────────────
  let existing = false;
  try {
    await client.contentType.get({ ...ctx, contentTypeId: "blogPost" });
    existing = true;
    console.log("✓ Content type already exists");
  } catch {
    // will create below
  }

  if (!existing) {
    console.log("Creating content type...");
    await client.contentType.createWithId(
      { ...ctx, contentTypeId: "blogPost" },
      {
        name: "Blog Post",
        displayField: "title",
        fields: [
          { id: "title",         name: "Title",          type: "Symbol",  required: true },
          { id: "slug",          name: "Slug",           type: "Symbol",  required: true },
          { id: "excerpt",       name: "Excerpt",        type: "Text",    required: true },
          { id: "body",          name: "Body",           type: "Text",    required: true },
          { id: "category",      name: "Category",       type: "Symbol",  required: true },
          { id: "publishedDate", name: "Published Date", type: "Date",    required: true },
          { id: "readingTime",   name: "Reading Time",   type: "Symbol",  required: false },
        ],
      }
    );
    await client.contentType.publish(
      { ...ctx, contentTypeId: "blogPost" },
      { sys: { version: 1 } }
    );
    console.log("✓ Content type created and published");
  }

  // ── 2. Migrate posts ─────────────────────────────────────────────────────
  for (const post of posts) {
    let entryExists = false;
    try {
      await client.entry.get({ ...ctx, entryId: post.slug });
      entryExists = true;
    } catch {
      // doesn't exist
    }

    if (entryExists) {
      console.log(`  – skipping "${post.title}" (already exists)`);
      continue;
    }

    const body = readPost(post.bodyFile);

    const entry = await client.entry.createWithId(
      { ...ctx, entryId: post.slug, contentTypeId: "blogPost" },
      {
        fields: {
          title:         { "en-US": post.title },
          slug:          { "en-US": post.slug },
          excerpt:       { "en-US": post.excerpt },
          body:          { "en-US": body },
          category:      { "en-US": post.category },
          publishedDate: { "en-US": post.publishedDate },
          readingTime:   { "en-US": post.readingTime },
        },
      }
    );

    await client.entry.publish(
      { ...ctx, entryId: post.slug },
      { sys: { version: entry.sys.version } }
    );

    console.log(`✓ Published: ${post.title}`);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error(err?.message ?? err);
  process.exit(1);
});
