import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// GET request: Fetch product details
export async function GET(req: Request, context: { params: { id: string } }) {
  const params = await context.params; // Await params as they are a Promise
  const { id } = params;

  try {
    const phone = await db.phone.findUnique({
      where: { id: parseInt(id, 10) }, // Parse id as integer (Phone ID is Int in your schema)
      include: { user: true }, // Include user details if needed
    });

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, phone });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}

// PUT request: Update product details
export async function PUT(req: Request, context: { params: { id: string } }) {
  const params = await context.params; // Await params as they are a Promise
  const { id } = params;
  const body = await req.json();

  try {
    const updatedPhone = await db.phone.update({
      where: { id: parseInt(id, 10) }, // Parse id as integer
      data: {
        name: body.name || undefined,
        brand: body.brand || undefined,
        imageUrl: body.imageUrl || undefined,
        price: body.price ? parseFloat(body.price) : undefined,
        description: body.description || undefined,
      },
    });

    return NextResponse.json({ success: true, updatedPhone });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}
