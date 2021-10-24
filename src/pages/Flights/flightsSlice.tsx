import { createSlice } from "@reduxjs/toolkit";

const today = new Date().toISOString().split('T')[0]

export const flightsSlice = createSlice({
    name: 'flights',
    initialState: {
        searchCriteria: {
            departure: "",
            destination: "",
            departDate: today,
            returnDate: "",
            travelers: "",
            flightClass: ""
        },
        sortOption: "",
        priceMin: 0,
        priceMax: 0,
        bookingClass: ""
    },
    reducers: {
        updateFlightSearchForm: (store, action) => {
            store.searchCriteria = action.payload;
            store.sortOption = "";
            store.priceMin = 1;
            store.priceMax = 0;
        },
        clearFlightSearchForm: (store) => {
            store.searchCriteria = {
                departure: "",
                destination: "",
                departDate: "",
                returnDate: "",
                travelers: "",
                flightClass: ""
            };
        },
        setSortOption: (store, action) => {
            store.sortOption = action.payload;
        },
        setPriceMin: (store, action) => {
            store.priceMin = action.payload;
        },
        setPriceMax: (store, action) => {
            store.priceMax = action.payload;
        },
        setBookingClass: (store, action) => {
            store.bookingClass = action.payload;
        }
    }
});
export const selectFlightSearchCriteria = (state: any) => state.flights.searchCriteria;
export const getSortOption = (state: any) => state.flights.sortOption;
export const getFlightFilterCriteria = (state: any) => {
    const { bookingClass, priceMax, priceMin } = state.flights;
    return {
        bookingClass,
        priceMax,
        priceMin
    }
};

export const {
    updateFlightSearchForm,
    clearFlightSearchForm,
    setSortOption,
    setPriceMin,
    setPriceMax,
    setBookingClass
} = flightsSlice.actions;
export default flightsSlice.reducer;

