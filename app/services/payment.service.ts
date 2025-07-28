import axios from "axios";

async function paymentDone(rideData: any, data: any, payment_id: string, order: string, cookie: string) {
    try {
        const res = await axios.post("http://localhost:4000/user/rides/payment",
            {
                fare: rideData.fare,
                payment_id,
                orderId: data.razorpay_order.id,
                order,
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
        );

        return res;

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default paymentDone;