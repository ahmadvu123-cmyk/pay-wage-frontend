"use client";

import { socket } from "@/config/socket";
import { useState, useEffect } from "react";

export default function ChatBot() {
    const [message, setMessage] = useState("Hi");
    const [messages, setMessages] = useState<{ user: string, text: string }[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        socket.on('message', (data) => {
            console.log('Message:', data);
            setMessages((prev) => [...prev, data]);
        })
        return () => {
            socket.off('message')
        }
    }, [])

    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit('message', message);
        setMessages((prev) => [
            ...prev,
            {
                user: "Me",
                text: message
            },
        ]);
        setMessage("");
    }
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
                        <span>Live Chat</span>
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
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-3 ml-2"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );

}
