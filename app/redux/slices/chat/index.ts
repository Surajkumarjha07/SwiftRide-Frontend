import chatInterface from "@/app/types/chat.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface chatState {
    showChatBadge: boolean,
    isChatOpen: boolean,
    chats: chatInterface[]
}

const initialState: chatState = {
    showChatBadge: false,
    isChatOpen: false,
    chats: []
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
        },

        setChats: (state, action: PayloadAction<chatInterface>) => {
            state.chats.push({ from: action.payload.from, msg: action.payload.msg });
        },

        clearChats: (state) => {
            state.chats = [];
        }
    }
})

export const { setShowChatBadge, setOpenChat, setChats, clearChats } = ChatSlice.actions;
export default ChatSlice.reducer;