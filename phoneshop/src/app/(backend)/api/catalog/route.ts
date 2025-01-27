import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Extract sorting parameters
  const sortBy = searchParams.get("sort") || "date"; // Default to sorting by date
  const sortOrder = searchParams.get("order") || "desc"; // Default to descending order

  // Extract filtering parameters
  const minPrice = parseFloat(searchParams.get("minPrice") || "0"); // Default to 0
  const maxPrice = parseFloat(searchParams.get("maxPrice") || Number.MAX_VALUE.toString()); // Default to no upper limit
  const brand = searchParams.get("brand") || null; // Default to no brand filtering

  try {
    const products = await db.phone.findMany({
      where: {
        price: {
          gte: minPrice, // Greater than or equal to minPrice
          lte: maxPrice, // Less than or equal to maxPrice
        },
        ...(brand && {
          brand: {
            equals: brand,
            mode: "insensitive", // Make brand filtering case-insensitive
          },
        }),
      },
      orderBy:
        sortBy === "price"
          ? { price: sortOrder as "asc" | "desc" } // Sort by price
          : { createdAt: sortOrder as "asc" | "desc" }, // Sort by date by default
    });

    // Ensure products is always a valid array
    if (!products || !Array.isArray(products)) {
      console.error("Invalid products fetched:", products);
      return NextResponse.json(
        { error: "Failed to fetch products, invalid data returned from database." },
        { status: 500 }
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
