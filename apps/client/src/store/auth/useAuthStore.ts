import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IUser } from "@teamlite/types";

interface AuthState {
  accessToken: string | null;
  user: Omit<IUser, "password"> | null;
  isLoggedIn: boolean;
}

interface AuthActions {
  login: (
    accessToken: string,
    user: AuthState["user"],
    isLoggedIn: boolean
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isLoggedIn: false,
      login: (accessToken, user) =>
        set({ accessToken, user, isLoggedIn: true }),
      logout: () => set({ accessToken: null, user: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
