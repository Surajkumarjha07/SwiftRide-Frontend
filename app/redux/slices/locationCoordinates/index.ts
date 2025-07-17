import coords from "@/app/types/coordinates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    locationCoordinates: <coords>{},
    destinationCoordinates: <coords>{}
}

export const LocationSlice = createSlice({
    initialState,
    name: "LocationCoordinates",
    reducers: {
        setLocationCoordinates: (state, action: PayloadAction<coords>) => {
            state.locationCoordinates = action.payload;
        },

        setDestinationCoordinates: (state, action: PayloadAction<coords>) => {
            state.destinationCoordinates = action.payload;
        }
    }
})

export const { setLocationCoordinates, setDestinationCoordinates } = LocationSlice.actions;
export default LocationSlice.reducer;