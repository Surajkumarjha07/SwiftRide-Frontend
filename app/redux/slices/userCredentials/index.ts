import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userName: "",
    userEmail: "",
    role: ""
}

export const UserSlice = createSlice({
    initialState,
    name: "User",
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },

        setUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },

        setRole: (state, action) => {
            state.role = action.payload;
        }
    }
})

export const { setUserEmail, setUserName, setRole } = UserSlice.actions;
export default UserSlice.reducer;