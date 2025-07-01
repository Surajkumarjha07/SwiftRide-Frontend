import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    showFare: false
}

export const FareSlice = createSlice({
    initialState,
    name: "Fare",
    reducers: {
        setShowFare: (state, action: PayloadAction<boolean>) => {
            state.showFare = action.payload;
        }
    }
})

export const { setShowFare } = FareSlice.actions;
export default FareSlice.reducer;