// types/auth.types.ts
import { EActions, EUserRole } from "./enums";

export interface LoginDto {
  username: string;
  password: string;
}

export interface JwtPayload {
  sub: number;
  username: string;
  name: string;
  role: EUserRole;
  claims: EActions[];
  iat: number;
  exp: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  role: EUserRole;
  claims: EActions[];
}

export interface AuthResponse {
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  _hasHydrated: boolean;
}

export interface AuthActions {
  setHasHydrated: (v: boolean) => void;
  rehydrateFromToken: (token: string) => void;
  clearAuth: () => void;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  can: (action: EActions) => boolean;
  canAll: (actions: EActions[]) => boolean;
  canAny: (actions: EActions[]) => boolean;
}

export type AuthStore = AuthState & AuthActions;
