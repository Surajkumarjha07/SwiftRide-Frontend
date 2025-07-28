import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setShowCancelRideModal } from '../redux/slices/rideOptions';
import cancelRide from '../services/cancelRide.service';

export default function CancelRideModal() {
    const cookie = useAppSelector(state => state.Cookie.cookie);
    const dispatch = useAppDispatch();

    const handleCancelRide = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            const response = await cancelRide(cookie);

            if (response.status === 200) {
                toast.success("Ride Cancelled!", {
                    type: "success",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                });

                dispatch(setShowCancelRideModal(false));
            }

        } catch (error) {
            toast.error("Internal server error!", {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            })
        }
    }

    return (
        <>
            <section className='bg-white/90 rounded-xl px-4 py-2 flex flex-col justify-center items-center gap-4'>
                <p className='text-sm text-gray-700 font-semibold text-center'>
                    You can cancel your ride till 5 minutes
                    <br />
                    <span>
                        after ride confirmed
                    </span>
                </p>

                <button className='bg-red-500 px-4 py-2 text-white rounded-md text-sm cursor-pointer' onClick={handleCancelRide}>
                    Cancel Ride
                </button>
            </section>
        </>
    )
}
