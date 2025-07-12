import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    showPaymentsModal: true
}

export const PaymentSlice = createSlice({
    initialState,
    name: "Payments",
    reducers: {
        setShowPaymentsModal: (state, action: PayloadAction<boolean>) => {
            state.showPaymentsModal = action.payload;
        }
    }
})

export const { setShowPaymentsModal } = PaymentSlice.actions;
export default PaymentSlice.reducer;