import { configureStore } from "@reduxjs/toolkit";
import LogInReducer from "./slices/logIn";

export const store = configureStore({
    reducer: {
        LogIn: LogInReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;