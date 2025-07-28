import axios from "axios";

async function findRide(location: string, destination: string, cookie: string) {
    try {
        const response = await axios.post(`http://localhost:4000/user/rides/ride-request`, {
            location,
            destination
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

export default findRide;