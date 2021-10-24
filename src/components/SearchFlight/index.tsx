import React, { useEffect, useState } from 'react';
import SelectBox from "../SelectBox";
import TextInput from "../TextInput";
import DateInput from "../DateInput";
import { CLASS_OPTIONS, TRAVELERS } from "../../mockData";
import { useHistory } from 'react-router-dom';
import useSearchFlightCriteria from "../../hooks/useSearchFlightCriteria";
import { useDispatch } from 'react-redux';
import { updateFlightSearchForm } from "../../pages/Flights/flightsSlice";
import { showNavbar, showTabs } from '../../appSlice';
import { todaysDate } from '../../utils/common';

const SearchFlight = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(true);

    useEffect(() => {
        dispatch(showTabs());
        dispatch(showNavbar());
    }, [dispatch])

    const history = useHistory();
    const { criteriaValues, onChangeInputHandler } = useSearchFlightCriteria();
    const {
        departure,
        departDate,
        travelers,
        returnDate,
        flightClass,
        destination } = criteriaValues;

    const onSearchCallHandler = () => {
        history.push("/flights/results");
    };

    const inputChangeHandler = (type: string, value: string) => {
        onChangeInputHandler(type, value);
    };

    const checkIsFormValid = () => {
        if (!departure || !destination || !departDate || !returnDate) {
            setIsFormValid(false);
            return false;
        }
        setIsFormValid(true);
        return true;
    }

    const searchFlightHandler = () => {
        if (checkIsFormValid()) {
            dispatch(updateFlightSearchForm(criteriaValues));
            onSearchCallHandler();
        }
    };

    return (
        <div className="flight-search-form">
            <div className="date-fields-column">
                <TextInput
                    type={"text"}
                    value={departure}
                    label={"Departure"}
                    placeholderText="Airport or city"
                    onChange={(value) => inputChangeHandler("departure", value)}
                    required={true}
                />
                <TextInput
                    type={"text"}
                    label={"Destination"}
                    value={destination}
                    placeholderText="Airport or city"
                    onChange={(value) => inputChangeHandler("destination", value)}
                    required={true}
                />
            </div>
            <div className="date-fields">
                <DateInput
                    label={"Departure Date"}
                    value={departDate}
                    placeholderText={new Date().toLocaleDateString("en-US")}
                    onChange={(value) => inputChangeHandler("departDate", value)}
                    required={true}
                    min={todaysDate()}
                />

                <DateInput
                    label={"Return Date"}
                    value={returnDate}
                    placeholderText={new Date().toLocaleDateString("en-US")}
                    onChange={(value) => inputChangeHandler("returnDate", value)}
                    required={true}
                    min={departDate}
                />
            </div>
            <div className="date-fields">
                <SelectBox
                    label={"Travelers"}
                    selectedValue={travelers}
                    onChangeHandler={(value) => inputChangeHandler("travelers", value)}
                    options={TRAVELERS}
                />
                <SelectBox
                    label={"Class"}
                    selectedValue={flightClass}
                    onChangeHandler={(value) => inputChangeHandler("flightClass", value)}
                    options={CLASS_OPTIONS}
                />
            </div>
            {!isFormValid && <div className="validation-warning">Please fill the important fields (*)</div> }
            <div className="date-fields">
                <button data-testid="search-flights" className="button button-primary" onClick={searchFlightHandler}> Search Flights </button>
            </div>
        </div>
    )

};



export default SearchFlight;