// "use client";

// import { useState } from "react";
// import { Bell } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useAuth } from "@/hooks/use.auth";

// import { NotificationItem } from "./NotificationItem";
// import {
//   useNotificationActions,
//   useNotificationsCount,
//   useNotificationsList,
// } from "@/hooks/ use-notifications";

// export function NotificationBell() {
//   const [open, setOpen] = useState(false);
//   const { isAuthenticated } = useAuth();

//   const { data: countData } = useNotificationsCount(isAuthenticated);
//   const { data: listData, isLoading } = useNotificationsList(
//     open && isAuthenticated,
//   );
//   const { markAsRead, markAllAsRead, deleteNotification } =
//     useNotificationActions();

//   const count = countData?.count ?? 0;
//   const notifications = listData?.notifications ?? [];

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-5 w-5" />
//           {count > 0 && (
//             <Badge
//               variant="destructive"
//               className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 text-xs"
//             >
//               {count > 99 ? "99+" : count}
//             </Badge>
//           )}
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end" className="w-80 p-0">
//         <div className="flex items-center justify-between px-3 py-2 border-b">
//           <span className="font-medium text-sm">Notifications</span>
//           {count > 0 && (
//             <Button
//               variant="ghost"
//               size="sm"
//               className="h-auto p-1 text-xs"
//               onClick={() => markAllAsRead.mutate()}
//             >
//               Mark all read
//             </Button>
//           )}
//         </div>

//         <ScrollArea className="h-80">
//           {isLoading ? (
//             <div className="p-4 text-sm text-muted-foreground text-center">
//               Loading...
//             </div>
//           ) : notifications.length === 0 ? (
//             <div className="p-4 text-sm text-muted-foreground text-center">
//               No notifications yet
//             </div>
//           ) : (
//             notifications.map((n) => (
//               <NotificationItem
//                 key={n.stream_id}
//                 notification={n}
//                 onMarkRead={(id) => markAsRead.mutate([id])}
//                 onDelete={(id) => deleteNotification.mutate([id])}
//               />
//             ))
//           )}
//         </ScrollArea>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use.auth";

import { NotificationItem } from "./NotificationItem";
import {
  useNotificationActions,
  useNotificationsCount,
  useNotificationsList,
} from "@/hooks/ use-notifications";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const { data: countData } = useNotificationsCount(isAuthenticated);
  const { data: listData, isLoading } = useNotificationsList(
    open && isAuthenticated,
  );
  const { markAsRead, markAllAsRead, deleteNotification } =
    useNotificationActions();

  const count = countData?.count ?? 0;
  const notifications = listData?.notifications ?? [];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 text-xs"
            >
              {count > 99 ? "99+" : count}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <span className="font-medium text-sm">Notifications</span>
          {count > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
              onClick={() => markAllAsRead.mutate()}
            >
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <NotificationItem
                key={n.stream_id}
                notification={n}
                onMarkRead={(id) => markAsRead.mutate([id])}
                onDelete={(id) => deleteNotification.mutate([id])}
              />
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
