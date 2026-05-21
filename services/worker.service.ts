import api from "@/config/axios";

export const getWorkers = async (page: number, limit: number, search: string) => {
    try {
        const response = await api.get(`/worker`,
            {
                params: {
                    page,
                    limit,
                    search
                }
            }
        );
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to fetch workers';
        const status = error.response?.status || 500;
        throw {
            status,
            message
        }
    }
}