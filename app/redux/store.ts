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
import ChatReducer from "./slices/chat";
import ShowContentReducer from "./slices/showContent";
import MessagesReducer from "./slices/messages";

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
        LocationCoordinates: LocationCoordinatesReducer,
        Chat: ChatReducer,
        ContentVisibility: ShowContentReducer,
        Messages: MessagesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;