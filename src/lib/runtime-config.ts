export type PayWageRuntimeConfig = {
    socketUrl: string;
};

declare global {
    interface Window {
        __PAY_WAGE_RUNTIME__?: PayWageRuntimeConfig;
    }
}

export function getRuntimeSocketUrl(): string {
    if (typeof window !== "undefined" && window.__PAY_WAGE_RUNTIME__?.socketUrl) {
        return window.__PAY_WAGE_RUNTIME__.socketUrl;
    }
    const url = process.env.API_URL || process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL;
    return url?.replace(/\/$/, "") ?? "";
}
