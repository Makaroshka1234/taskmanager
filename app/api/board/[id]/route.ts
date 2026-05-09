import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const board = await prisma.board.findUnique({
      where: {
        id: id,
      },
      include: {
        boardLists: {
          include: {
            tasks: true,
          },
        },
      },
    });
    if (!board) {
      return NextResponse.json(
        {
          message: `Board's not found`,
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(board, {
      status: 200,
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
