import { addCommentSchema } from "@/app/schemas/addComment.shema";
import {
  useBoardGetCurrentTask,
  useBoardStore,
} from "@/app/store/useBoardStore";
import { useUser } from "@/app/store/useUserStore";
import { Button } from "@/schadComponents/ui/button";
import { Field, FieldError, FieldGroup } from "@/schadComponents/ui/field";
import { Textarea } from "@/schadComponents/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface IAddTextForm<T extends FieldValues> {
  type: "Comment" | "Describe";
  onSubmit: SubmitHandler<T>;
}

function AddTextForm() {
  const { id, email } = useUser() || {};
  const currTask = useBoardGetCurrentTask();
  const createComment = useBoardStore((state) => state.createComment);

  const form = useForm<addCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      text: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: addCommentSchema) => {
    createComment(data?.text, id!, currTask?.id, email!);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Textarea
                id="text-comment"
                placeholder="Add any comment to task :>"
                className="resize-none mb-3"
                {...field}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" size="sm" className="mb-5 ">
        Send
      </Button>
    </form>
  );
}

export default AddTextForm;
