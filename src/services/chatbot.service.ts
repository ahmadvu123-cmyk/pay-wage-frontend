import { connectSocket } from "@/src/config/socket";

export const getUserPromptResponse = async (prompt: string) => {
    try {
        const socket = await connectSocket();
        socket.emit('message', prompt);
    } catch (error: any) {
        const message = 'Failed to fetch chatbot response';
        const status = error.response?.status || 500;
        throw {
            message
        }
    }
}