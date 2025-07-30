import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    showChatBadge: false,
    isChatOpen: false
}

export const ChatSlice = createSlice({
    initialState,
    name: "Chat",
    reducers: {
        setShowChatBadge: (state, action: PayloadAction<boolean>) => {
            state.showChatBadge = action.payload;
        },

        setOpenChat: (state, action: PayloadAction<boolean>) => {
            state.isChatOpen = action.payload;
        }
    }
})

export const { setShowChatBadge, setOpenChat } = ChatSlice.actions;
export default ChatSlice.reducer;