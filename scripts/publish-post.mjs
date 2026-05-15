#!/usr/bin/env node
/**
 * Publishes a new blog post to Contentful.
 *
 * Usage:
 *   node scripts/publish-post.mjs \
 *     --title "..." \
 *     --slug "..." \
 *     --excerpt "..." \
 *     --category "travel-tips|destination|itinerary|seasonal" \
 *     --reading-time "5 min read" \
 *     --body "...full markdown body..."
 *
 * The --body argument can also be a file path prefixed with @:
 *   --body @/tmp/post-body.md
 */

import { createClient } from "contentful-management";
import { readFileSync } from "fs";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID ?? "8u50htcddaej";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";

if (!MANAGEMENT_TOKEN) {
  console.error("CONTENTFUL_MANAGEMENT_TOKEN env var is required");
  process.exit(1);
}

// Parse args
function getArg(name) {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : null;
}

const title       = getArg("title");
const slug        = getArg("slug");
const excerpt     = getArg("excerpt");
const category    = getArg("category");
const readingTime = getArg("reading-time") ?? "5 min read";
let   body        = getArg("body");

if (!title || !slug || !excerpt || !category || !body) {
  console.error("Missing required arguments: --title --slug --excerpt --category --body");
  process.exit(1);
}

if (body.startsWith("@")) {
  body = readFileSync(body.slice(1), "utf8");
}

const VALID_CATEGORIES = ["travel-tips", "destination", "itinerary", "seasonal"];
if (!VALID_CATEGORIES.includes(category)) {
  console.error(`--category must be one of: ${VALID_CATEGORIES.join(", ")}`);
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });
const ctx = { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID };

async function main() {
  // Check for duplicate slug
  try {
    await client.entry.get({ ...ctx, entryId: slug });
    console.error(`An entry with slug "${slug}" already exists.`);
    process.exit(1);
  } catch {
    // good — doesn't exist yet
  }

  const publishedDate = new Date().toISOString();

  const entry = await client.entry.createWithId(
    { ...ctx, entryId: slug, contentTypeId: "blogPost" },
    {
      fields: {
        title:         { "en-US": title },
        slug:          { "en-US": slug },
        excerpt:       { "en-US": excerpt },
        body:          { "en-US": body },
        category:      { "en-US": category },
        publishedDate: { "en-US": publishedDate },
        readingTime:   { "en-US": readingTime },
      },
    }
  );

  await client.entry.publish(
    { ...ctx, entryId: slug },
    { sys: { version: entry.sys.version } }
  );

  console.log(`✓ Published: ${title}`);
  console.log(`  slug: ${slug}`);
  console.log(`  category: ${category}`);
  console.log(`  date: ${publishedDate}`);
}

main().catch((err) => {
  console.error(err?.message ?? err);
  process.exit(1);
});
