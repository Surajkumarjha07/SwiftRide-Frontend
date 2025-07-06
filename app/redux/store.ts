import { configureStore } from "@reduxjs/toolkit";
import LogInReducer from "./slices/logIn";
import ProfileReducer from "./slices/profile";
import UserReducer from "./slices/userCredentials";
import FareReducer from "./slices/showFare";
import CookieReducer from "./slices/cookie";
import VehicleReducer from "./slices/verifyVehicle";
import AcceptRideReducer from "./slices/acceptRide";
import RidesListReducer from "./slices/ridesList";
import RidesReducer from "./slices/rides";

export const store = configureStore({
    reducer: {
        LogIn: LogInReducer,
        Profile: ProfileReducer,
        User: UserReducer,
        Fare: FareReducer,
        Cookie: CookieReducer,
        Vehicle: VehicleReducer,
        AcceptRide: AcceptRideReducer,
        RidesList: RidesListReducer,
        Rides: RidesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;