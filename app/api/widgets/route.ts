import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { encrypt } from "@/lib/encryption";
import { ObjectId } from "mongodb";
import { Client } from "@notionhq/client";

function generateWidgetId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// GET /api/widgets - List user's widgets
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const userId = (session.user as any).id;

    const widgets = await db
      .collection("widgets")
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();

    // Don't send the encrypted token back to client
    const safeWidgets = widgets.map((w) => ({
      _id: w._id.toString(),
      name: w.name,
      widgetId: w.widgetId,
      databaseId: w.databaseId,
      createdAt: w.createdAt,
    }));

    return NextResponse.json({ widgets: safeWidgets });
  } catch (error) {
    console.error("Error fetching widgets:", error);
    return NextResponse.json(
      { error: "Failed to fetch widgets" },
      { status: 500 }
    );
  }
}

// POST /api/widgets - Create a new widget
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, notionToken, databaseId } = await request.json();

    if (!name || !notionToken || !databaseId) {
      return NextResponse.json(
        { error: "Name, Notion token, and database ID are required" },
        { status: 400 }
      );
    }

    // Validate Notion credentials by trying to query the database
    try {
      const notion = new Client({ auth: notionToken });
      await notion.databases.retrieve({ database_id: databaseId });
    } catch (notionError: any) {
      console.error("Notion validation error:", notionError);
      return NextResponse.json(
        { error: "Invalid Notion credentials or database ID. Make sure the integration has access to the database." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const userId = (session.user as any).id;

    // Generate unique widget ID
    let widgetId = generateWidgetId();
    let exists = await db.collection("widgets").findOne({ widgetId });
    while (exists) {
      widgetId = generateWidgetId();
      exists = await db.collection("widgets").findOne({ widgetId });
    }

    // Encrypt the Notion token before storing
    const encryptedToken = encrypt(notionToken);

    const result = await db.collection("widgets").insertOne({
      userId: new ObjectId(userId),
      name,
      notionToken: encryptedToken,
      databaseId,
      widgetId,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      widgetId,
      _id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error creating widget:", error);
    return NextResponse.json(
      { error: "Failed to create widget" },
      { status: 500 }
    );
  }
}
