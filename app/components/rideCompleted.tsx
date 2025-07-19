import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/hooks';

export default function CompleteRideModal() {
    const cookie = useAppSelector(state => state.Cookie.cookie);
    const rideId = useAppSelector(state => state.Rides.rideId);

    const completeRide = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/captain/rides/rideCompleted",
                {
                    rideId
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookie}`
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                toast.success("Ride completed!", {
                    type: "success",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                });
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
                    Complete the ride when you reach
                    <br />
                    <span>
                        your destination to get payment
                    </span>
                </p>

                <button className='bg-green-600 px-4 py-2 text-white rounded-md text-sm cursor-pointer' onClick={completeRide}>
                    Complete Ride
                </button>
            </section>
        </>
    )
}
