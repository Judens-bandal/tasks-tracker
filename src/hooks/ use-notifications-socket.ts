"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use.auth";
import type {
  TNotification,
  TNotificationsResponse,
} from "@/types/notification.type";
import { socketService } from "@/services/socket.service";

export const useNotificationsSocket = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const connectedRef = useRef(false);

  useEffect(() => {
    if (!accessToken || connectedRef.current) return;

    const socket = socketService.connect(accessToken);
    connectedRef.current = true;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
    });

    socket.onAny((event, ...args) => {
      console.log("📩", event, args);
    });

    // Use the same names as the backend
    socket.on("connection_status", (payload) => {
      console.log(payload);
    });

    socket.on("new_notification", (notification: TNotification) => {
      console.log("🔔", notification);

      // ============================
      // Update notification count
      // ============================
      queryClient.setQueryData<{ count: number }>(
        ["notifications-count"],
        (old) => ({
          count: (old?.count ?? 0) + 1,
        }),
      );

      // ============================
      // Add new notification to top
      // ============================
      queryClient.setQueryData<TNotificationsResponse>(
        ["notifications-list", 20],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            notifications: [notification, ...old.notifications],
          };
        },
      );

      toast(notification.message, {
        position: "top-right",
        duration: 4000,
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connection_status");
      socket.off("new_notification");
      socket.offAny();

      socketService.disconnect();
      connectedRef.current = false;
    };
  }, [accessToken, queryClient]);
};
