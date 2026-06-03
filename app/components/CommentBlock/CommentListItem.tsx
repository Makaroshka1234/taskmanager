import { IComment } from "@/app/types/board";
import { Avatar, AvatarFallback } from "@/schadComponents/ui/avatar";

interface ICommentListItemProps {
  comment: IComment;
}

function CommentListItem({ comment }: ICommentListItemProps) {
  const { creatorEmail, creatorId, createdAt, text } = comment;

  return (
    <li key={comment.id} className="">
      <div className="flex gap-4 items-center mb-2">
        <Avatar>
          <AvatarFallback>
            {comment.creatorEmail.slice(0, 2).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h3>{comment.creatorEmail}</h3>
        <p>{comment?.createdAt || "xcxcx"}</p>
      </div>

      <p className="break-words ">{comment.text}</p>
      <div></div>
    </li>
  );
}

export default CommentListItem;
