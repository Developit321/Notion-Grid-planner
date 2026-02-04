import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { decrypt } from "@/lib/encryption";
import { Client } from "@notionhq/client";

// POST /api/widgets/[id]/reorder - Reorder posts for a widget
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();

    // Find widget by widgetId
    const widget = await db.collection("widgets").findOne({
      widgetId: params.id,
    });

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    const body = await request.json();
    const { posts } = body as { posts: { id: string; order: number }[] };

    if (!posts || !Array.isArray(posts)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Decrypt the Notion token
    const notionToken = decrypt(widget.notionToken);
    const notion = new Client({ auth: notionToken });

    // When reordering, update dates to reflect the new order
    // Date is now the primary field for sorting - no need for Order field
    // Position 0 (first) gets today's date, position 1 gets yesterday, etc.
    const now = new Date();
    const updates = posts.map((post, index) => {
      const date = new Date(now);
      // Subtract days based on position (first = today, second = yesterday, etc.)
      date.setDate(date.getDate() - index);
      const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      return Promise.allSettled([
        // Update date (primary field)
        notion.pages.update({
          page_id: post.id,
          properties: {
            Date: {
              date: {
                start: dateString,
              },
            },
          },
        }).catch((error: any) => {
          // Silently fail if Date property doesn't exist yet
          if (error?.code === 'validation_error' && error?.body?.includes('Date')) {
            return; // Ignore
          }
          throw error;
        }),
        // Optionally update order for backward compatibility (fail silently)
        notion.pages.update({
          page_id: post.id,
          properties: {
            Order: {
              number: post.order,
            },
          },
        }).catch(() => {}), // Optional, fail silently
      ]);
    });
    
    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to reorder posts" },
      { status: 500 }
    );
  }
}
