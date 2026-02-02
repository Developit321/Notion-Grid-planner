import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// DELETE /api/widgets/[id] - Delete a widget
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const userId = (session.user as any).id;

    // Make sure the widget belongs to the user
    const widget = await db.collection("widgets").findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(userId),
    });

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    await db.collection("widgets").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting widget:", error);
    return NextResponse.json(
      { error: "Failed to delete widget" },
      { status: 500 }
    );
  }
}
