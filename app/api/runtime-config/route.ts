import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getSocketUrl(): string {
    return (
        process.env.API_URL ||
        process.env.NEXT_PUBLIC_SOCKET_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        ""
    ).replace(/\/$/, "");
}

export async function GET() {
    const socketUrl = getSocketUrl();
    if (!socketUrl) {
        return NextResponse.json(
            { error: "API_URL is not configured on the server." },
            { status: 500 }
        );
    }
    return NextResponse.json({ socketUrl });
}
