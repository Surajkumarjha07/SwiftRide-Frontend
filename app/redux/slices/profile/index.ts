import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isProfileOpen: false
}

export const ProfileSlice = createSlice({
    initialState,
    name: "Profile",
    reducers: {
        setIsProfileOpen: (state, action) => {
            state.isProfileOpen = action.payload;
        }
    }
})

export const { setIsProfileOpen } = ProfileSlice.actions;
export default ProfileSlice.reducer;