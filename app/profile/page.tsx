"use client";

import { UserModel } from "@/generated/prisma/models";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const { user, loading } = useAuth();
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

  return (
    <>
      <p>{user.email}</p>
    </>
  );
}

export default ProfilePage;
