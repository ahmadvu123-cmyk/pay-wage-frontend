"use client";
import { getSocket } from "@/src/config/socket";
import { useState, useEffect } from "react";

export default function ChatBot() {
    const [message, setMessage] = useState("Hi");
    const [messages, setMessages] = useState<{ user: string, text: string }[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        let socket: ReturnType<typeof getSocket>;
        try {
            socket = getSocket();
        } catch {
            return;
        }

        const onConnect = () => setConnected(true);
        const onDisconnect = () => setConnected(false);
        const onMessage = (data: { user: string; text: string }) => {
            setMessages((prev) => [...prev, data]);
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message", onMessage);

        if (socket.connected) {
            setConnected(true);
        }

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("message", onMessage);
        };
    }, [isOpen]);

    const sendMessage = () => {
        if (!message.trim() || !connected) return;
        try {
            const socket = getSocket();
            socket.emit("message", message);
            setMessages((prev) => [
                ...prev,
                {
                    user: "Me",
                    text: message,
                },
            ]);
            setMessage("");
        } catch {
            return;
        }
    };

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
                        <span>Live Chat{connected ? "" : " (connecting…)"}</span>
                        <button onClick={() => setIsOpen(false)}>✖</button>
                    </div>

                    <div className="p-3 h-64 overflow-y-auto">
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
