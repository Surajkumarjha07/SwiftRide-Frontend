import axios from "axios";
import coord from "../types/coordinates";

async function getLocationDetails(location: coord): Promise<{}> {
    const locationResponse = await axios.get(`https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATION_IQ}&lat=${location.latitude}&lon=${location.longitude}&format=json&`)

    return locationResponse.data.address;
}

export default getLocationDetails;