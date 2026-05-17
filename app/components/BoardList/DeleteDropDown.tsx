import { Button } from "@/schadComponents/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/schadComponents/ui/dropdown-menu";
import { DeleteIcon, EllipsisVerticalIcon } from "lucide-react";

interface IDeleteDropDownProps {
  listId: string;
}

function DeleteDropDown(props: IDeleteDropDownProps) {
  const { listId } = props;
  async function handleDeleteList(id: string) {
    await fetch("/api/list/del", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listId: id,
      }),
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button
                type="button"
                variant="destructive"
                className=""
                onClick={() => handleDeleteList(listId)}
              >
                <p>Delete list</p>
                <DeleteIcon />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DeleteDropDown;
