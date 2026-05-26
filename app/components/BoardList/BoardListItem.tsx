import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/schadComponents/ui/card";
import BoardListMemberList from "./BoardListMemberList";
import { CircleArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteDropDown from "./DeleteDropDown";
import { useBoard } from "@/app/hooks/useBoard";
import { useBoardStore } from "@/app/store/useBoardStore";

export interface IBoardListItem {
  id: string;
  boardTitle: string;
}

function BoardListItem(props: IBoardListItem) {
  const { id, boardTitle } = props;

  const router = useRouter();
  const goToBoard = (id: string) => {
    router.push(`/profile/board/${id}`);
  };
  return (
    <li className="w-60 shrink-0">
      <Card>
        <CardHeader>
          <CardTitle>{boardTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <BoardListMemberList />

          <CircleArrowRight onClick={() => goToBoard(id)} />
        </CardContent>
      </Card>
    </li>
  );
}

export default BoardListItem;
