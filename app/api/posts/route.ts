import { NextResponse } from "next/server";
import { getPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts from Notion" },
      { status: 500 }
    );
  }
}
