import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setIsProfileOpen } from '../redux/slices/profile';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import logOutUser from '../services/logOut.service';

export default function Profile() {
    const dispatch = useAppDispatch();
    const userName = useAppSelector(state => state.User.userName);
    const userEmail = useAppSelector(state => state.User.userEmail);
    const role = useAppSelector(state => state.User.role);
    const cookie = useAppSelector(state => state.Cookie.cookie);
    const router = useRouter();

    async function signOut(e: React.MouseEvent) {
        e.preventDefault();

        if (!role || !cookie) {
            throw new Error("Missing authentication details");
        }

        try {
            const response = await logOutUser(role, cookie);

            if (response.status === 200) {
                Cookies.remove("authtoken");
                router.push("./logIn");
            }

        } catch (error) {
            toast.error((error as Error).message, {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            })
        }

    }

    return (
        <section className="z-30 bg-white shadow-lg rounded-xl px-6 py-4 w-fit flex justify-center items-center gap-4">

            <div className="profile w-16 h-16 rounded-full bg-gradient-to-tr from-gray-400 to-gray-800 flex items-center justify-center text-white font-semibold text-xl cursor-pointer" onClick={() => dispatch(setIsProfileOpen(true))}>
                <p className='pointer-events-none text-2xl'>
                    {
                        userName?.charAt(0).toUpperCase()
                    }
                </p>
            </div>

            <div className='flex flex-col justify-center items-start gap-2'>
                <div className='-space-y-0.5'>
                    <p className='text-[1.1rem] font-semibold'> {userName} </p>
                    <p className='text-sm font-medium text-gray-600'> {userEmail} </p>
                </div>

                <button className='text-blue-500 text-sm cursor-pointer font-semibold' onClick={e => signOut(e)}>
                    Sign Out
                </button>
            </div>

        </section>
    );
}
