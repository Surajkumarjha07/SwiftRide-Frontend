import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    showAcceptRideModal: false,
    showCancelRideModal: false,
    showCompleteRideModal: false
}

export const AcceptRideSlice = createSlice({
    initialState,
    name: "RideOptions",
    reducers: {
        setShowAcceptRideModal: (state, action: PayloadAction<boolean>) => {
            state.showAcceptRideModal = action.payload;
        },

        setShowCancelRideModal: (state, action: PayloadAction<boolean>) => {
            state.showCancelRideModal = action.payload;
        },

        setShowCompleteRideModal: (state, action: PayloadAction<boolean>) => {
            state.showCompleteRideModal = action.payload;
        }
    }
})

export const { setShowAcceptRideModal, setShowCancelRideModal, setShowCompleteRideModal } = AcceptRideSlice.actions;
export default AcceptRideSlice.reducer;