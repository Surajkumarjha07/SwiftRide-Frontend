import axios from "axios";

async function trackLocation(role: string, latitude: number, longitude: number, cookie: string) {
    try {
        const url: string = role === "user"
            ? "http://localhost:4000/location-update/user"
            : "http://localhost:4000/location-update/captain";

        let response;

        if (cookie && latitude && longitude && typeof latitude === "number" && typeof longitude === "number") {
            response = await axios.post(url,
                {
                    coordinates: {
                        latitude: latitude.toFixed(3),
                        longitude: longitude.toFixed(3)
                    }
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
        };

        return response;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default trackLocation;