// lib/jwt.ts
import type { JwtPayload } from "@/types/auth.types";

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64 = token.split(".")[1];
    const decoded = JSON.parse(atob(base64));
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload) return true;
  return payload.exp * 1000 < Date.now();
}
