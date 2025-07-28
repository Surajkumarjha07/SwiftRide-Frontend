import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    showContent: false
}

export const RidesListSlice = createSlice({
    initialState,
    name: "ContentVisibility",
    reducers: {
        setShowContent: (state, action: PayloadAction<boolean>) => {
            state.showContent = action.payload;
        }
    }
})

export const { setShowContent } = RidesListSlice.actions;
export default RidesListSlice.reducer;