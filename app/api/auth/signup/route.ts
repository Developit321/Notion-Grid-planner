import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const db = await getDb();
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ 
      email: email.toLowerCase() 
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const result = await db.collection("users").insertOne({
      email: email.toLowerCase(),
      passwordHash,
      name: name || email.split("@")[0],
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      userId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
