import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { AnimatePresence, motion } from "framer-motion";
import RideTag from './rideTag';
import rideType from '../types/rideTag';

export default function RidesList({ rides }: { rides: rideType[] }) {
    const showRidesList = useAppSelector(state => state.RidesList.showRidesList);

    return (
        <>
            {
                <AnimatePresence mode='wait'>
                    {
                        showRidesList && (
                            <motion.div
                                key={showRidesList.toString()}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className={`p-1 rounded-xl ridesList ${showRidesList ? "bg-gray-900/10 backdrop-blur-sm" : ""}`}>

                                <div className='bg-white w-80 max-h-96 rounded-xl flex flex-col'>
                                    <div className='px-3 py-4 border-b-2 border-b-gray-500 flex-1'>
                                        <h1 className='text-gray-900 font-semibold text-xl'>
                                            Ride requests
                                        </h1>
                                    </div>

                                    <div className='space-y-3 px-2 py-3 overflow-y-scroll flex-1'>
                                        {
                                            rides.length > 0 ?
                                                rides.map((ride, index) => (
                                                    <RideTag key={index} ride={ride} />
                                                ))
                                                :
                                                <p className='text-lg text-center font-semibold text-gray-600 my-auto'>
                                                    No rides available at the moment
                                                </p>
                                        }
                                    </div>
                                </div>

                            </motion.div>
                        )
                    }
                </AnimatePresence>
            }
        </>
    )
}
