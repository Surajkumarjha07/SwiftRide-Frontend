import axios from "axios";

async function completeRide(rideId: string, cookie: string) {
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
                withCredentials: true,
                validateStatus: status => true
            }
        );

        return response;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default completeRide;