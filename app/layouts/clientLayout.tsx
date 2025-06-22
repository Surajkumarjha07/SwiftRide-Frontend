"use client"
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { SocketProvider } from "../contexts/socketContext";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <Provider store={store}>
                <SocketProvider>
                    <ToastContainer />
                    {
                        children
                    }
                </SocketProvider>
            </Provider>
        </>

    )
}