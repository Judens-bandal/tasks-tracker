// hooks/use-auth-login.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { getDashboardRoute } from "@/lib/auth";
import type { LoginDto } from "@/types/auth.types";
import { AuthService } from "@/services/auth.service";

const authService = new AuthService();

export function useAuthLogin() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (data: LoginDto) => authService.login(data),

    onMutate: () => {
      toast.loading("Logging in...", {
        position: "top-right",
        id: "login-toast",
      });
    },

    // hooks/use-auth-login.ts
    // hooks/use-auth-login.ts
    onSuccess: (data) => {
      const { rehydrateFromToken } = useAuthStore.getState();
      rehydrateFromToken(data.accessToken);

      document.cookie = `access_token=${data.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}`;

      const { user } = useAuthStore.getState();
      const route = getDashboardRoute(user!.role);

      toast.success(`Welcome back, ${user?.name ?? user?.username}!`, {
        position: "top-right",
        duration: 2000,
      });

      // [CHANGED] full page navigation instead of router.replace
      // ensures middleware reads the cookie on the next request
      // router.replace is client-side and can race with cookie being set
      setTimeout(() => {
        window.location.href = route;
      }, 500);
    },

    onError: (error: Error) => {
      toast.error(error.message || "Invalid credentials. Please try again.", {
        position: "top-right",
        duration: 3000,
      });
    },

    onSettled: () => {
      toast.dismiss("login-toast");
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}
