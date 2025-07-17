import axios from "axios";
import coords from "../types/coordinates";

async function getCurrentLocation(coordinates: coords): Promise<string> {
    let location: string = "";

    if (Object.keys(coordinates).length !== 0) {
        const locationResponse = await axios.get(`https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATION_IQ}&lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json&`)

        const locationBody = locationResponse.data.address;

        location = (locationBody.road ?? "") + (locationBody.road ? ", " : "") + (locationBody.suburb ?? "") + (locationBody.suburb ? ", " : "") + (locationBody.neighbourhood ?? "") + (locationBody.neighbourhood ? ", " : "") + (locationBody.city ?? "") + (locationBody.city ? ", " : "") + (locationBody.state ?? "") + (locationBody.state ? ", " : "") + (locationBody.postcode ?? "");
    }

    return location;
}

export default getCurrentLocation;