import { BaseService } from "./base.service";
import {
  TNotification,
  TNotificationActionResponse,
  TNotificationCountResponse,
  TNotificationsResponse,
} from "@/types/notification.type";

export class NotificationService extends BaseService<TNotification> {
  constructor() {
    super("/notifications");
  }

  async getAllNotifications(limit = 20): Promise<TNotificationsResponse> {
    const response = await this.api.get<TNotificationsResponse>(this.endpoint, {
      params: { limit },
    });
    return response.data;
  }

  async getCount(): Promise<TNotificationCountResponse> {
    const response = await this.api.get<TNotificationCountResponse>(
      `${this.endpoint}/count`,
    );
    return response.data;
  }

  async markRead(streamIds: string[]): Promise<TNotificationActionResponse> {
    const response = await this.api.patch<TNotificationActionResponse>(
      `${this.endpoint}/read`,
      { stream_id: streamIds },
    );
    return response.data;
  }

  async markAllRead(): Promise<TNotificationActionResponse> {
    const response = await this.api.patch<TNotificationActionResponse>(
      `${this.endpoint}/read-all`,
    );
    return response.data;
  }

  async deleteNotifications(
    streamIds: string[],
  ): Promise<TNotificationActionResponse> {
    const response = await this.api.delete<TNotificationActionResponse>(
      this.endpoint,
      { data: { stream_id: streamIds } },
    );
    return response.data;
  }
}
