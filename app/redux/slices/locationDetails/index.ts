import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    location: "",
    destination: ""
}

export const LocationSlice = createSlice({
    initialState,
    name: "LocationDetails",
    reducers: {
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },

        setDestination: (state, action: PayloadAction<string>) => {
            state.destination = action.payload;
        }
    }
})

export const { setLocation, setDestination } = LocationSlice.actions;
export default LocationSlice.reducer;