// lib/auth.ts
import { EUserRole } from "@/types/enums";

export function getDashboardRoute(role: EUserRole): string {
  switch (role) {
    case EUserRole.ADMIN:
      return "/a/users";
    case EUserRole.PROJECT_MANAGER:
      return "/p/projects";
    case EUserRole.MEMBER:
      return "/m/tasks";
    case EUserRole.VIEWER:
      return "/tasks";
    default:
      return "/";
  }
}
