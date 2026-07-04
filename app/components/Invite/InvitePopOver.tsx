import { Badge } from "@/schadComponents/ui/badge";
import { Button } from "@/schadComponents/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/schadComponents/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/schadComponents/ui/popover";
import { Separator } from "@/schadComponents/ui/separator";
import InviteList from "./InviteList";

interface IInvitePopUpProps {
  children: React.ReactNode;
}

function InvitePopOver({ children }: IInvitePopUpProps) {
  return (
    <Popover>
      <PopoverTrigger className="relative cursor-pointer">
        {children}{" "}
        <Badge className="absolute top-0 right-[-8px] rounded-full bg-amber-300">
          3
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="gap-2 h-[256px]">
        <PopoverHeader>
          <PopoverTitle>Invite Notifications</PopoverTitle>
        </PopoverHeader>
        <Separator />
        <InviteList />
      </PopoverContent>
    </Popover>
  );
}

export default InvitePopOver;
