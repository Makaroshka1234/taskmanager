import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { taskId } = await req.json();

  if (!taskId) {
    return NextResponse.json(
      { message: "taskId is required" },
      { status: 400 },
    );
  }
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return NextResponse.json(deletedTask, {
    status: 200,
  });
}
