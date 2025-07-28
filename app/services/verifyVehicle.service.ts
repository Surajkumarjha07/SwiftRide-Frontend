import axios from "axios";

async function verifyVehicle(vehicle: string, vehicleNo: string, cookie: string) {
    try {
        const response = await axios.post("http://localhost:4000/captain/actions/verify-vehicle", {
            vehicle,
            vehicleNo
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookie}`
                },
                withCredentials: true,
                validateStatus: status => true
            },
        );

        return response;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default verifyVehicle;