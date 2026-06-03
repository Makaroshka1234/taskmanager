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

function CommentBlock() {
  const comments = useBoardTaskGetComments();
  return (
    <Card className="w-full max-h-[full] overflow-y-auto">
      <CardHeader>
        <CardTitle>Add Comment to task</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Textarea
            id="tasl-comment"
            placeholder="Add any comment to task :>"
            className="resize-none mb-3 "
            defaultValue={`*dsddsdsd*`}
          />
        </FieldGroup>
        <Button type="button" size="sm" className="mb-5 ">
          Send
        </Button>
        <CommentsList comments={comments} />
      </CardContent>
    </Card>
  );
}

export default CommentBlock;
