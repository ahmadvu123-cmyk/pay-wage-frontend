import { getSocket } from "@/src/config/socket";

export const getUserPromptResponse = async (prompt: string) => {
    try {
        getSocket().emit('message', prompt);
    } catch (error: any) {
        const message = 'Failed to fetch chatbot response';
        const status = error.response?.status || 500;
        throw {
            message
        }
    }
}