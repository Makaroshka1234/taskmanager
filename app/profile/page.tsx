"use client";

import { UserModel } from "@/generated/prisma/models";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/schadComponents/ui/button";
import BoardList from "@/app/components/BoardList/BoardList";

function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (!user) {
    return null; // поки редіректиться
  }

  const logout = async () => {
    console.log("logout");
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    await refreshUser();
    router.push("/login");
  };

  return (
    <>
      <BoardList title="Your Board's" />
      <BoardList title="Invited boards  " />
    </>
  );
}

export default ProfilePage;
