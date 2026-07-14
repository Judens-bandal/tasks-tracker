import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import type { TNotification } from "@/types/notification.type";

interface Props {
  notification: TNotification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
}: Props) {
  return (
    <div
      className={`flex items-start gap-2 px-3 py-2 border-b last:border-0 hover:bg-muted/50 ${
        !notification.read ? "bg-muted/30" : ""
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm">{notification.message}</p>
        {notification.created_at && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDistanceToNow(new Date(notification.created_at), {
              addSuffix: true,
            })}
          </p>
        )}
      </div>
      <div className="flex gap-1 shrink-0">
        {!notification.read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onMarkRead(notification.stream_id)}
            title="Mark as read"
          >
            <Check className="h-3 w-3" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => onDelete(notification.stream_id)}
          title="Delete"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
