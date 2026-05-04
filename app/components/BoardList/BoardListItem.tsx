import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/schadComponents/ui/card";
import BoardListMemberList from "./BoardListMemberList";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { Board } from "@/generated/prisma/client";

export interface IBoardListItem {
  boardTitle: string;
}

function BoardListItem(props: IBoardListItem) {
  const { boardTitle } = props;
  return (
    <li className="w-60 flex-shrink-0">
      <Card>
        <CardHeader>
          <CardTitle>{boardTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <BoardListMemberList />
          <CircleArrowRight />
        </CardContent>
      </Card>
    </li>
  );
}

export default BoardListItem;
