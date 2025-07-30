import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messagesToRead: 0
}

export const MessagesToReadSlice = createSlice({
    initialState,
    name: "Messages",
    reducers: {
        increaseMessagesToRead: (state) => {
            ++state.messagesToRead;
        },

        clearMessagesToRead: (state) => {
            state.messagesToRead = 0;
        }
    }
});

export const { increaseMessagesToRead, clearMessagesToRead } = MessagesToReadSlice.actions;
export default MessagesToReadSlice.reducer;