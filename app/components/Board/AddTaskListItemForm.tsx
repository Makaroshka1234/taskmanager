"use client";

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
import React from "react";

import TextareaAutosize from "react-textarea-autosize";
import PriorityList from "../PriorityList/PriorityList";

function AddTaskListItemForm() {
  const priorities = [
    {
      value: "LOW",
      color: "green",
    },
    {
      value: "MEDIUM",
      color: "yellow",
    },
    {
      value: "HIGH",
      color: "red",
    },
  ];
  const [position, setPosition] = React.useState("bottom");
  return (
    <form>
      <FieldGroup>
        <Field className="mb-3">
          <FieldLabel>Task </FieldLabel>
          <FieldDescription>Type your task</FieldDescription>
          <TextareaAutosize
            minRows={2}
            id="textarea-task"
            placeholder="Type your task here."
            className=" flex w-full rounded-md border
    bg-background px-3 py-2 text-sm
    resize-none
    focus-visible:outline-none
    focus-visible:ring-1 overflow-hidden"
          />
        </Field>
        <Field className="mb-5">
          <FieldTitle>Task priority</FieldTitle>
          <FieldDescription>Choose your task priority</FieldDescription>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                priority
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Task Priority</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <PriorityList prioryties={priorities} />
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Field>
      </FieldGroup>

      <Button type="submit">Add Task</Button>
    </form>
  );
}

export default AddTaskListItemForm;
