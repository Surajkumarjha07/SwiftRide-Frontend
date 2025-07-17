import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./slices/profile";
import UserReducer from "./slices/userCredentials";
import FareReducer from "./slices/showFare";
import CookieReducer from "./slices/cookie";
import VehicleReducer from "./slices/verifyVehicle";
import RideOptionsReducer from "./slices/rideOptions";
import RidesListReducer from "./slices/ridesList";
import RidesReducer from "./slices/rides";
import PaymentsReducer from "./slices/payments";
import LocationDetailsReducer from "./slices/locationDetails";
import LocationCoordinatesReducer from "./slices/locationCoordinates";

export const store = configureStore({
    reducer: {
        Profile: ProfileReducer,
        User: UserReducer,
        Fare: FareReducer,
        Cookie: CookieReducer,
        Vehicle: VehicleReducer,
        RideOptions: RideOptionsReducer,
        RidesList: RidesListReducer,
        Rides: RidesReducer,
        Payments: PaymentsReducer,
        LocationDetails: LocationDetailsReducer,
        LocationCoordinates: LocationCoordinatesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;