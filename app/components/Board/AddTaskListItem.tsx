"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextareaAutosize from "react-textarea-autosize";

import { Button } from "@/schadComponents/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/schadComponents/ui/dropdown-menu";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/schadComponents/ui/field";

import PriorityList from "../PriorityList/PriorityList";

import { createTaskSchema } from "@/app/schemas/createtask.schema";
import { z } from "zod";

// 👇 витягуємо тип правильно (ВАЖЛИВО)
type CreateTaskSchema = z.infer<typeof createTaskSchema>;

function AddTaskListItemForm({ boardListId }: { boardListId: string }) {
  const priorities = [
    { value: "LOW", color: "green" },
    { value: "MEDIUM", color: "yellow" },
    { value: "HIGH", color: "red" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      priority: "LOW",
    },
  });

  const priority = watch("priority");

  async function onSubmit(data: CreateTaskSchema) {
    await fetch("/api/task/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        boardListId,
      }),
    });

    reset(); // 🔥 очистка форми після submit
  
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <FieldGroup>
        {/* TITLE */}
        <Field>
          <FieldLabel>Task</FieldLabel>
          <FieldDescription>Type your task</FieldDescription>

          <TextareaAutosize
            minRows={2}
            placeholder="Type your task here."
            className="
              flex w-full rounded-md border
              bg-background px-3 py-2 text-sm
              resize-none overflow-hidden
              focus-visible:outline-none
              focus-visible:ring-1
            "
            {...register("title")}
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </Field>

        {/* PRIORITY */}
        <Field>
          <FieldTitle>Task priority</FieldTitle>
          <FieldDescription>Choose your task priority</FieldDescription>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {priority}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Task Priority</DropdownMenuLabel>

                <DropdownMenuRadioGroup
                  value={priority}
                  onValueChange={(value) =>
                    setValue("priority", value as "LOW" | "MEDIUM" | "HIGH")
                  }
                >
                  <PriorityList prioryties={priorities} />
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isSubmitting}>
        Add Task
      </Button>
    </form>
  );
}

export default AddTaskListItemForm;
