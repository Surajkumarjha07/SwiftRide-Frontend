import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    showAcceptRideModal: false
}

export const AcceptRideSlice = createSlice({
    initialState,
    name: "AccepRide",
    reducers: {
        setShowAcceptRideModal: (state, action: PayloadAction<boolean>) => {
            state.showAcceptRideModal = action.payload;
        }
    }
})

export const { setShowAcceptRideModal } = AcceptRideSlice.actions;
export default AcceptRideSlice.reducer;