import { createBoardSchema } from "@/app/api/schemas/createboard.schema";
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

function CreateBoardForm() {
  const form = useForm<createBoardSchema>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  async function CreateBoardFormSubmit(data: createBoardSchema) {
    await apiFetch("/api/board/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("AFTER REFRESH");
  }
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(CreateBoardFormSubmit)}
      id="createBoard-form"
    >
      <DialogHeader>
        <DialogTitle>Create your Board</DialogTitle>
        <DialogDescription>Fill field to create a board</DialogDescription>
      </DialogHeader>

      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor="board-title">Board title</Label>
              <Input {...field} id="board-title" placeholder="Board-title" />
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
        Create Board
      </Button>
    </form>
  );
}

export default CreateBoardForm;
