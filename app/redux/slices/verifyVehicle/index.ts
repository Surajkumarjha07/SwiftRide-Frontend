import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    isVerifyVehicleOpen: false
}

export const VehicleSlice = createSlice({
    initialState,
    name: "Vehicle",
    reducers: {
        setShowVehicleModal: (state, action: PayloadAction<boolean>) => {
            state.isVerifyVehicleOpen = action.payload;
        }
    }
})

export const { setShowVehicleModal } = VehicleSlice.actions;
export default VehicleSlice.reducer;