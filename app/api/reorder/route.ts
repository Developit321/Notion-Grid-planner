import { NextRequest, NextResponse } from "next/server";
import { reorderPosts } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { posts } = body as { posts: { id: string; order: number }[] };

    if (!posts || !Array.isArray(posts)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    await reorderPosts(posts);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to reorder posts" },
      { status: 500 }
    );
  }
}
