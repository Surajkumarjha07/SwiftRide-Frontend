import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { toast } from 'react-toastify';

const RideDetail = ({ label, value }: { label: string, value?: string }) => (
    <div className="flex justify-between items-start gap-8 text-gray-800 text-sm font-medium bg-gray-100 rounded-lg px-4 py-3">
        <p>{label}</p>
        <p className="text-right max-w-48 text-gray-600 italic text-wrap break-words"> {value} </p>
    </div>
);

export default function PaymentModal() {
    const showPaymentsModal = useAppSelector(state => state.Payments.showPaymentsModal);
    const rideData: any = useAppSelector(state => state.Rides.rideData);

    const payment = (e: React.MouseEvent) => {
        e.preventDefault();

        try {

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
                    key={showPaymentsModal.toString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}

                    className={`${showPaymentsModal ? "visible" : "hidden"} bg-white absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-fit max-w-full px-6 py-7 rounded-3xl shadow-2xl border border-gray-200`}>

                    <h1 className='text-gray-900 font-semibold text-2xl text-center mb-6'>
                        Payments
                    </h1>

                    <div className='space-y-3 mb-6'>
                        {
                            rideData && (
                                <>
                                    <RideDetail label='Ride ID' value={'djhdjhfjdkkkkkkk464_dfkjkd8789'} />
                                    <RideDetail label='Pick Up Location' value={'Dabua colony, faridabd, haryana'} />
                                    <RideDetail label='Destination' value={'mumbai, daraganj road, navi mumbai, maharashtra'} />
                                </>
                            )
                        }
                    </div>

                    <div className="flex justify-between gap-4">
                        <button className="w-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium py-2 rounded-xl cursor-pointer" >
                            Payment Gateway
                        </button>
                    </div>

                </motion.section>
            </AnimatePresence>
        </>
    )
}
