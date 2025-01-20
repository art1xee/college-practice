import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const phone = await prisma.phone.findUnique({
      where: { id: parseInt(id) },
    });

    if (!phone) {
      return NextResponse.json({ message: "Phone not found" }, { status: 404 });
    }

    return NextResponse.json(phone);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching phone" }, { status: 500 });
  }
}
