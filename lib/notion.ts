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
    case "number":
      return property.number ?? 0;
    case "checkbox":
      return property.checkbox ?? false;
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
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
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
        const status = getPropertyValue(page, "Status") as string;
        const caption = getPropertyValue(page, "Caption") as string;
        const order = (getPropertyValue(page, "Order") as number) || index + 1;
        const pinned = (getPropertyValue(page, "Pinned") as boolean) ?? false;

        return {
          id: page.id,
          name: name || "Untitled",
          images: images,
          status: status || "planned",
          caption: caption || "",
          order,
          pinned,
        };
      });

    // Sort: pinned first, then by order
    posts.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
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

export async function reorderPosts(
  posts: { id: string; order: number }[]
): Promise<void> {
  try {
    await Promise.all(
      posts.map((post) => updatePostOrder(post.id, post.order))
    );
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
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Pinned: {
          checkbox: pinned,
        },
      },
    });
  } catch (error) {
    console.error("Error updating post pinned:", error);
    throw error;
  }
}
