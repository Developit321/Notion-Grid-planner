import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { decrypt } from "@/lib/encryption";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

// POST /api/widgets/[id]/pin - Pin/unpin a post for a widget
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
    const { pageId, pinned } = body as { pageId: string; pinned: boolean };

    if (!pageId || typeof pinned !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body: pageId and pinned (boolean) required" },
        { status: 400 }
      );
    }

    // Decrypt the Notion token
    const notionToken = decrypt(widget.notionToken);
    const notion = new Client({ auth: notionToken });

    // Get current posts to determine placement assignment
    // Try to sort by Date, fallback to no sorting if Date doesn't exist
    let response: QueryDatabaseResponse;
    try {
      response = await notion.databases.query({
        database_id: widget.databaseId,
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      });
    } catch (dateError: any) {
      // If Date property doesn't exist, query without sorting
      if (dateError?.code === 'validation_error' && dateError?.body?.includes('Date')) {
        response = await notion.databases.query({
          database_id: widget.databaseId,
        });
      } else {
        throw dateError;
      }
    }

    // Find currently pinned posts (have "Pinned Placement" with value 1, 2, or 3)
    const currentPosts = response.results
      .filter((page): page is any => "properties" in page)
      .map((page) => {
        const pinnedPlacementProp = page.properties["Pinned Placement"];
        let pinnedPlacement: string[] = [];
        if (pinnedPlacementProp?.type === "multi_select") {
          pinnedPlacement = pinnedPlacementProp.multi_select.map((option: any) => option.name);
        }
        return { id: page.id, pinnedPlacement };
      });

    const pinnedPosts = currentPosts.filter((p) => 
      p.pinnedPlacement.some((val) => ["1", "2", "3"].includes(val))
    );
    
    if (pinned) {
      // Pinning: assign "Pinned Placement" value 1, 2, or 3 based on available slots
      // Maximum 3 posts can be pinned (one for each position)
      
      // Count pinned posts excluding the current post (in case it's already pinned)
      const otherPinnedPosts = pinnedPosts.filter((p) => p.id !== pageId);
      
      // If there are already 3 OTHER pinned posts (excluding current), don't allow pinning a 4th
      if (otherPinnedPosts.length >= 3) {
        // Trying to pin a 4th post - return error
        return NextResponse.json(
          { error: "Maximum 3 posts can be pinned. Please unpin a post first." },
          { status: 400 }
        );
      }
      
      // Find the lowest available placement (1, 2, or 3)
      const existingPlacements = pinnedPosts
        .filter((p) => p.id !== pageId)
        .flatMap((p) => p.pinnedPlacement)
        .filter((val) => ["1", "2", "3"].includes(val))
        .map((val) => parseInt(val, 10));
      
      let newPlacement = 1;
      for (let i = 1; i <= 3; i++) {
        if (!existingPlacements.includes(i)) {
          newPlacement = i;
          break;
        }
      }
      
      // Update Pinned Placement multi-select
      await notion.pages.update({
        page_id: pageId,
        properties: {
          "Pinned Placement": {
            multi_select: [
              {
                name: newPlacement.toString(),
              },
            ],
          },
        },
      });
    } else {
      // Unpinning: clear Pinned Placement by setting it to empty array
      try {
        await notion.pages.update({
          page_id: pageId,
          properties: {
            "Pinned Placement": {
              multi_select: [],
            },
          },
        });
      } catch (error: any) {
        // If Pinned Placement property doesn't exist, that's fine - post is already unpinned
        if (error?.code === 'validation_error' && error?.body?.includes('Pinned Placement')) {
          // Property doesn't exist, which means post is already unpinned - that's fine
          console.log("Pinned Placement property doesn't exist, post is already unpinned");
        } else {
          throw error;
        }
      }
    }

    return NextResponse.json({ success: true, pinned });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to update pin state" },
      { status: 500 }
    );
  }
}
