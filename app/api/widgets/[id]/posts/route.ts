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
    case "status":
      return property.status?.name || "";
    case "number":
      return property.number ?? 0;
    case "checkbox":
      return property.checkbox ?? false;
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
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: widget.databaseId,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    const posts: NotionPost[] = response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page, index) => {
        const name = getPropertyValue(page, "Name") as string;
        const images = (getPropertyValue(page, "files") as string[]) || [];
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
        const order = (getPropertyValue(page, "Order") as number) || index + 1;
        const pinned = (getPropertyValue(page, "Pinned") as boolean) ?? false;
        
        // Find platform property by checking all property keys (case-insensitive)
        let platformRaw = "";
        
        // Try exact match first (case-insensitive)
        let platformKey = propertyKeys.find(
          (key) => key.toLowerCase() === "platform"
        );
        
        // If not found, try partial match (in case it's "Platform" or has spaces)
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
        const sourceKey = propertyKeys.find(
          (key) => key.toLowerCase() === "source"
        );
        
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
          order,
          pinned,
          platform,
          source: source && source.trim() ? source.trim() : undefined,
        };
      });

    // Sort: pinned first, then by order
    posts.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
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
