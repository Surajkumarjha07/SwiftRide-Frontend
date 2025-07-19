import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowAcceptRideModal, setShowCompleteRideModal, setShowRidesBadge } from '../redux/slices/rideOptions';
import { toast } from 'react-toastify';
import axios from 'axios';
import { clearRides, deleteRide } from '../redux/slices/rides';
import { setShowRidesList } from '../redux/slices/ridesList';

const RideDetail = ({ label, value }: { label: string, value?: string }) => (
    <div className="flex justify-between items-start gap-8 text-gray-800 text-sm font-medium bg-gray-100 rounded-lg px-4 py-3">
        <p>{label}</p>
        <p className="text-right max-w-48 text-gray-600 italic text-wrap break-words"> {value} </p>
    </div>
);

export default function AcceptRideModal() {
    const showAcceptRideModal = useAppSelector(state => state.RideOptions.showAcceptRideModal);
    const dispatch = useAppDispatch();
    const rideData: any = useAppSelector(state => state.Rides.rideData);
    const cookie: string = useAppSelector(state => state.Cookie.cookie);
    const rideId: string = useAppSelector(state => state.Rides.rideId);
    const vehicle: string = useAppSelector(state => state.User.vehicleType);
    const vehicle_number: string = useAppSelector(state => state.User.vehicleNo)

    const rideAcceptHandler = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/captain/rides/acceptRide", {
                rideId,
                vehicle,
                vehicle_number
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`
                },
                withCredentials: true,
                validateStatus: (status) => true
            });

            console.log("res: ", response);


            if (response.status === 200) {
                toast.success("Ride Accepted!", {
                    type: "success",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                });

                dispatch(setShowAcceptRideModal(false));
                dispatch(setShowCompleteRideModal(true));
                dispatch(clearRides());
                dispatch(setShowRidesBadge(false));
            }

            if (response.status === 410) {
                dispatch(deleteRide(rideId));
                dispatch(setShowAcceptRideModal(false));
                toast.error("Ride expired! Try another", {
                    type: "error",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                });
            }

        } catch (error) {
            toast.error("Internal server error", {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            })
        }
    }

    const handleRejectRide = (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            dispatch(setShowAcceptRideModal(false));
            dispatch(deleteRide(rideId));

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
            <AnimatePresence mode='wait'>
                <motion.section
                    key={showAcceptRideModal.toString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}

                    className={`${showAcceptRideModal ? "visible" : "hidden"} bg-white absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-fit max-w-full px-6 py-7 rounded-3xl shadow-2xl border border-gray-200`}>

                    <h1 className='text-gray-900 font-semibold text-2xl text-center mb-6'>
                        Accept Ride
                    </h1>

                    <div className='space-y-3 mb-6'>

                        {
                            rideData && (
                                <>
                                    <RideDetail label='Ride ID' value={rideData?.rideId} />
                                    <RideDetail label='Pick Up Location' value={rideData?.pickUpLocation} />
                                    <RideDetail label='Destination' value={rideData?.destination} />
                                </>
                            )
                        }

                    </div>

                    <div className="flex justify-between gap-4">
                        <button className="w-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium py-2 rounded-full cursor-pointer" onClick={e => rideAcceptHandler(e)}>
                            Accept
                        </button>

                        <button className="w-full text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 font-medium py-2 rounded-full cursor-pointer" onClick={e => handleRejectRide(e)}>
                            Reject
                        </button>
                    </div>

                </motion.section>
            </AnimatePresence>
        </>
    )
}

