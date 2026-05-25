export type PayWageRuntimeConfig = {
    socketUrl: string;
};

declare global {
    interface Window {
        __PAY_WAGE_RUNTIME__?: PayWageRuntimeConfig;
    }
}

function getServerSocketUrl(): string {
    return (
        process.env.API_URL ||
        process.env.NEXT_PUBLIC_SOCKET_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        ""
    ).replace(/\/$/, "");
}

let configPromise: Promise<PayWageRuntimeConfig> | null = null;

/** Loads backend URL at request time (works on Railway with runtime API_URL). */
export async function loadRuntimeConfig(): Promise<PayWageRuntimeConfig> {
    if (typeof window === "undefined") {
        return { socketUrl: getServerSocketUrl() };
    }

    if (window.__PAY_WAGE_RUNTIME__?.socketUrl) {
        return window.__PAY_WAGE_RUNTIME__;
    }

    if (!configPromise) {
        configPromise = fetch("/api/runtime-config", { cache: "no-store" })
            .then(async (res) => {
                if (!res.ok) {
                    const body = await res.json().catch(() => ({}));
                    throw new Error(
                        (body as { error?: string }).error ||
                            "Failed to load runtime config"
                    );
                }
                return res.json() as Promise<PayWageRuntimeConfig>;
            })
            .then((cfg) => {
                window.__PAY_WAGE_RUNTIME__ = cfg;
                return cfg;
            });
    }

    return configPromise;
}

export function getRuntimeSocketUrl(): string {
    if (typeof window !== "undefined" && window.__PAY_WAGE_RUNTIME__?.socketUrl) {
        return window.__PAY_WAGE_RUNTIME__.socketUrl;
    }
    return getServerSocketUrl();
}
