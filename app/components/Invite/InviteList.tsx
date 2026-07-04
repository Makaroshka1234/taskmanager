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
import InviteItem from "./InviteItem";
const userInvites = [1, 2, 3];
function InviteList() {
  return (
    <ul className="notification-list h-full flex flex-col overflow-y-auto gap-2  items-center ">
      {userInvites.length === 0
        ? "No invites"
        : userInvites.map((invite) => {
            return <InviteItem key={invite} />;
          })}
    </ul>
  );
}

export default InviteList;
