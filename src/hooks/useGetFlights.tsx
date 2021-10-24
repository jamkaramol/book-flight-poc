import { useState, useEffect, useCallback } from "react";
import { FlightDetails } from "../mockData";
import { useSelector } from "react-redux";
import { selectFlightSearchCriteria, getSortOption, getFlightFilterCriteria } from "../pages/Flights/flightsSlice";
import { getDurationInMilliSeconds, getTimeInMilliSeconds } from "../utils/common";
import { FLIGHT_SORT_TYPES } from '../mockData';

export interface SearchCriteria {
    departure: string,
    destination: string,
    departDate: string,
    returnDate: string,
    travelers: string,
    flightClass: string
}

interface UseGetFlight {
    flightList: any[]
}

const defaultData = [
    {
        "departure": "Pune",
        "destination": "Mumbai",
        "departureDate": "2021-10-21",
        "returnDate": "2021-10-24",
        "availableSeats": [
            { "flightClass": "Economy", "seats": 40, "price": 40, "availableSeats": 20 },
            { "flightClass": "Basic Economy", "seats": 38, "price": 80, "availableSeats": 20 },
            { "flightClass": "Main cabin", "seats": 32, "price": 120, "availableSeats": 20 },
            { "flightClass": "First Class", "seats": 22, "price": 160, "availableSeats": 20 }
        ],
        "airlinesName": "AirIndia",
        "stops": ["Lonavala"],
        "startTime": "11:20",
        "stopTime": "13:20",
        "duration": "2h"
    }
];

const useGetFlights = (): UseGetFlight => {

    const searchCriteria: SearchCriteria = useSelector(selectFlightSearchCriteria);
    const sortCriteria = useSelector(getSortOption);
    const filterCriteria = useSelector(getFlightFilterCriteria);
    const [flightList, setFlightList] = useState(defaultData);

    const filterData = (list: any[], key: string, value: string) => {
        return list.filter((item: any) => String(item[key]).toLowerCase().includes(value.toLowerCase()));
    };

    const getMaxValue = (list: any, key: string) => {
        return Math.max(...list.map((item: any) => item[key]));
    };

    const getMinValue = (list: any, key: string) => {
        return Math.min(...list.map((item: any) => item[key]));
    };

    const getDuration = (a: any, b: any) => {
        const aDuration = getDurationInMilliSeconds(a.startTime, a.stopTime);
        const bDuration = getDurationInMilliSeconds(b.startTime, b.stopTime);
        return {
            aDuration: Number(aDuration),
            bDuration: Number(bDuration)
        }
    };

    const getMaxValues = useCallback((a, b) => {
        const aPrice = getMaxValue(a.availableSeats, "price");
        const bPrice = getMaxValue(b.availableSeats, "price");
        return {
            aPrice,
            bPrice
        };
    }, []);

    const sortFlightHandler = useCallback((list: any[]) => {
        switch (sortCriteria) {
            case FLIGHT_SORT_TYPES.AIRLINE_REVERSE_ORDER: {
                return list.sort((a, b) => (a.airlinesName > b.airlinesName) ? -1 : ((b.airlinesName > a.airlinesName) ? 1 : 0));
            } case FLIGHT_SORT_TYPES.AIRLINE_DEFAULT: {
                return list.sort((a, b) => (a.airlinesName > b.airlinesName) ? 1 : ((b.airlinesName > a.airlinesName) ? -1 : 0));
            } case FLIGHT_SORT_TYPES.PRICE_HIGH_TO_LOW: {
                return list.sort((a, b) => {
                    const { aPrice, bPrice } = getMaxValues(a, b);
                    return bPrice - aPrice;
                });
            } case FLIGHT_SORT_TYPES.PRICE_LOW_TO_HIGH: {
                return list.sort((a, b) => {
                    const { aPrice, bPrice } = getMaxValues(a, b);
                    return aPrice - bPrice;
                });
            } case FLIGHT_SORT_TYPES.SHORT_TO_LONG: {
                return list.sort((a, b) => {
                    const { aDuration, bDuration } = getDuration(a, b);
                    return Number(bDuration) - Number(aDuration);
                });
            } case FLIGHT_SORT_TYPES.LONG_TO_SHORT: {
                return list.sort((a, b) => {
                    const { aDuration, bDuration } = getDuration(a, b);
                    return Number(aDuration) - Number(bDuration);
                });
            } case FLIGHT_SORT_TYPES.EARLY_DEPARTURE: {
                return list.sort((a, b) => getTimeInMilliSeconds(a.startTime) - getTimeInMilliSeconds(b.startTime));
            } case FLIGHT_SORT_TYPES.ARRIVAL: {
                return list.sort((a, b) => {
                    const aTime = getTimeInMilliSeconds(a.arrivalTime);
                    const bTime = getTimeInMilliSeconds(b.arrivalTime);
                    return Number(aTime) - Number(bTime);
                });
            }
            default: {
                return list;
            }
        }
    }, [sortCriteria, getMaxValues]);

    const filterFlightResults = useCallback((list) => {
        const { bookingClass, priceMin, priceMax } = filterCriteria;
        if (!priceMin || !priceMax) {
            return list;
        }
        let filteredResults = [];
        if (priceMin && priceMax) {
            filteredResults = list.filter((flight: any) => {
                let getMinPrice = getMinValue(flight.availableSeats, "price");
                let getMaxPrice = getMaxValue(flight.availableSeats, "price");
                if (getMinPrice >= Number(priceMin) && getMaxPrice <= Number(priceMax)) {
                    return flight;
                };
            });
            return filteredResults.filter((a: any) => a);
        };
    }, [filterCriteria]);

    const onSearchFlightHandler = useCallback(() => {
        const { departure = "", destination = "", departDate = "", returnDate = "" } = searchCriteria;
        let list: any = departure ? filterData(FlightDetails, "departure", departure) : [];
        list = filterData(list, "destination", destination);
        list = filterData(list, "departureDate", departDate);
        list = returnDate ? filterData(list, "returnDate", returnDate) : list;
        list = filterFlightResults(list);
        list = sortCriteria ? sortFlightHandler(list) : list;
        setFlightList(list);
    }, [searchCriteria, sortFlightHandler, sortCriteria, filterFlightResults]);

    useEffect(() => {
        onSearchFlightHandler();
    }, [onSearchFlightHandler]);

    return {
        flightList
    }

};

export default useGetFlights;