"use client";

import { createBoardSchema } from "@/app/schemas/createboard.schema";
import { useBoardStore } from "@/app/store/useBoardStore";

import { Button } from "@/schadComponents/ui/button";
import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/schadComponents/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/schadComponents/ui/field";
import { Input } from "@/schadComponents/ui/input";
import { Label } from "@/schadComponents/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

interface CreateBoardFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateBoardForm(props: CreateBoardFormProps) {
  const { open, setOpen } = props;
  const form = useForm<createBoardSchema>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  const { createBoard } = useBoardStore();

  const onSubmit = (data: createBoardSchema) => {
    createBoard(data);
    form.reset();
    setOpen(false);
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit)}
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
      </FieldGroup>

      <Button type="submit">Create Board</Button>
    </form>
  );
}

export default CreateBoardForm;
