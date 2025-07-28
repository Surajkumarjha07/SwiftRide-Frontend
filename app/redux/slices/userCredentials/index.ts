import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    userId: "",
    userName: "",
    userEmail: "",
    role: "",
    vehicleType: "",
    vehicleNo: ""
}

export const UserSlice = createSlice({
    initialState,
    name: "User",
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },

        setUserName: (state, action) => {
            state.userName = action.payload;
        },

        setUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },

        setRole: (state, action) => {
            state.role = action.payload;
        },

        setVehicleType: (state, action) => {
            state.vehicleType = action.payload;
        },

        setVehicleNo: (state, action) => {
            state.vehicleNo = action.payload;
        }

    }
})

export const { setUserId, setUserEmail, setUserName, setRole, setVehicleType, setVehicleNo } = UserSlice.actions;
export default UserSlice.reducer;