import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { AnimatePresence, motion } from 'framer-motion';

export default function BlackScreen() {
    const isProfileOpen = useAppSelector(state => state.Profile.isProfileOpen);
    const showFare = useAppSelector(state => state.Fare.showFare);
    const isVerifyVehicleOpen = useAppSelector(state => state.Vehicle.isVerifyVehicleOpen);
    const showAcceptRideModal = useAppSelector(state => state.RideOptions.showAcceptRideModal);
    const showPaymentsModal = useAppSelector(state => state.Payments.showPaymentsModal);

    return (
        <>
            <AnimatePresence>
                <motion.section
                    key={(isProfileOpen.toString() || showFare.toString() || isVerifyVehicleOpen.toString() || showAcceptRideModal.toString() || showPaymentsModal.toString())}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}

                    className={`${(isProfileOpen || showFare || isVerifyVehicleOpen || showAcceptRideModal) ? "visible" : "hidden"} absolute top-0 right-0 left-0 bottom-0 w-screen h-screen bg-gray-900/30 z-40 backdrop-blur-xs`} />

            </AnimatePresence>
        </>
    )
}
