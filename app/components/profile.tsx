import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setIsProfileOpen } from '../redux/slices/profile';
import Cookies from 'js-cookie';
import { setUserEmail, setUserName } from '../redux/slices/userCredentials';
import { jwtDecode } from 'jwt-decode';

export default function Profile() {
    const dispatch = useAppDispatch();
    const userName = useAppSelector(state => state.User.userName);

    useEffect(() => {
        const fetchedCookie = Cookies.get("authtoken");

        if (fetchedCookie) {
            try {
                const payload: any = jwtDecode(fetchedCookie);
                if (payload.role === "user") {
                    dispatch(setUserEmail(payload.userEmail));
                    dispatch(setUserName(payload.userName));
                }

                else {
                    dispatch(setUserEmail(payload.captainEmail));
                    dispatch(setUserName(payload.captainName));
                }
            } catch (error) {
                console.error("Error parsing the cookie: ", error);
            }
        }

    }, [])

    return (
        <section className="absolute top-3 right-5 z-30 bg-white shadow-lg rounded-2xl px-6 py-4 w-fit flex gap-4 items-center">

            <div className="profile w-14 h-14 rounded-full bg-gradient-to-tr from-red-400 to-red-600 flex items-center justify-center text-white font-semibold text-xl cursor-pointer" onClick={() => dispatch(setIsProfileOpen(true))}>
                <p className='pointer-events-none'>
                    {
                        userName?.charAt(0).toUpperCase()
                    }
                </p>
            </div>

        </section>
    );
}
