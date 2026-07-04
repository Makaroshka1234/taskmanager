"use client";

import BoardList from "@/app/components/BoardList/BoardList";
import { useUserStore } from "@/app/store/useUserStore";

function ProfilePage() {
  const { user, isLoading } = useUserStore();

  return (
    <>
      {isLoading ? "loading" : <p>{user?.email}</p>}
      <BoardList title="Your Boards" />
    </>
  );
}

export default ProfilePage;
