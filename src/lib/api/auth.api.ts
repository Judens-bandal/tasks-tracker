// lib/api/auth.api.ts
import { apiClient } from "./client";
import type { AuthResponse, LoginDto } from "@/types/auth.types";

export const authApi = {
  login: (dto: LoginDto): Promise<AuthResponse> =>
    apiClient.post<AuthResponse>("/auth/login", dto).then((r) => r.data),

  logout: (): Promise<void> =>
    apiClient.post("/auth/login").then(() => undefined),
};
