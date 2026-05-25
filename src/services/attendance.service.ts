import api from "../config/axios";

export const getAttendances = async (start?: string, end?: string, page?: number, limit?: number, search?: string) => {
    try {
        const params: any = {
            page,
            limit
        }
        if (search) params.search = search;
        if (start) {
            params.start_date = new Date(new Date(start).setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())).toISOString();
        }
        if (end) {
            params.end_date = new Date(new Date(end).setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())).toISOString();
        }

        const response = await api.get(`/attendance`,
            { params }
        );
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to fetch attendances';
        const status = error.response?.status || 500;
        throw {
            status,
            message
        }
    }
}