import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, boardListId, priority } = await req.json();

  if (!title || !boardListId) {
    return NextResponse.json(
      {
        message: "Empty title and listId",
      },
      {
        status: 401,
      },
    );
  }
  const newTask = await prisma.task.create({
    data: {
      title,
      boardListId,
      priority: priority ?? "LOW",
      completed: false,
    },
  });
  return NextResponse.json(newTask);
}
