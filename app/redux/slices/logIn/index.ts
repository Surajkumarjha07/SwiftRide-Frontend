import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false
}

export const LogInSlice = createSlice({
    initialState,
    name: "LogIn",
    reducers: {
        setLogInState: (state, action) => {            
            state.isLoggedIn = action.payload;
        }
    }
})

export const { setLogInState } = LogInSlice.actions;
export default LogInSlice.reducer;