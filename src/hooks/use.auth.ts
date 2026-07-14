// hooks/use-auth.ts
"use client";

import { useAuthStore } from "@/stores/auth.store";
import { authApi } from "@/lib/api/auth.api";
import { useRouter } from "next/navigation";
import { EUserRole } from "@/types/enums";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const can = useAuthStore((s) => s.can);
  const canAll = useAuthStore((s) => s.canAll);
  const canAny = useAuthStore((s) => s.canAny);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

  // hooks/use-auth.ts
  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      /* ignore */
    } finally {
      clearAuth();
      document.cookie = "access_token=; path=/; max-age=0"; // clear cookie
      router.push("/login");
    }
  };
  return {
    user,
    accessToken: useAuthStore((s) => s.accessToken),
    username: user?.username ?? null,
    name: user?.name ?? null,
    id: user?.id ?? null,
    role: user?.role ?? null,
    claims: user?.claims ?? [],
    isLoading,
    error,
    isAuthenticated: !!user,
    displayName: user?.name ?? user?.username ?? "Guest",
    initials:
      user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() ?? "?",
    isAdmin: user?.role === EUserRole.ADMIN,
    isProjectManager: user?.role === EUserRole.PROJECT_MANAGER,
    isMember: user?.role === EUserRole.MEMBER,
    isViewer: user?.role === EUserRole.VIEWER,
    can,
    canAll,
    canAny,
    logout,
  };
}
