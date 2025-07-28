import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import loadRazorpayScript from '../lib/razorpayScript';
import { setShowPaymentsModal } from '../redux/slices/payments';
import { setShowCancelRideModal } from '../redux/slices/rideOptions';
import createPaymentOrder from '../services/createPaymentOrder.service';
import paymentDone from '../services/payment.service';

const RideDetail = ({ label, value }: { label: string, value?: string }) => (
    <div className="flex justify-between items-start gap-8 text-gray-800 text-sm font-medium bg-gray-100 rounded-lg px-4 py-3">
        <p>{label}</p>
        <p className="text-right max-w-48 text-gray-600 italic text-wrap break-words"> {value} </p>
    </div>
);

declare global {
    interface Window {
        Razorpay: any
    }
}

export default function PaymentModal() {
    const showPaymentsModal = useAppSelector(state => state.Payments.showPaymentsModal);
    const rideData: any = useAppSelector(state => state.Rides.rideData);
    const cookie = useAppSelector(state => state.Cookie.cookie);
    const userId = useAppSelector(state => state.User.userId);
    const dispatch = useAppDispatch();

    const payNow = async (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("rideData: ", rideData);

        try {
            const data = await createPaymentOrder(rideData, cookie);

            console.log("payment response: ", data);

            const razorpay_key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            const options = {
                key: razorpay_key_id,
                amount: data.razorpay_order.amount,
                currency: data.razorpay_order.currency,
                name: 'SwiftRide.corp',
                description: 'Test Transaction',
                order_id: data.razorpay_order.id,
                prefill: {
                    userId: userId,
                },
                theme: {
                    color: '#F37254'
                },

                handler: async function (response: any) {
                    const payment_id = response.razorpay_payment_id;
                    const signature = response.razorpay_signature;
                    const order = data.order;

                    const res = await paymentDone(rideData, data, payment_id, order, cookie);

                    if (res.status === 200) {
                        dispatch(setShowPaymentsModal(false));
                        dispatch(setShowCancelRideModal(false));
                        toast.success("Payment successful!", {
                            type: "success",
                            hideProgressBar: true,
                            autoClose: 1500,
                            position: "top-center"
                        });
                    }

                    else {
                        alert("Error in initiating payment!");
                        throw new Error(`Error in initiating payment!`);
                    }
                },
            }

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            alert('payment server error!');
            throw new Error(`Payment server error: ${(error as Error).message}`);
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
                                    <RideDetail label='Ride ID' value={rideData?.rideId} />
                                    <RideDetail label='Pick Up Location' value={rideData?.pickUpLocation} />
                                    <RideDetail label='Destination' value={rideData.destination} />
                                </>
                            )
                        }
                    </div>

                    <div className="flex justify-between gap-4">
                        <button className="w-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium py-2 rounded-xl cursor-pointer" onClick={payNow}>
                            Payment Gateway
                        </button>
                    </div>

                </motion.section>
            </AnimatePresence>
        </>
    )
}
