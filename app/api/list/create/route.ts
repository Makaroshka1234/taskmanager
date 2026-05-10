import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, boardId } = body;
  const cookie = await cookies();

  if (!title || !boardId) {
    return NextResponse.json(
      { message: "Missing title or boardId" },
      { status: 400 },
    );
  }

  const list = await prisma.boardList.create({
    data: {
      title,
      boardId,
    },
    include: {
      tasks: true,
    },
  });

  return Response.json({ list });
}
