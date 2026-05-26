import { createTaskListSchema } from "@/app/schemas/createtasklist.schema";
import { useBoardStore } from "@/app/store/useBoardStore";
import { apiFetch } from "@/app/utils/apiFetch";

import { Button } from "@/schadComponents/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/schadComponents/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/schadComponents/ui/field";
import { Input } from "@/schadComponents/ui/input";
import { Label } from "@/schadComponents/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

function CreateTaskListForm({ boardId }: { boardId: string }) {
  const form = useForm<createTaskListSchema>({
    resolver: zodResolver(createTaskListSchema),
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  const { createTaskList } = useBoardStore();
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit((data) =>
        createTaskList({ ...data, boardId }),
      )}
      id="createTaskList-form"
    >
      <DialogHeader>
        <DialogTitle>Create your Task list</DialogTitle>
        <DialogDescription>Fill field to create a list</DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="TaskList-title">List title</Label>
              <Input
                {...field}
                id="TaskList-title"
                placeholder="TaskList-title"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* <Field>
          <Label htmlFor="board-title">Board title</Label>
          <Input
            id="board-title"
            name="board-title"
            placeholder="Board-title"
          />
        </Field> */}
      </FieldGroup>
      <Button variant="default" size="default" type="submit">
        Create Task list
      </Button>
    </form>
  );
}

export default CreateTaskListForm;
