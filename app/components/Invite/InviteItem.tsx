import { Button } from "@/schadComponents/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/schadComponents/ui/item";
import { toast } from "sonner";

function InviteItem() {
  function onAcceptInvite() {}

  return (
    <Item variant="outline" size="xs" className="max-w-[95%]">
      <ItemHeader>
        <ItemTitle>Invite from</ItemTitle>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>user invite you to board</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <div className="w-full flex gap-2">
          <Button
            variant="default"
            size="xs"
            onClick={() => toast.success("Event has been created")}
          >
            Accept
          </Button>
          <Button
            variant="destructive"
            size="xs"
            onClick={() => toast.error("You dissmis")}
          >
            Decline
          </Button>
        </div>
      </ItemFooter>
    </Item>
  );
}

export default InviteItem;
