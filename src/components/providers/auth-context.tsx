// context/auth.context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter, usePathname } from "next/navigation";
import { EUserRole } from "@/types/enums";

interface AuthContextType {
  showSessionExpiredAlert: boolean;
  setShowSessionExpiredAlert: (show: boolean) => void;
  expirationReason: string | null;
  setExpirationReason: (reason: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  showSessionExpiredAlert: false,
  setShowSessionExpiredAlert: () => {},
  expirationReason: null,
  setExpirationReason: () => {},
});

const PUBLIC_ROUTES = ["/login", "/"];

const ROLE_REDIRECT_MAP: Record<EUserRole, string> = {
  [EUserRole.ADMIN]: "/a/users",
  [EUserRole.PROJECT_MANAGER]: "/p/projects",
  [EUserRole.MEMBER]: "/m/tasks",
  [EUserRole.VIEWER]: "/tasks",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const _hasHydrated = useAuthStore((s) => s._hasHydrated);

  const [showSessionExpiredAlert, setShowSessionExpiredAlert] = useState(false);
  const [expirationReason, setExpirationReason] = useState<string | null>(null);

  // redirect authenticated users away from public routes
  useEffect(() => {
    if (!_hasHydrated) return; // wait for persist to hydrate

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    if (!isPublicRoute) return;

    if (accessToken && user?.role) {
      const redirectTo = ROLE_REDIRECT_MAP[user.role] ?? "/";
      if (pathname !== redirectTo) {
        router.replace(redirectTo);
      }
    }
  }, [accessToken, user, pathname, _hasHydrated]);

  // session event listeners
  useEffect(() => {
    const handle = (reason: string) => () => {
      setExpirationReason(reason);
      setShowSessionExpiredAlert(true);
    };

    const events: [string, () => void][] = [
      ["authTokenExpired", handle("token_expired")],
      ["differentSessionDetected", handle("different_session")],
      ["missingAuthToken", handle("missing_token")],
      ["invalidAuthToken", handle("invalid_token")],
      ["forbiddenPermission", handle("forbidden")],
    ];

    events.forEach(([event, handler]) =>
      window.addEventListener(event, handler),
    );
    return () =>
      events.forEach(([event, handler]) =>
        window.removeEventListener(event, handler),
      );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        showSessionExpiredAlert,
        setShowSessionExpiredAlert,
        expirationReason,
        setExpirationReason,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
