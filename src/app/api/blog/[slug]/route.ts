import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/lib/contentful";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
  ]);

  if (!post) {
    return NextResponse.json({ post: null }, { status: 404 });
  }

  const idx = allPosts.findIndex((p) => p.slug === slug);
  const next = idx > 0 ? allPosts[idx - 1] : null;          // newer
  const prev = idx < allPosts.length - 1 ? allPosts[idx + 1] : null; // older

  return NextResponse.json({ post, prev, next });
}
