import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id; // Get the current user's ID
    const body = await req.json();

    // Validate request body
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { name, brand, price, description, imageUrl } = body;

    // Validate required fields
    if (!name || !brand || !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, brand, or imageUrl)" },
        { status: 400 }
      );
    }

    // Save product in the database
    const product = await db.phone.create({
      data: {
        name,
        brand,
        imageUrl, // Store the image URL
        price: price ? parseFloat(price) : null, // Handle optional price
        description: description || null, // Handle optional description
        createdAt: new Date(), // Set current timestamp
        userId, // Assign the current user's ID
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
