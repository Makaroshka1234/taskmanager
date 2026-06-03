import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const taskId = searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ message: "Missing taskId" }, { status: 400 });
  }

  try {
    const taskComments = await prisma.taskComment.findMany({
      where: {
        taskId: taskId,
      },
      orderBy: { created_at: "asc" },
    });

    return NextResponse.json(taskComments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
