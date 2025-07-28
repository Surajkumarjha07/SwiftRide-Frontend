import axios, { AxiosResponse } from "axios";
import loadRazorpayScript from "../lib/razorpayScript";

async function createPaymentOrder(rideData: any, cookie: string) {
    try {
        const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razropay failed to load!!')
            return;
        }

        const data = await axios.post("http://localhost:4000/payment/orders/create-order",
            {
                fare: rideData.fare,
                rideId: rideData.rideId,
                captainId: rideData.captainId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`
                },
                withCredentials: true,
                validateStatus: status => true
            }
        )
            .then((response: AxiosResponse) => response.data);


        return data;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default createPaymentOrder;