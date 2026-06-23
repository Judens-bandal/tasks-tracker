// stores/auth.store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { AuthStore } from "@/types/auth.types";
import { decodeJwt, isTokenExpired } from "@/lib/jwt";

const INITIAL = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
  _hasHydrated: false,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL,

        setHasHydrated: (v: boolean) =>
          set({ _hasHydrated: v }, false, "setHasHydrated"),

        rehydrateFromToken: (token: string) => {
          if (isTokenExpired(token)) {
            set({ ...INITIAL, _hasHydrated: true }, false, "tokenExpired");
            return;
          }
          const payload = decodeJwt(token);
          if (!payload) {
            set({ ...INITIAL, _hasHydrated: true }, false, "invalidToken");
            return;
          }
          set(
            {
              accessToken: token,
              user: {
                id: payload.sub,
                name: payload.name,
                username: payload.username,
                role: payload.role,
                claims: payload.claims,
              },
            },
            false,
            "rehydrateFromToken",
          );
        },

        clearAuth: () => {
          set({ ...INITIAL, _hasHydrated: true }, false, "clearAuth");
          useAuthStore.persist.clearStorage();
        },

        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),
        setError: (error) => set({ error }, false, "setError"),

        can: (action) => get().user?.claims.includes(action) ?? false,
        canAll: (actions) =>
          actions.every((a) => get().user?.claims.includes(a) ?? false),
        canAny: (actions) =>
          actions.some((a) => get().user?.claims.includes(a) ?? false),
      }),
      {
        name: "auth-storage",
        partialize: (s) => ({
          accessToken: s.accessToken,
          // user: s.user,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
    { name: "auth-store" },
  ),
);
