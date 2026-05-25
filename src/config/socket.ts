import { io, type Socket } from "socket.io-client";
import { loadRuntimeConfig } from "@/src/lib/runtime-config";

let socketInstance: Socket | null = null;

export async function connectSocket(): Promise<Socket> {
    const { socketUrl } = await loadRuntimeConfig();
    if (!socketUrl) {
        throw new Error(
            "Socket URL is not configured. Set API_URL on the frontend service."
        );
    }

    if (!socketInstance) {
        socketInstance = io(socketUrl, {
            transports: ["polling", "websocket"],
            secure: socketUrl.startsWith("https://"),
            reconnection: true,
            reconnectionAttempts: 5,
        });
    }

    if (socketInstance.connected) {
        return socketInstance;
    }

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            cleanup();
            reject(new Error("Could not connect to chat server (timeout)."));
        }, 12000);

        const onConnect = () => {
            cleanup();
            resolve(socketInstance!);
        };

        const onError = (err: Error) => {
            cleanup();
            reject(err);
        };

        const cleanup = () => {
            clearTimeout(timeout);
            socketInstance?.off("connect", onConnect);
            socketInstance?.off("connect_error", onError);
        };

        socketInstance!.once("connect", onConnect);
        socketInstance!.once("connect_error", onError);

        if (!socketInstance!.active) {
            socketInstance!.connect();
        }
    });
}

/** @deprecated Use connectSocket() */
export function getSocket(): Socket {
    if (!socketInstance?.connected) {
        throw new Error("Socket is not connected. Call connectSocket() first.");
    }
    return socketInstance;
}
