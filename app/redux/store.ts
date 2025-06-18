import { configureStore } from "@reduxjs/toolkit";
import LogInReducer from "./slices/logIn";
import ProfileReducer from "./slices/profile";
import UserReducer from "./slices/userCredentials";

export const store = configureStore({
    reducer: {
        LogIn: LogInReducer,
        Profile: ProfileReducer,
        User: UserReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;