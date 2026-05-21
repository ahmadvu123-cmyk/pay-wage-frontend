import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
})
api.interceptors.request.use((config) => {
    // Used for Request Modification, Attaching Tokens, Add Headers Runs Before every request is send
    return config;
})

api.interceptors.response.use((response) => response,
    (error) => {
        console.log('API Error', error);
        return Promise.reject(error);
    })

export default api