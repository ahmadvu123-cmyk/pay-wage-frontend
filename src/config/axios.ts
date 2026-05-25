import axios from "axios";

/** Browser calls same-origin paths; middleware proxies to API_URL / NEXT_PUBLIC_API_URL. */
function getBaseURL(): string {
    if (typeof window !== "undefined") {
        return "";
    }
    const url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    return url?.replace(/\/$/, "") ?? "";
}

const api = axios.create({
    baseURL: getBaseURL(),
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