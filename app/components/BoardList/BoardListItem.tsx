import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/schadComponents/ui/card";
import BoardListMemberList from "./BoardListMemberList";
import { CircleArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export interface IBoardListItem {
  id: string;
  boardTitle: string;
}

function BoardListItem(props: IBoardListItem) {
  const { boardTitle, id } = props;
  const router = useRouter();
  console.log(id);
  const goToBoard = (id: string) => {
    console.log(id);
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
