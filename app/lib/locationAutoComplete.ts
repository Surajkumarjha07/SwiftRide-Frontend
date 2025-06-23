import debounce from "./debounce";
import axios from "axios";

const locationAutoComplete = debounce(async (destination: string, callback: (data: any) => void) => {
    try {
        const response = await axios.get(
            `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATION_IQ}&q=${destination}&limit=5&dedupe=1`
        );

        callback(response.data);

    } catch (error) {
        console.error("Error in auto completing location: " + (error as Error).message);
    }
}, 1500)

export default locationAutoComplete;
