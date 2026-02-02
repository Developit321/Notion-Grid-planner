import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  console.log("[Signup] POST request received");
  try {
    const { email, password, name } = await request.json();
    console.log("[Signup] Request body:", { email, name: name || "not provided", passwordLength: password?.length });

    if (!email || !password) {
      console.log("[Signup] Missing email or password");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log("[Signup] Password too short");
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    console.log("[Signup] Attempting to connect to MongoDB...");
    const db = await getDb();
    console.log("[Signup] MongoDB connected, checking for existing user...");
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ 
      email: email.toLowerCase() 
    });

    if (existingUser) {
      console.log("[Signup] User already exists:", email);
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    console.log("[Signup] Hashing password...");
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    console.log("[Signup] Creating user in database...");
    // Create user
    const result = await db.collection("users").insertOne({
      email: email.toLowerCase(),
      passwordHash,
      name: name || email.split("@")[0],
      createdAt: new Date(),
    });

    console.log("[Signup] User created successfully:", result.insertedId.toString());
    return NextResponse.json({
      success: true,
      userId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("[Signup] ERROR:", error);
    console.error("[Signup] Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
