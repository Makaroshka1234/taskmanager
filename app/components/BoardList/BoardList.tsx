"use client";
import { useAuth } from "@/app/context/AuthProvider";
import BoardListItem from "./BoardListItem";
import { Board } from "@/generated/prisma/client";
import CreateBoard from "./CreateBoard";

export interface IBoardList {
  title: string;
}

export default function BoardList(props: IBoardList) {
  const { user } = useAuth();

  const userBoards = user?.boards;
  console.log(userBoards);

  const { title } = props;
  return (
    <div className="flex flex-col gap-6 px-5 py-5">
      <h2 className="font-bold ">{title}</h2>
      <ul className="board-list flex gap-4 py-2 px-2 w-full overflow-x-auto ">
        {userBoards?.map((board: Board) => (
          <BoardListItem key={board.id} boardTitle={board.title} />
        ))}

        <CreateBoard  />
      </ul>
    </div>
  );
}
