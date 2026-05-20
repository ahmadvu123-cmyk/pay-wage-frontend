import { serialize } from "v8";
import api from "../config/axios";

export const getPayrolls = async (page: number, limit: number, search: any) => {
    try {
        const params: any = {
            page,
            limit
        }
        if(search){
            params.search = search
        }
        const response = await api.get(`/payroll`,{
            params
        });
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to fetch payrolls';
        const status = error.response?.status || 500;
        throw {
            status,
            message
        }
    }
}