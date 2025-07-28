import axios from "axios";

async function confirmRide(vehicle: string, price: number, cookie: string) {
    try {
        const response = await axios.post('http://localhost:4000/user/rides/confirm-ride', {
            vehicle,
            fare: price
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

        return response;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default confirmRide;