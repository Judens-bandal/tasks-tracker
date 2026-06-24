// lib/api/auth.service.ts
import { apiClient } from "@/lib/api/client";
import type { AuthResponse, LoginDto } from "@/types/auth.types";

export class AuthService {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/login", data);
    const accessToken = response.data.accessToken;

    if (!accessToken) throw new Error("No auth token received from server");

    return { accessToken };
  }
}
