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
    onSuccess: (data) => {
      const { rehydrateFromToken } = useAuthStore.getState();
      rehydrateFromToken(data.accessToken);

      // set cookie for middleware route protection
      document.cookie = `access_token=${data.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}`;

      const { user } = useAuthStore.getState();
      const route = getDashboardRoute(user!.role);

      toast.success(`Welcome back, ${user?.name ?? user?.username}!`, {
        position: "top-right",
        duration: 2000,
      });

      // [CHANGED] use replace instead of push + increased delay to 100ms
      // push can fail silently on mobile/ngrok before state settles
      // replace also prevents back-button returning to login
      setTimeout(() => router.replace(route), 100);
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
