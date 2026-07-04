import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/schadComponents/ui/card";
import { FieldGroup, FieldLabel } from "@/schadComponents/ui/field";
import { Textarea } from "@/schadComponents/ui/textarea";
import MarkdownBlock from "./MarkdownBlock";
import { Button } from "@/schadComponents/ui/button";
import CommentsList from "./CommentList";
import { useBoardTaskGetComments } from "@/app/store/useBoardStore";
import AddTextForm from "./TextForm";

function CommentBlock() {
  const comments = useBoardTaskGetComments();
  return (
    <Card className="w-full max-h-[full] overflow-y-auto">
      <CardHeader>
        <CardTitle>Add Comment to task</CardTitle>
      </CardHeader>
      <CardContent>
        <AddTextForm />
        <CommentsList comments={comments} />
      </CardContent>
    </Card>
  );
}

export default CommentBlock;
