import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    isChatOpen: false
}

export const ChatSlice = createSlice({
    initialState,
    name: "Chat",
    reducers: {
        setOpenChat: (state, action: PayloadAction<boolean>) => {
            state.isChatOpen = action.payload;
        }
    }
})

export const { setOpenChat } = ChatSlice.actions;
export default ChatSlice.reducer;