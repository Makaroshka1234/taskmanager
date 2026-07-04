import { Button } from "@/schadComponents/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/schadComponents/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/schadComponents/ui/dropdown-menu";
import { Field, FieldGroup } from "@/schadComponents/ui/field";
import { Input } from "@/schadComponents/ui/input";

import { Children } from "react";
import { useForm, Watch } from "react-hook-form";
import { inviteUserSchema } from "../schemas/inviteUser.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import PriorityList from "./PriorityList/PriorityList";

function InvitePopUp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<inviteUserSchema>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });
  const role = watch("role");
  function onSubmit() {
    console.log("tap");
  }
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="">
          <DialogTitle>Invite members to your board</DialogTitle>
        </DialogHeader>

        <form
          action="sumbit"
          className=" w-full flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup className="flex  flex-row justify-center gap-5">
            <Field>
              <Input
                id="invite-email"
                placeholder="enter user email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </Field>
            <Field>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{role}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuRadioGroup
                      value={role}
                      onValueChange={(val) =>
                        setValue("role", val as "member" | "admin")
                      }
                    >
                      {" "}
                      <DropdownMenuRadioItem value="member">
                        member
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="admin">
                        admin
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </Field>
          </FieldGroup>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            Invite
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InvitePopUp;
