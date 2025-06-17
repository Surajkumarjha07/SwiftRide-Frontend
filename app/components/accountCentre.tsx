import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { motion, AnimatePresence } from "framer-motion";

export default function AccountCentre() {
    const isProfileOpen = useAppSelector(state => state.Profile.isProfileOpen);

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
                        Y
                    </div>

                    <div className='mb-5'>
                        <p className='text-center text-gray-900 font-semibold text-xl'> Hi, Yash Kumar </p>
                        <p className='text-gray-800 font-medium mt-1 text-center'>
                            Manage your SwiftRide Account
                        </p>
                    </div>

                    <div className='bg-gray-100 rounded-xl divide-y divide-gray-300'>
                        <div className='flex justify-between items-center px-5 py-4 text-gray-800 text-sm font-medium'>
                            <span>Email</span>
                            <span className='text-right'>your@example.com</span>
                        </div>

                        <div className='flex justify-between items-center px-5 py-4 text-gray-800 text-sm font-medium'>
                            <span>Name</span>
                            <span className='text-right'>Your Name</span>
                        </div>

                        <div className='flex justify-between items-center px-5 py-4 text-gray-800 text-sm font-medium'>
                            <span>Role</span>
                            <span className='capitalize text-right'>rider</span>
                        </div>
                    </div>

                    <div className='flex justify-between gap-4 mt-8'>
                        <button className='flex-1 bg-gray-900 hover:bg-gray-800 transition-colors px-4 py-3 text-white text-sm font-semibold rounded-lg cursor-pointer'>
                            Update
                        </button>
                        <button className='flex-1 bg-red-600 hover:bg-red-500 transition-colors px-4 py-3 text-white text-sm font-semibold rounded-lg cursor-pointer'>
                            Delete
                        </button>
                    </div>
                </motion.section>
            </AnimatePresence>
        </>
    );
}
