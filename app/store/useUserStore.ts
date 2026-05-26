import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { apiFetch } from "../utils/apiFetch";
import { Board } from "./useBoardStore";

export interface IUser {
  email: string;
  id: string;
  boards: Board[];
}

interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  // Екшени
  initAuth: () => Promise<void>;
  clearUser: () => void;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: false,

      initAuth: async () => {
        // Якщо вже є юзер, не робимо запит повторно (за бажанням)
        set({ isLoading: true });

        try {
          // Запит до твого Route Handler
          const res = await apiFetch("/api/auth/me");

          if (!res.ok) {
            throw new Error("Сесія недійсна або відсутня");
          }

          const data = await res.json();

          // Встановлюємо юзера (data.user, бо твій API повертає об'єкт { user: {...} })
          set({ user: data.user, isLoading: false }, false, "initAuth/success");
        } catch (error) {
          console.error("Помилка авторизації:", error);
          set({ user: null, isLoading: false }, false, "initAuth/error");
        }
      },

      clearUser: () => {
        set({ user: null }, false, "clearUser");
      },
      setUser: (user: IUser | null) => {
        set({ user }, false, "setUser");
      },
    }),
    { name: "UserStore" }, // Назва для Redux DevTools
  ),
);
