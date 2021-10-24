import { todaysDate, getDateFromToday } from './utils/common';
export const CLASS_OPTIONS = ["Economy", "Basic Economy", "Main cabin", "First Class"];

export enum FLIGHT_SORT_TYPES {
    PRICE_LOW_TO_HIGH = "priceLowToHigh",
    PRICE_HIGH_TO_LOW = "priceHighToLow",
    SHORT_TO_LONG = "sortToLong",
    LONG_TO_SHORT = "longToShort",
    EARLY_DEPARTURE = "earlyDeparture",
    ARRIVAL = "arrival",
    AIRLINE_DEFAULT = "airline",
    AIRLINE_REVERSE_ORDER = "airlineReverseOrder"
};

export const SORT_OPTIONS = [
    {
        id: FLIGHT_SORT_TYPES.PRICE_LOW_TO_HIGH,
        name: "Price (Lowest to Highest)"
    },
    {
        id: FLIGHT_SORT_TYPES.PRICE_HIGH_TO_LOW,
        name: "Price (Highest to Lowest)"
    },
    {
        id: FLIGHT_SORT_TYPES.SHORT_TO_LONG,
        name: "Duration (Shortest to Longest)"
    },
    {
        id: FLIGHT_SORT_TYPES.LONG_TO_SHORT,
        name: "Duration (Longest to Shortest)"
    },
    {
        id: FLIGHT_SORT_TYPES.EARLY_DEPARTURE,
        name: "Departure (Earliest to Latest)"
    },
    {
        id: FLIGHT_SORT_TYPES.ARRIVAL,
        name: "Arrival (Earliest to Latest)"
    },
    {
        id: FLIGHT_SORT_TYPES.AIRLINE_DEFAULT,
        name: "Airline (A to Z)"
    },
    {
        id: FLIGHT_SORT_TYPES.AIRLINE_REVERSE_ORDER,
        name: "Airline (Z to A)"
    },
];

export const TRAVELERS = Array(20).fill(1).map((v, i) => String(i + 1));

const getAvailableSeats = (totalSeats = 100, basePrice: number) => {
    return CLASS_OPTIONS.map((cl, index) => {
        return {
            flightClass: cl,
            seats: totalSeats - (index * index * 2),
            price: totalSeats * (index + 1) + basePrice,
            availableSeats: 20
        };
    });
};

const getFlightDetails = (
    departure: string,
    destination: string,
    departureDate: string,
    returnDate: string,
    airlinesName: string,
    stops: string[],
    basePrice = 10,
    startTime: string,
    stopTime: string,
    arrivalTime: string
) => {
    return {
        departure,
        destination,
        departureDate,
        returnDate,
        availableSeats: getAvailableSeats(40, basePrice),
        airlinesName,
        stops,
        startTime,
        stopTime,
        arrivalTime
    }
}

const CITIES = ["Pune", "Mumbai", "Delhi", "Lonavala", "Agra"];
// Air India, Jet Airways

export const FlightDetails = [
    getFlightDetails(CITIES[0], CITIES[1], todaysDate(), getDateFromToday(4), "AirIndia", [CITIES[0], CITIES[1]], 10, "13:30", "20:00", "13:00"),
    getFlightDetails(CITIES[0], CITIES[1], todaysDate(), getDateFromToday(4), "Jet", [CITIES[1], CITIES[3], CITIES[0]], 5, "10:00", "12:30", "09:30"),
    getFlightDetails(CITIES[1], CITIES[0], getDateFromToday(4), getDateFromToday(9), "Jet", [CITIES[0], CITIES[3], CITIES[1]], 10, "11:20", "13:20", "11:00"),
    getFlightDetails(CITIES[1], CITIES[0], getDateFromToday(4), getDateFromToday(9), "AirIndia", [CITIES[0], CITIES[3], CITIES[1]], 15, "13:30", "20:00", "13:00"),
    getFlightDetails(CITIES[0], CITIES[2], todaysDate(), getDateFromToday(5), "AirIndia", [CITIES[0], CITIES[1], CITIES[4], CITIES[2]], 30, "10:00", "12:30", "09:30"),
    getFlightDetails(CITIES[0], CITIES[2], todaysDate(), getDateFromToday(5), "Jet", [CITIES[0], CITIES[1], CITIES[4], CITIES[2]], 2, "11:20", "13:20", "11:05"),
    getFlightDetails(CITIES[2], CITIES[0], getDateFromToday(4), getDateFromToday(9), "Jet", [CITIES[2], CITIES[4], CITIES[1], CITIES[0]], 60, "13:30", "20:00", "13:10"),
    getFlightDetails(CITIES[2], CITIES[0], getDateFromToday(4), getDateFromToday(9), "AirIndia", [CITIES[2], CITIES[4], CITIES[1], CITIES[0]], 15, "11:20", "13:20", "11:05")
];
// console.log("Refer this object for testing");
// console.log(FlightDetails);