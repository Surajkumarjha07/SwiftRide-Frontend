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

        setRideData: (state, action: PayloadAction<{}>) => {
            state.rideData = action.payload;
        },

        addRide: (state, action: PayloadAction<rideType>) => {
            state.rides.push(action.payload);
        },

        deleteRide: (state, action: PayloadAction<string>) => {
            state.rides = state.rides.filter(ride => ride.rideId !== action.payload);
        },

        clearRides: (state) => {
            state.rides = [];
        },

        setRidesMap: (state, action: PayloadAction<{ rideId: string, rideData: Object }>) => {
            state.ridesMap[action.payload.rideId] = action.payload.rideData;
        }
    }
})

export const { setRideId, setRideData, addRide, deleteRide, clearRides, setRidesMap } = RidesSlice.actions;
export default RidesSlice.reducer;