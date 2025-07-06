import rideType from "@/app/types/rideTag";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    rideId: "",
    rideData: {},
    rides: <rideType[]>[],
    ridesMap: {} as Record<string, Object>
}

export const RidesSlice = createSlice({
    initialState,
    name: "Rides",
    reducers: {
        setRideId: (state, action: PayloadAction<string>) => {
            state.rideId = action.payload;
        },

        setRideData : (state, action: PayloadAction<{}>) => {
            state.rideData = action.payload;
        },

        setRides: (state, action: PayloadAction<rideType>) => {
            state.rides.push(action.payload);
        },

        setRidesMap: (state, action: PayloadAction<{ rideId: string, rideData: Object }>) => {
            state.ridesMap[action.payload.rideId] = action.payload.rideData;
        }
    }
})

export const { setRideId, setRideData, setRides, setRidesMap } = RidesSlice.actions;
export default RidesSlice.reducer;