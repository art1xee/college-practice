import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await req.json();
    const { name, brand, price, description, imageUrl } = body;

    if (!name || !brand || !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, brand, or imageUrl)" },
        { status: 400 }
      );
    }

    // Check the number of existing phone products
    const userPhoneCount = await db.phone.count({
      where: { userId },
    });

    if (userPhoneCount >= 10) {
      return NextResponse.json(
        { success: false, error: "You have reached the maximum limit of 10 phone products." },
        { status: 403 }
      );
    }

    // Create the phone product if limit not exceeded
    const product = await db.phone.create({
      data: {
        name,
        brand,
        imageUrl,
        price: price ? parseFloat(price) : null,
        description: description || null,
        createdAt: new Date(),
        userId,
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

