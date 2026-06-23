// types/enums.ts
export enum EActions {
  CREATE = "create", // ← lowercase to match your backend
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

export enum EUserRole {
  ADMIN = "admin", // ← check your backend values
  PROJECT_MANAGER = "project_manager",
  MEMBER = "member",
  VIEWER = "viewer",
}
