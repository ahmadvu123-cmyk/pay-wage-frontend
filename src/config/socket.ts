import { io, type Socket } from "socket.io-client";
import { getRuntimeSocketUrl } from "@/src/lib/runtime-config";

let socketInstance: Socket | null = null;

export function getSocket(): Socket {
    if (socketInstance) {
        return socketInstance;
    }

    const url = getRuntimeSocketUrl();
    if (!url) {
        throw new Error("Socket URL is not configured. Set API_URL on the server.");
    }

    socketInstance = io(url, {
        transports: ["websocket"],
        secure: url.startsWith("https://"),
    });

    return socketInstance;
}
