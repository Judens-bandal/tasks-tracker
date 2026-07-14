// services/socket.service.ts
import { io, Socket } from "socket.io-client";

// services/socket.service.ts
class SocketService {
  private socket: Socket | null = null;

  connect(token: string): Socket {
    if (this.socket?.connected) return this.socket;

    // services/socket.service.ts
    this.socket = io(`${process.env.NEXT_PUBLIC_WS_URL}/tasks-notifications`, {
      auth: { accessToken: token },
      transports: ["websocket"],
      autoConnect: true,
    });
    return this.socket;
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();
