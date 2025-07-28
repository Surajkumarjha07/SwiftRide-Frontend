import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useAppSelector } from '../redux/hooks'
import Link from 'next/link';

export default function VerifyVehicleModal() {
    const isVerifyVehicleOpen = useAppSelector(state => state.Vehicle.isVerifyVehicleOpen);
    const userName = useAppSelector(state => state.User.userName);

    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.section
                    key={isVerifyVehicleOpen.toString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}

                    className={`${isVerifyVehicleOpen ? "visible" : "hidden"} bg-white absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-fit max-w-full px-6 py-8 rounded-3xl shadow-2xl border border-gray-200 account-centre`}>
                    <h1 className='text-gray-900 font-semibold text-2xl text-center'>
                        Vehicle Verification
                    </h1>

                    <div className='w-20 h-20 rounded-full bg-gradient-to-tr from-red-400 to-red-600 flex justify-center items-center mx-auto my-5 text-white text-2xl font-bold shadow-md'>
                        {userName.charAt(0).toUpperCase()}
                    </div>

                    <div className='flex flex-col items-center gap-8'>
                        <p className='text-center text-gray-900 font-semibold text-xl'> Hi, {userName.charAt(0).toUpperCase() + userName.slice(1)} </p>

                        <div className='flex flex-col items-center justify-center gap-2 bg-red-50 border-2 border-red-300 rounded-xl px-6 py-2'>
                            <p className='text-red-500 font-semibold text-base'>
                                Vehicle Not Verified!
                            </p>

                            <p className='text-center text-red-500 font-normal text-sm'>
                                Rides cannot be accepted until the
                                <br />
                                vehicle is verified
                            </p>
                        </div>

                        <Link href={"/vehicle-verification"}>
                            <button className='text-blue-500 border-2 border-blue-500 rounded-full px-4 py-2 text-sm font-medium text-center cursor-pointer'>
                                Verify Your Vehicle
                            </button>
                        </Link>
                    </div>

                </motion.section>
            </AnimatePresence>
        </>
    )
}
