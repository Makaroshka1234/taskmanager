import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { listId } = await req.json();

    await prisma.boardList.delete({
      where: {
        id: listId,
      },
    });

    return NextResponse.json(
      {
        message: "List deleted",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Error deleting list",
      },
      {
        status: 500,
      },
    );
  }
}
