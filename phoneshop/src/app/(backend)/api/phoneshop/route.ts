import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Start of the week
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 3);
  startOfWeek.setDate(startOfWeek.getDate() - 3); 

  const phones = await prisma.phone.findMany({
    where: {
      createdAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    take: 6, // Only the first 6 phones created this week
  });

  return NextResponse.json(phones);
}
