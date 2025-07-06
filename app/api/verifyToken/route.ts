import { NextRequest, NextResponse } from 'next/server';
import { UserPayload } from '@/app/types/payloads';
import { jwtDecode } from 'jwt-decode';
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('authToken')?.value || req.headers.get("authorization")?.split("Bearer ")[1];

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized! token not available' }, { status: 401 });
        }

        const decoded = jwtDecode(token) as UserPayload | null;

        if (!decoded) {
            return NextResponse.json({ message: 'token not valid!' }, { status: 404 });
        }

        const SECRET_KEY = decoded.role === "user" ? process.env.USER_JWT_SECRET : process.env.CAPTAIN_JWT_SECRET

        const verified = jwt.verify(token, SECRET_KEY!);

        if (!verified) {
            return NextResponse.json({ message: 'User not verified!' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Authorized', user: decoded });

    } catch (err) {
        return NextResponse.json({ message: 'Error in validating token!' }, { status: 403 });
    }
}
