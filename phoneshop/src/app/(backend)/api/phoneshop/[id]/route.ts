import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle GET requests to fetch a phone by its ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const phone = await prisma.phone.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        createdAt: true,
        description: true,
        imageUrl: true, // Added imageUrl to the selected fields
        user: true, // Include seller information if needed
      },
    });

    if (!phone) {
      return NextResponse.json({ error: "Phone not found" }, { status: 404 });
    }

    return NextResponse.json(phone);
  } catch (error) {
    console.error("Error fetching phone:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
