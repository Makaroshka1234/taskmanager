"use client";
import Image from "next/image";
import HeaderList from "./HeaderList";
import { Button } from "@/schadComponents/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "../store/useUserStore";
import { apiFetch } from "../utils/apiFetch";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, isLoading } = useUserStore();
  const navList: string[] = ["Info", "Profile", "About"];
  const router = useRouter();
  const logout = async () => {
    await apiFetch("/api/auth/logout", {
      method: "POST",
    });

    useUserStore.getState().clearUser();

    router.push("/login");
  };
  return (
    <header className="bg-black text-amber-50 shrink-0">
      <div className="header__inner flex items-center px-5 py-3.5 justify-between">
        <Image src="/vercel.svg" alt="logo" width={50} height={50} />
        <div className="flex gap-5 items-center">
          <HeaderList navList={navList} />
          {isLoading ? (
            <div className="flex gap-3">Loading...</div>
          ) : user ? (
            <div className="flex gap-3 items-center">
              <User />{" "}
              <Button
                variant="destructive"
                className="bg-white"
                onClick={logout}
              >
                log out
              </Button>
            </div>
          ) : (
            <div className="header_btn-block flex gap-3 justify-center items-center">
              <Button
                className="bg-transparent border border-white text-white cursor-pointer hover:bg-white hover:text-black transition"
                variant="default"
                size="default"
              >
                <Link href="/login">login</Link>
              </Button>

              <Button
                asChild
                className="bg-transparent border border-white text-white cursor-pointer hover:bg-white hover:text-black transition"
                variant="default"
                size="default"
              >
                <Link href="/reg">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
