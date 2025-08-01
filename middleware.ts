import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("authToken")?.value || null;
    const pathname = request.nextUrl.pathname;

    const publicURLs = ["/", "/logIn", "/signUp"];
    const isPublicURL = publicURLs.includes(pathname);

    if (!token && !isPublicURL) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && isPublicURL) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/logIn", "/signUp", "/home", "/manage-account", "/vehicle-verification"]
}