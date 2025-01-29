import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Проверяем пользователя
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await req.json();

    // Проверяем наличие imageUrl
    const { imageUrl } = body;
    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing image URL" },
        { status: 400 }
      );
    }

    // Обновляем аватар в базе данных
    await db.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    return NextResponse.json({ success: true, message: "Avatar updated" });
  } catch (error) {
    console.error("Error updating avatar:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update avatar" },
      { status: 500 }
    );
  }
}
