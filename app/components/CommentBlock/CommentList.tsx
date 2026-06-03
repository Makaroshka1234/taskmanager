import { IComment } from "@/app/types/board";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/schadComponents/ui/avatar";
import CommentListItem from "./CommentListItem";

interface ICommentsListProps {
  comments: IComment[];
}

function CommentsList({ comments }: ICommentsListProps) {
  const hasComments = comments && comments.length > 0;
  return (
    <ul className="flex flex-col gap-4 p-2 max-w-full px-2">
      {hasComments ? (
        comments.map((comment: IComment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="text-sm text-muted-foreground">Коментарів поки немає</p>
      )}
    </ul>
  );
}
export default CommentsList;
