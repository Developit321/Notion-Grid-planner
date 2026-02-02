import { NextRequest, NextResponse } from "next/server";
import { updatePostPinned } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId, pinned } = body as { pageId: string; pinned: boolean };

    if (!pageId || typeof pinned !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body: pageId and pinned (boolean) required" },
        { status: 400 }
      );
    }

    await updatePostPinned(pageId, pinned);

    return NextResponse.json({ success: true, pinned });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to update pin state" },
      { status: 500 }
    );
  }
}
