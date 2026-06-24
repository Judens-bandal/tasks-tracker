// components/common/PermissionGuard.tsx
"use client";

import { useAuth } from "@/hooks/use.auth";
import { EActions } from "@/types/enums";

interface Props {
  action?: EActions;
  anyOf?: EActions[];
  allOf?: EActions[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({
  action,
  anyOf,
  allOf,
  fallback = null,
  children,
}: Props) {
  const { can, canAny, canAll } = useAuth();

  const allowed =
    (action ? can(action) : true) &&
    (anyOf ? canAny(anyOf) : true) &&
    (allOf ? canAll(allOf) : true);

  return <>{allowed ? children : fallback}</>;
}
