import { configureStore } from "@reduxjs/toolkit";
import LogInReducer from "./slices/logIn";
import ProfileReducer from "./slices/profile";
import UserReducer from "./slices/userCredentials";
import FareReducer from "./slices/showFare";
import CookieReducer from "./slices/cookie";

export const store = configureStore({
    reducer: {
        LogIn: LogInReducer,
        Profile: ProfileReducer,
        User: UserReducer,
        Fare: FareReducer,
        Cookie: CookieReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;