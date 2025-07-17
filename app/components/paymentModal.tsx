import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import loadRazorpayScript from '../lib/razorpayScript';
import { setShowPaymentsModal } from '../redux/slices/payments';
import { setShowCancelRideModal } from '../redux/slices/rideOptions';

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
            const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!res) {
                alert('Razropay failed to load!!')
                return
            }

            const data = await axios.post("http://localhost:4000/payment/orders/create-order",
                {
                    fare: rideData.fare,
                    userId,
                    rideId: rideData.rideId,
                    captainId: rideData.captainId
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
                .then((response: AxiosResponse) => response.data);

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

                    const res = await fetch('http://localhost:4000/user/rides/payment', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ fare: rideData.fare, payment_id, orderId: data.razorpay_order.id, order, userId, rideId: rideData.rideId, captainId: rideData.captainId })
                    });

                    if (!res.ok) {
                        alert("Error in initiating payment!");
                        throw new Error(`Error in initiating payment!`);
                    }
                    
                    else {
                        dispatch(setShowPaymentsModal(false));
                        dispatch(setShowCancelRideModal(false));
                        alert("Payment successful!");
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
                                    <RideDetail label='Ride ID' value={'djhdjhfjdkkkkkkk464_dfkjkd8789'} />
                                    <RideDetail label='Pick Up Location' value={'Dabua colony, faridabd, haryana'} />
                                    <RideDetail label='Destination' value={'mumbai, daraganj road, navi mumbai, maharashtra'} />
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
