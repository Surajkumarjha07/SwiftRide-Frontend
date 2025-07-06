import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    showRidesList: false
}

export const RidesListSlice = createSlice({
    initialState,
    name: "RidesList",
    reducers: {
        setShowRidesList: (state, action: PayloadAction<boolean>) => {
            state.showRidesList = action.payload;
        }
    }
})

export const { setShowRidesList } = RidesListSlice.actions;
export default RidesListSlice.reducer;