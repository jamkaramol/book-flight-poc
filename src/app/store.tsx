import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../appSlice";
import flightReducer from "../pages/Flights/flightsSlice"

export default configureStore({
    reducer: {
        app: appReducer,
        flights: flightReducer
    }
});