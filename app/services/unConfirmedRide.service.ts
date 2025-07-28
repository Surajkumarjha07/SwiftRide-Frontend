import axios from "axios";

async function unConfirmedRide(cookie: string) {
    try {
        const response = await axios.post("http://localhost:4000/user/rides/process-unconfirmed-ride", {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`
                },
                withCredentials: true
            }
        )

        return response;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default unConfirmedRide;