export default function RuntimeConfig() {
    const socketUrl = (
        process.env.API_URL ||
        process.env.NEXT_PUBLIC_SOCKET_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        ""
    ).replace(/\/$/, "");

    if (!socketUrl) {
        return null;
    }

    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `window.__PAY_WAGE_RUNTIME__=${JSON.stringify({ socketUrl })}`,
            }}
        />
    );
}
