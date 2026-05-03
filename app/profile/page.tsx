"use client";

import { UserModel } from "@/generated/prisma/models";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/schadComponents/ui/button";

function ProfilePage() {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
    <div className="max-w-3xs">
      <p>{user.email}</p>
      <Button
        size={"default"}
        type="button"
        variant={"destructive"}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}

export default ProfilePage;
