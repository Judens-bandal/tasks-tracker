"use client";

import { useNotificationsSocket } from "@/hooks/ use-notifications-socket";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  // ================================
  // Start notification websocket
  // Runs once after login
  // ================================
  useNotificationsSocket();

  return <>{children}</>;
}
