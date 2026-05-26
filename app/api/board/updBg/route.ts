import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { boardId, backgroundImageUrl, backgroundType } = await req.json();

  if (!boardId || !backgroundImageUrl || !backgroundType) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  try {
    // Використовуємо update замість updateMany
    const updatedBoard = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        backgroundImageUrl: backgroundImageUrl,
        backgroundType: backgroundType, // Переконайся, що "IMAGE" є в Enum у schema.prisma, якщо юзаєш Enum
      },
    });

    // Повертаємо саму оновлену борду (це зручно для фронтенду) і статус 200
    return NextResponse.json(updatedBoard, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed to update board background",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }, // Обов'язково повертаємо 500 статус, якщо щось лягло
    );
  }
}
