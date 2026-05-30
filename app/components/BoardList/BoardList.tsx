"use client";

import BoardListItem from "./BoardListItem";

import { useUserStore } from "@/app/store/useUserStore";
import DeleteDropDown from "./DeleteDropDown";
import { Board, useBoardStore } from "@/app/store/useBoardStore";
import { set } from "zod";
import { useEffect } from "react";
import CreateBoard from "./CreateBoard/CreateBoard";

export interface IBoardList {
  title: string;
}

export default function BoardList(props: IBoardList) {
  const { user, isLoading } = useUserStore();
  const { boards, setBoards, fetchBoard } = useBoardStore();

  const userBoards = user?.boards;

  const { title } = props;
  useEffect(() => {
    if (!isLoading && user?.boards) {
      setBoards(user.boards ?? []);
    }
  }, [user, isLoading]);
  return (
    <div className="flex flex-col gap-6 px-5 py-5">
      <h2 className="font-bold ">{title}</h2>

      <ul className="board-list flex gap-4 py-2 px-2 w-full overflow-x-auto ">
        {boards.map((board: Board, i) => (
          <BoardListItem
            key={board.id + i}
            boardTitle={board.title}
            id={board.id}
          />
        ))}

        <CreateBoard />
      </ul>
    </div>
  );
}
