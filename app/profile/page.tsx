"use client";

import { useRouter } from "next/navigation";

import BoardList from "@/app/components/BoardList/BoardList";
import { useUserStore } from "../store/useUserStore";

function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useUserStore();

  return (
    <>
      {isLoading ? "loading" : <p>{user?.email}</p>}
      <BoardList title="Your Boards" />
    </>
  );
}

export default ProfilePage;
