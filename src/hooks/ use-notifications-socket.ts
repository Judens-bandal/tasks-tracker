"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use.auth";
import type { TNotification } from "@/types/notification.type";
import { socketService } from "@/services/socket.service";

export const useNotificationsSocket = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const connectedRef = useRef(false);

  useEffect(() => {
    if (!accessToken || connectedRef.current) return;

    const socket = socketService.connect(accessToken);
    connectedRef.current = true;

    socket.on("connection:status", (payload: { code: number }) => {
      if (payload.code !== 0) console.warn("socket auth failed");
    });

    socket.on("notification:new", (notification: TNotification) => {
      queryClient.setQueryData<{ count: number }>(
        ["notifications-count"],
        (old) => ({ count: (old?.count ?? 0) + 1 }),
      );
      queryClient.invalidateQueries({ queryKey: ["notifications-list"] });

      toast(notification.message, {
        position: "top-right",
        duration: 4000,
      });
    });

    return () => {
      socket.off("notification:new");
      socket.off("connection:status");
      socketService.disconnect();
      connectedRef.current = false;
    };
  }, [accessToken, queryClient]);
};
