import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { setIsProfileOpen } from '../redux/slices/profile';
import Cookies from "js-cookie";
import { setRole, setUserEmail, setUserName } from '../redux/slices/userCredentials';

export default function AccountCentre() {
    const isProfileOpen = useAppSelector(state => state.Profile.isProfileOpen);
    const dispatch = useAppDispatch();
    const userName = useAppSelector(state => state.User.userName);
    const userEmail = useAppSelector(state => state.User.userEmail);
    const role = useAppSelector(state => state.User.role);

    useEffect(() => {
        const fetchedCookie = Cookies.get("authtoken");

        if (fetchedCookie) {
            try {
                const payload = JSON.parse(atob(fetchedCookie.split(".")[1]));
                if (payload.role === "user") {
                    dispatch(setUserEmail(payload.userEmail));
                    dispatch(setUserName(payload.userName));
                }

                else {
                    dispatch(setUserEmail(payload.captainEmail));
                    dispatch(setUserName(payload.captainName));
                }

                dispatch(setRole(payload.role));
            } catch (error) {
                console.error("Error parsing the cookie: ", error);
            }
        }

    }, [])


    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.section
                    key={isProfileOpen.toString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}

                    className={`${isProfileOpen ? "visible" : "hidden"} bg-white absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[360px] max-w-full px-6 py-10 rounded-3xl shadow-2xl border border-gray-200 account-centre`}>
                    <h1 className='text-gray-900 font-semibold text-2xl text-center'>
                        Account Centre
                    </h1>

                    <div className='w-20 h-20 rounded-full bg-gradient-to-tr from-red-400 to-red-600 flex justify-center items-center mx-auto my-5 text-white text-2xl font-bold shadow-md'>
                        {userName.charAt(0).toUpperCase()}
                    </div>

                    <div className='mb-5 flex flex-col items-center gap-3'>
                        <p className='text-center text-gray-900 font-semibold text-xl'> Hi, {userName.charAt(0).toUpperCase() + userName.slice(1)} </p>
                        <Link href={"/manage-account"} onClick={() => dispatch(setIsProfileOpen(false))}>
                            <button className='text-blue-500 border-2 border-blue-500 rounded-full px-4 py-2 text-sm font-medium text-center cursor-pointer'>
                                Manage your SwiftRide Account
                            </button>
                        </Link>
                    </div>

                    <div className='bg-gray-100 rounded-xl divide-y divide-gray-300'>
                        <div className='flex justify-between items-center px-5 py-4 text-gray-800 text-sm font-medium'>
                            <span>Email</span>
                            <span className='text-right'> {userEmail} </span>
                        </div>

                        <div className='flex justify-between items-center px-5 py-4 text-gray-800 text-sm font-medium'>
                            <span>Name</span>
                            <span className='text-right'> {userName.charAt(0).toUpperCase() + userName.slice(1)} </span>
                        </div>

                        <div className='flex justify-between items-center px-5 py-4 text-gray-800 text-sm font-medium'>
                            <span>Role</span>
                            <span className='text-right'> {role.charAt(0).toUpperCase() + role.slice(1)} </span>
                        </div>

                    </div>

                </motion.section>
            </AnimatePresence>
        </>
    );
}
