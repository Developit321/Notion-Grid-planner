import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { decrypt } from "@/lib/encryption";
import { Client } from "@notionhq/client";
import { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

// Disable caching for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Platform = "instagram" | "tiktok";

interface NotionPost {
  id: string;
  name: string;
  images: string[];
  status: string;
  statusColor?: string;
  caption: string;
  order: number;
  pinned: boolean;
  platform: Platform;
  source?: string;
  date?: string; // ISO date string for chronological sorting
  pinnedPlacement?: number; // Pinned placement value: 1, 2, or 3 (from "Pinned Placement" multi-select)
}

function getPropertyValue(
  page: PageObjectResponse,
  propertyName: string
): string | number | boolean | string[] | null {
  const property = page.properties[propertyName];
  if (!property) return null;

  switch (property.type) {
    case "title":
      return property.title.map((t) => t.plain_text).join("") || "";
    case "rich_text":
      return property.rich_text.map((t) => t.plain_text).join("") || "";
    case "select":
      return property.select?.name || "";
    case "multi_select":
      // Return array of selected option names
      return property.multi_select.map((option) => option.name);
    case "status":
      return property.status?.name || "";
    case "number":
      return property.number ?? 0;
    case "checkbox":
      return property.checkbox ?? false;
    case "date":
      // Return ISO date string, or null if no date set
      return property.date?.start || null;
    case "files":
      const urls: string[] = [];
      for (const file of property.files) {
        if (file.type === "file") {
          urls.push(file.file.url);
        } else if (file.type === "external") {
          urls.push(file.external.url);
        }
      }
      return urls;
    case "url":
      return property.url || "";
    default:
      return null;
  }
}

// GET /api/widgets/[id]/posts - Fetch posts for a widget
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();

    // Find widget by widgetId (the short ID used in embed URLs)
    const widget = await db.collection("widgets").findOne({
      widgetId: params.id,
    });

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    // Decrypt the Notion token
    const notionToken = decrypt(widget.notionToken);
    const notion = new Client({ auth: notionToken });

    // Query the Notion database
    // Sort by Date (most recent first) - Date field handles both chronological order and manual reordering
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
      // If Date property doesn't exist, fall back to Order sorting
      if (dateError?.code === 'validation_error' && dateError?.body?.includes('Date')) {
        response = await notion.databases.query({
          database_id: widget.databaseId,
          sorts: [
            {
              property: "Order",
              direction: "ascending",
            },
          ],
        });
      } else {
        throw dateError;
      }
    }

    const posts: NotionPost[] = response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page, index) => {
        const name = getPropertyValue(page, "Name") as string;
        const images = (getPropertyValue(page, "Files") as string[]) || [];
        const propertyKeys = Object.keys(page.properties);
        
        // Read Status directly from property (case-insensitive)
        // Notion uses type "status" (not "select") with property.status.name and property.status.color
        let status = "";
        let statusColor = "";
        const statusKey = propertyKeys.find(
          (key) => key.toLowerCase() === "status"
        );
        
        if (statusKey) {
          const statusProperty = page.properties[statusKey];
          if (statusProperty?.type === "status") {
            // Status type: value is at property.status.name and color at property.status.color
            status = statusProperty.status?.name || "";
            statusColor = statusProperty.status?.color || "";
          } else if (statusProperty?.type === "select") {
            // Fallback for select type
            status = statusProperty.select?.name || "";
          } else {
            status = (getPropertyValue(page, statusKey) as string) || "";
          }
        } else {
          status = (getPropertyValue(page, "Status") as string) || "";
        }
        
        const caption = getPropertyValue(page, "Caption") as string;
        const order = (getPropertyValue(page, "Order") as number) || null; // Optional, only for unpinned posts
        const date = getPropertyValue(page, "Date") as string | null;
        const pinnedPlacement = (getPropertyValue(page, "Pinned Placement") as string[]) || [];
        
        // Check if post has a pinned placement (1, 2, or 3)
        const pinnedPlacementValue = pinnedPlacement.find((val) => ["1", "2", "3"].includes(val));
        const isPinned = !!pinnedPlacementValue;
        const pinnedOrder = pinnedPlacementValue ? parseInt(pinnedPlacementValue, 10) : null;
        
        // Find platform property by checking all property keys (case-insensitive)
        let platformRaw = "";
        
        // Try exact match first (case-insensitive)
        let platformKey = propertyKeys.find(
          (key) => key.toLowerCase() === "platform"
        );
        
        // If not found, try capitalized "Platform"
        if (!platformKey) {
          platformKey = propertyKeys.find(
            (key) => key === "Platform"
          );
        }
        
        // If still not found, try partial match
        if (!platformKey) {
          platformKey = propertyKeys.find(
            (key) => key.toLowerCase().includes("platform")
          );
        }
        
        if (platformKey) {
          const platformProperty = page.properties[platformKey];
          // Handle select type directly
          if (platformProperty.type === "select") {
            platformRaw = platformProperty.select?.name || "";
          } else {
            platformRaw = (getPropertyValue(page, platformKey) as string) || "";
          }
        }
        
        const platformLower = platformRaw.trim().toLowerCase();
        const platform: Platform = platformLower.includes("tiktok") ? "tiktok" : "instagram";
        
        // Find source property (case-insensitive) - can be URL or text type
        let source = "";
        let sourceKey: string | undefined = propertyKeys.find(
          (key) => key === "Source"
        );
        
        // If not found, try lowercase
        if (!sourceKey) {
          sourceKey = propertyKeys.find(
            (key) => key.toLowerCase() === "source"
          );
        }
        
        if (sourceKey) {
          const sourceProperty = page.properties[sourceKey];
          if (sourceProperty) {
            // Handle URL type directly
            if (sourceProperty.type === "url") {
              source = sourceProperty.url || "";
            } else {
              // Handle text/rich_text types
              const sourceValue = getPropertyValue(page, sourceKey);
              if (sourceValue && typeof sourceValue === "string") {
                source = sourceValue.trim();
              }
            }
          }
        }

        return {
          id: page.id,
          name: name || "Untitled",
          images,
          status: status || "planned",
          statusColor: statusColor || undefined,
          caption: caption || "",
          order: order || index + 1, // Fallback to index if Order not set
          pinned: isPinned,
          platform,
          source: source && source.trim() ? source.trim() : undefined,
          date: date || undefined,
          pinnedPlacement: pinnedOrder || undefined,
        };
      });

    // Validate pinned posts: only allow maximum 3 pinned posts with unique placements (1, 2, 3)
    // If more than 3 posts have Pinned Placement values, or if there are duplicates, fix them
    const pinnedPostsList = posts.filter((p) => p.pinnedPlacement !== undefined && p.pinnedPlacement >= 1 && p.pinnedPlacement <= 3);
    
    // Check for duplicates - each placement (1, 2, 3) should only be used once
    const placementCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    pinnedPostsList.forEach((p) => {
      if (p.pinnedPlacement) {
        placementCounts[p.pinnedPlacement] = (placementCounts[p.pinnedPlacement] || 0) + 1;
      }
    });
    
    // If there are more than 3 pinned posts OR duplicates, fix it
    if (pinnedPostsList.length > 3 || Object.values(placementCounts).some((count) => count > 1)) {
      console.warn(`Warning: Invalid Pinned Placement configuration detected. Fixing...`);
      
      // Sort by Pinned Placement, then by date to determine priority
      pinnedPostsList.sort((a, b) => {
        const placementDiff = (a.pinnedPlacement || 999) - (b.pinnedPlacement || 999);
        if (placementDiff !== 0) return placementDiff;
        // If same placement, prefer more recent date
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });
      
      // Keep only the first post for each placement (1, 2, 3)
      const keptPlacements = new Set<number>();
      const postsToUnpin: typeof pinnedPostsList = [];
      
      for (const post of pinnedPostsList) {
        if (post.pinnedPlacement && !keptPlacements.has(post.pinnedPlacement)) {
          keptPlacements.add(post.pinnedPlacement);
        } else {
          postsToUnpin.push(post);
        }
      }
      
      // Clear Pinned Placement for duplicates and extras
      for (const postToUnpin of postsToUnpin) {
        try {
          await notion.pages.update({
            page_id: postToUnpin.id,
            properties: {
              "Pinned Placement": {
                multi_select: [],
              },
            },
          });
          // Update local post to reflect unpinned state
          const postIndex = posts.findIndex((p) => p.id === postToUnpin.id);
          if (postIndex !== -1) {
            posts[postIndex].pinned = false;
            posts[postIndex].pinnedPlacement = undefined;
          }
        } catch (error) {
          console.warn(`Failed to clear Pinned Placement for post ${postToUnpin.id}:`, error);
        }
      }
    }

    // Sort: pinned posts first by Pinned Placement (1, 2, 3), then unpinned posts by Date
    posts.sort((a, b) => {
      const aPinnedPlacement = a.pinnedPlacement;
      const bPinnedPlacement = b.pinnedPlacement;
      const aIsPinned = a.pinned || (aPinnedPlacement !== undefined && aPinnedPlacement >= 1 && aPinnedPlacement <= 3);
      const bIsPinned = b.pinned || (bPinnedPlacement !== undefined && bPinnedPlacement >= 1 && bPinnedPlacement <= 3);
      
      // Pinned posts come first
      if (aIsPinned && !bIsPinned) return -1;
      if (!aIsPinned && bIsPinned) return 1;
      
      // If both are pinned, sort by Pinned Placement (1, 2, 3)
      if (aIsPinned && bIsPinned) {
        const aPlacement = aPinnedPlacement || 999;
        const bPlacement = bPinnedPlacement || 999;
        return aPlacement - bPlacement;
      }
      
      // If both are unpinned, sort by Date (most recent first)
      if (a.date && b.date) {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; // Descending (most recent first)
      }
      
      // If only one has a date, prioritize it
      if (a.date && !b.date) return -1;
      if (!a.date && b.date) return 1;
      
      // Fallback to order
      return a.order - b.order;
    });

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts from Notion" },
      { status: 500 }
    );
  }
}
