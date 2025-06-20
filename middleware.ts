import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("authToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/logIn", request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/home", "/manage-account"]
}