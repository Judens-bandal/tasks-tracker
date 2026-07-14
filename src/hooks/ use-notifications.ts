import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "@/services/notification.service";

const notificationService = new NotificationService();

export const useNotificationsCount = (enabled: boolean) => {
  return useQuery({
    queryKey: ["notifications-count"],
    queryFn: () => notificationService.getCount(),
    enabled,
    staleTime: 30 * 1000,
  });
};

export const useNotificationsList = (enabled: boolean, limit = 20) => {
  return useQuery({
    queryKey: ["notifications-list", limit],
    queryFn: () => notificationService.getAllNotifications(limit), // renamed
    enabled,
    staleTime: 30 * 1000,
  });
};

export const useNotificationActions = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications-count"] });
    queryClient.invalidateQueries({ queryKey: ["notifications-list"] });
  };

  const markAsRead = useMutation({
    mutationFn: (streamIds: string[]) =>
      notificationService.markRead(streamIds),
    onSuccess: invalidate,
  });

  const markAllAsRead = useMutation({
    mutationFn: () => notificationService.markAllRead(),
    onSuccess: invalidate,
  });

  const deleteNotification = useMutation({
    mutationFn: (streamIds: string[]) =>
      notificationService.deleteNotifications(streamIds),
    onSuccess: invalidate,
  });

  return { markAsRead, markAllAsRead, deleteNotification };
};
