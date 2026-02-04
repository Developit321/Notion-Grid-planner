import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

export interface NotionPost {
  id: string;
  name: string;
  images: string[];
  status: string;
  caption: string;
  order: number;
  pinned: boolean;
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
    case "number":
      return property.number ?? 0;
    case "checkbox":
      return property.checkbox ?? false;
    case "date":
      // Return ISO date string, or null if no date set
      return property.date?.start || null;
    case "files":
      // Return ALL file URLs as an array
      const urls: string[] = [];
      for (const file of property.files) {
        if (file.type === "file") {
          urls.push(file.file.url);
        } else if (file.type === "external") {
          urls.push(file.external.url);
        }
      }
      return urls;
    default:
      return null;
  }
}

export async function getPosts(): Promise<NotionPost[]> {
  try {
    // Sort by Date (most recent first) - Date field handles both chronological order and manual reordering
    let response: QueryDatabaseResponse;
    try {
      response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      });
    } catch (dateError: any) {
      // If Date property doesn't exist, try Order sorting, or no sorting
      if (dateError?.code === 'validation_error' && dateError?.body?.includes('Date')) {
        try {
          response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
              {
                property: "Order",
                direction: "ascending",
              },
            ],
          });
        } catch (orderError: any) {
          // If Order also doesn't exist, query without sorting
          if (orderError?.code === 'validation_error' && orderError?.body?.includes('Order')) {
            response = await notion.databases.query({
              database_id: databaseId,
            });
          } else {
            throw orderError;
          }
        }
      } else {
        throw dateError;
      }
    }

    const posts: NotionPost[] = response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page, index) => {
        const name = getPropertyValue(page, "Name") as string;
        const images = (getPropertyValue(page, "Files") as string[]) || [];
        const status = getPropertyValue(page, "Status") as string;
        const caption = getPropertyValue(page, "Caption") as string;
        const order = (getPropertyValue(page, "Order") as number) || null; // Optional, only for unpinned posts
        const date = getPropertyValue(page, "Date") as string | null;
        const pinnedPlacement = (getPropertyValue(page, "Pinned Placement") as string[]) || [];
        
        // Check if post has a pinned placement (1, 2, or 3)
        const pinnedPlacementValue = pinnedPlacement.find((val) => ["1", "2", "3"].includes(val));
        const isPinned = !!pinnedPlacementValue;
        const pinnedOrder = pinnedPlacementValue ? parseInt(pinnedPlacementValue, 10) : null;

        return {
          id: page.id,
          name: name || "Untitled",
          images: images,
          status: status || "planned",
          caption: caption || "",
          order: order || index + 1, // Fallback to index if Order not set
          pinned: isPinned,
          date: date || undefined,
          pinnedPlacement: pinnedOrder || undefined,
        };
      });

    // Validate pinned posts: only allow maximum 3 pinned posts with unique placements (1, 2, 3)
    // If more than 3 posts have Pinned Placement values, or if there are duplicates, handle them
    const pinnedPostsList = posts.filter((p) => p.pinnedPlacement !== undefined && p.pinnedPlacement >= 1 && p.pinnedPlacement <= 3);
    
    // Check for duplicates - each placement (1, 2, 3) should only be used once
    const placementCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    pinnedPostsList.forEach((p) => {
      if (p.pinnedPlacement) {
        placementCounts[p.pinnedPlacement] = (placementCounts[p.pinnedPlacement] || 0) + 1;
      }
    });
    
    // If there are more than 3 pinned posts OR duplicates, mark extras as unpinned locally
    if (pinnedPostsList.length > 3 || Object.values(placementCounts).some((count) => count > 1)) {
      console.warn(`Warning: Invalid Pinned Placement configuration detected (more than 3 pinned or duplicates). Only the first 3 unique placements will be displayed as pinned.`);
      
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
      
      for (const post of pinnedPostsList) {
        if (post.pinnedPlacement && !keptPlacements.has(post.pinnedPlacement)) {
          keptPlacements.add(post.pinnedPlacement);
        } else {
          // Mark as unpinned locally
          const postIndex = posts.findIndex((p) => p.id === post.id);
          if (postIndex !== -1) {
            posts[postIndex].pinned = false;
            posts[postIndex].pinnedPlacement = undefined;
          }
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

    return posts;
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    throw error;
  }
}

export async function updatePostOrder(
  pageId: string,
  order: number
): Promise<void> {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Order: {
          number: order,
        },
      },
    });
  } catch (error) {
    console.error("Error updating post order:", error);
    throw error;
  }
}

export async function updatePostDate(
  pageId: string,
  date: string
): Promise<void> {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Date: {
          date: {
            start: date,
          },
        },
      },
    });
  } catch (error: any) {
    // Silently fail if Date property doesn't exist yet
    // User can add it later and reordering will work
    if (error?.code === 'validation_error' && error?.body?.includes('Date')) {
      console.warn("Date property not found in Notion database. Please add a 'Date' property to enable chronological sorting.");
      return;
    }
    console.error("Error updating post date:", error);
    throw error;
  }
}

export async function reorderPosts(
  posts: { id: string; order: number }[]
): Promise<void> {
  try {
    // When reordering, update dates to reflect the new order
    // Date is now the primary field for sorting - no need for Order field
    // Position 0 (first) gets today's date, position 1 gets yesterday, etc.
    const now = new Date();
    const updates = posts.map((post, index) => {
      const date = new Date(now);
      // Subtract days based on position (first = today, second = yesterday, etc.)
      date.setDate(date.getDate() - index);
      const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      // Update date (primary) and optionally order (for backward compatibility)
      return Promise.allSettled([
        updatePostDate(post.id, dateString),
        updatePostOrder(post.id, post.order).catch(() => {}), // Optional, fail silently
      ]);
    });
    
    await Promise.all(updates);
  } catch (error) {
    console.error("Error reordering posts:", error);
    throw error;
  }
}

export async function updatePostPinned(
  pageId: string,
  pinned: boolean
): Promise<void> {
  try {
    // Get current posts to determine placement assignment
    let response: QueryDatabaseResponse;
    try {
      response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: "Order",
            direction: "ascending",
          },
        ],
      });
    } catch (orderError: any) {
      // If Order doesn't exist, query without sorting
      if (orderError?.code === 'validation_error' && orderError?.body?.includes('Order')) {
        response = await notion.databases.query({
          database_id: databaseId,
        });
      } else {
        throw orderError;
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
  } catch (error) {
    console.error("Error updating post pinned:", error);
    throw error;
  }
}
