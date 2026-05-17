"use client";

import BoardListItem from "./BoardListItem";
import { Board } from "@/generated/prisma/client";
import CreateBoard from "./CreateBoard";
import { useUserStore } from "@/app/store/useUserStore";
import DeleteDropDown from "./DeleteDropDown";

export interface IBoardList {
  title: string;
}

export default function BoardList(props: IBoardList) {
  const { user, isLoading } = useUserStore();

  const userBoards = user?.boards;
  console.log(userBoards);

  const { title } = props;
  return (
    <div className="flex flex-col gap-6 px-5 py-5">
      <h2 className="font-bold ">{title}</h2>
    
      <ul className="board-list flex gap-4 py-2 px-2 w-full overflow-x-auto ">
        {userBoards?.map((board: Board) => (
          <BoardListItem
            key={board.id}
            boardTitle={board.title}
            id={board.id}
          />
        ))}

        <CreateBoard />
      </ul>
    </div>
  );
}
