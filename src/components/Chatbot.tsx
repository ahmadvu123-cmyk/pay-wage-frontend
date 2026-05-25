"use client";
import { connectSocket } from "@/src/config/socket";
import { useState, useEffect } from "react";

export default function ChatBot() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [connected, setConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        let active = true;
        let removeListeners: (() => void) | undefined;

        setConnectionError(null);
        setConnected(false);

        connectSocket()
            .then((s) => {
                if (!active) return;

                const onConnect = () => {
                    setConnected(true);
                    setConnectionError(null);
                };
                const onDisconnect = () => setConnected(false);
                const onMessage = (data: { user: string; text: string }) => {
                    setMessages((prev) => [...prev, data]);
                };

                s.on("connect", onConnect);
                s.on("disconnect", onDisconnect);
                s.on("message", onMessage);

                if (s.connected) {
                    onConnect();
                }

                removeListeners = () => {
                    s.off("connect", onConnect);
                    s.off("disconnect", onDisconnect);
                    s.off("message", onMessage);
                };
            })
            .catch((err: Error) => {
                if (!active) return;
                setConnectionError(
                    err.message || "Could not connect to chat server."
                );
                setConnected(false);
            });

        return () => {
            active = false;
            removeListeners?.();
        };
    }, [isOpen]);

    const sendMessage = async () => {
        if (!message.trim() || !connected) return;
        try {
            const socket = await connectSocket();
            socket.emit("message", message);
            setMessages((prev) => [
                ...prev,
                { user: "Me", text: message },
            ]);
            setMessage("");
        } catch (err: unknown) {
            const msg =
                err instanceof Error ? err.message : "Failed to send message.";
            setConnectionError(msg);
            setConnected(false);
        }
    };

    const statusLabel = connectionError
        ? " (offline)"
        : connected
          ? ""
          : " (connecting…)";

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg"
            >
                💬 Live Chat
            </button>
            {isOpen && (
                <div className="fixed bottom-20 right-4 w-80 bg-white shadow-xl border rounded-lg flex flex-col">
                    <div className="bg-blue-600 text-white p-2 flex justify-between">
                        <span>Live Chat{statusLabel}</span>
                        <button onClick={() => setIsOpen(false)}>✖</button>
                    </div>

                    {connectionError && (
                        <p className="px-3 py-2 text-sm text-red-600 bg-red-50 border-b">
                            {connectionError}
                        </p>
                    )}

                    <div className="p-3 h-64 overflow-y-auto">
                        {messages.length === 0 && connected && (
                            <p className="text-gray-500 text-sm">
                                Send a message to start the conversation.
                            </p>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-1">
                                <strong>{msg.user}: </strong>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex border-t p-2">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            className="flex-1 border p-1"
                            placeholder="Type message..."
                            disabled={!connected}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!connected}
                            className="bg-blue-600 text-white px-3 ml-2 disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
