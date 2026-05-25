import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_PATHS = ["/worker", "/attendance", "/payroll"];

function getApiOrigin(): string | undefined {
    const url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!url) return undefined;
    return url.replace(/\/$/, "");
}

export function middleware(request: NextRequest) {
    const apiOrigin = getApiOrigin();
    if (!apiOrigin) {
        return NextResponse.next();
    }

    const { pathname, search } = request.nextUrl;
    if (!API_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
        return NextResponse.next();
    }

    return NextResponse.rewrite(new URL(`${pathname}${search}`, apiOrigin));
}

export const config = {
    matcher: ["/worker/:path*", "/attendance/:path*", "/payroll/:path*"],
};
