export type TNotification = {
  stream_id: string;
  notification_type: string;
  message: string;
  read: number;
  created_at?: string;
  [key: string]: unknown;
};

export type TNotificationsResponse = {
  notifications: TNotification[];
  stream_id: string | null;
};

export type TNotificationCountResponse = {
  count: number;
};

export type TNotificationActionResponse = {
  code: number;
};
