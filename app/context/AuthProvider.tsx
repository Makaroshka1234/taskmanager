"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserModel } from "@/generated/prisma/models";

type AuthContextType = {
  user: UserModel | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 єдина функція для отримання юзера
  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json().catch(() => null);

      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  // 🔥 ініціалізація при старті апки
  useEffect(() => {
    const init = async () => {
      await refreshUser();
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🔥 безпечний хук
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
