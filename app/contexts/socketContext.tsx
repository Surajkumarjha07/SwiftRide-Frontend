"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const token = Cookies.get("authtoken");

        let payload: any;
        let role: string = "";

        if (token) {
            payload = jwtDecode(token);
        }

        if (payload) {
            role = payload.role;
        }

        const socket = io("http://localhost:4000", {
            secure: true,
            auth: { token, role },
            withCredentials: true,
        });
        setSocket(socket);

        socket.on("connect", () => {
            console.log("user connected: ", socket.id);
        });

        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )

}

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}