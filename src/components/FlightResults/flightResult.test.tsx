import React from 'react';
import { render, screen, fireEvent, act, within } from '../../app/test.util';
import FlightResults from './index';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import { FLIGHT_SORT_TYPES } from '../../mockData';
import { todaysDate, getDateFromToday } from '../../utils/common';

const preloadedState = {
    flights: {
        searchCriteria: {
            departure: "Pune",
            destination: "Mumbai",
            departDate: todaysDate(),
            returnDate: getDateFromToday(4),
            travelers: "5",
            flightClass: "Economy"
        },
        sortOption: "airlineReverseOrder",
        priceMin: 10,
        priceMax: 190,
        bookingClass: ""
    },
    app: {
        isNavbarEnabled: true,
        isTabEnabled: true
    }
};

const sortTestingValues = [
    {
        id: FLIGHT_SORT_TYPES.PRICE_LOW_TO_HIGH,
        value: "Jet"
    },
    {
        id: FLIGHT_SORT_TYPES.PRICE_HIGH_TO_LOW,
        value: "AirIndia"
    },
    {
        id: FLIGHT_SORT_TYPES.SHORT_TO_LONG,
        value: "Jet"
    },
    {
        id: FLIGHT_SORT_TYPES.LONG_TO_SHORT,
        value: "AirIndia"
    },
    {
        id: FLIGHT_SORT_TYPES.EARLY_DEPARTURE,
        value: "Jet"
    },
    {
        id: FLIGHT_SORT_TYPES.ARRIVAL,
        value: "Jet"
    },
    {
        id: FLIGHT_SORT_TYPES.AIRLINE_DEFAULT,
        value: "AirIndia"
    },
    {
        id: FLIGHT_SORT_TYPES.AIRLINE_REVERSE_ORDER,
        value: "Jet"
    },
];

describe('SearchFlight tab :', () => {


    test("It show message no result found when no search criteria is selected", () => {
        const history = createMemoryHistory();
        act(() => {

            render(
                <Router history={history}>
                    <FlightResults />
                </Router>);
        });

        const message = screen.getByTestId("no-result-found");
        expect(message).toBeInTheDocument();
    });

    test("It should show flight results", () => {
        const history = createMemoryHistory();
        act(() => {

            render(
                <Router history={history}>
                    <FlightResults />
                </Router>
                , { preloadedState });
        });

        const message = screen.queryAllByTestId("flight-details");
        expect(message.length).toEqual(2);
    });

    sortTestingValues.forEach(({ id, value }) => {
        test(`It should show flight as per sort options: ${id}`, () => {
            const history = createMemoryHistory();
            preloadedState.flights.sortOption = id;
            act(() => {
                render(
                    <Router history={history}>
                        <FlightResults />
                    </Router>
                    , { preloadedState });
            });
            const message = screen.queryAllByTestId("flight-details");
            expect(within(message[0]).queryByText(value)).toBeInTheDocument();
        });
    });

});