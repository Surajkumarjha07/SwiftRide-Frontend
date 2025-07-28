import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type fareDetails = {
    vehicle: string,
    price: number
}

const initialState = {
    fares: <fareDetails[]>[],
    showFare: false
}

export const FareSlice = createSlice({
    initialState,
    name: "Fare",
    reducers: {
        setFare: (state, action: PayloadAction<fareDetails[]>) => {
            if (Array.isArray(action.payload)) {
                state.fares = action.payload;
            }
        },

        setShowFare: (state, action: PayloadAction<boolean>) => {
            state.showFare = action.payload;
        }
    }
})

export const { setFare, setShowFare } = FareSlice.actions;
export default FareSlice.reducer;