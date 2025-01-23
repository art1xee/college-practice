import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const currentDate = new Date();

  // Calculate the start of the custom week (3.5 days before the current date)
  const startOfRange = new Date(currentDate);
  startOfRange.setDate(currentDate.getDate() - 3); // Half a week (~3.5 days rounded to 3 days)
  startOfRange.setHours(0, 0, 0, 0); // Start at midnight

  // Calculate the end of the custom week (3.5 days after the current date)
  const endOfRange = new Date(currentDate);
  endOfRange.setDate(currentDate.getDate() + 3); // Half a week forward
  endOfRange.setHours(23, 59, 59, 999); // End of the day

  try {
    // Fetch phones created within the custom date range
    const phones = await prisma.phone.findMany({
      where: {
        createdAt: {
          gte: startOfRange,
          lte: endOfRange,
        },
      },
      take: 6, // Limit to the first 6 phones
    });

    return NextResponse.json(phones);
  } catch (error) {
    console.error("Error fetching phones:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch phones" },
      { status: 500 }
    );
  }
}
