import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, creatorId, creatorEmail, taskId } = await req.json();

  if (!text || !creatorId || !creatorEmail || !taskId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const comment = await prisma.taskComment.create({
      data: {
        text: text,
        creatorId: creatorId,
        creatorEmail: creatorEmail,
        taskId: taskId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);

    return NextResponse.json(
      { message: "Failed to create comment. Ensure valid creator/task IDs." },
      { status: 500 },
    );
  }
}
