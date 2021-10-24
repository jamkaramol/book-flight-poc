import React, { useState } from "react";
import { SORT_OPTIONS } from '../../mockData';
import { useDispatch, useSelector } from "react-redux";
import { setSortOption, getSortOption } from '../../pages/Flights/flightsSlice';
import PageNavBar from "../PageNavBar";
import { useHistory } from "react-router";
import './sortFlight.scss';

const SortFlights = () => {
    const history = useHistory();
    const sortOption = useSelector(getSortOption);
    const [selectedSortOption, setSelectedSortOption] = useState(sortOption);
    const dispatch = useDispatch();

    const radioOptionClickHandler = (id: string) => {
        setSelectedSortOption(id);
    };

    const onClickDoneHandler = () => {
        dispatch(setSortOption(selectedSortOption));
        history.push("/flights/results");
    };

    return (
        <div className="sort-flights">
            <PageNavBar showBackButton={true} heading={"Sort By"} action={""} />
            <div className="sort-flight-form">
                <div className="sort-flight-radio-box">
                    {SORT_OPTIONS.map((option) => {
                        return (
                            <div key={option.id} className="sort-flight-options" >
                                <div>
                                    <input
                                        type="radio"
                                        id={option.id}
                                        name={"sortFlights"}
                                        onChange={() => radioOptionClickHandler(option.id)}
                                        checked={option.id === selectedSortOption}
                                        value={option.id}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={option.id} >{option.name}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="sort-flight-submit">
                    <button data-testid="sort-done-button" className="button button-primary" onClick={onClickDoneHandler} > Done </button>
                </div>
            </div>
        </div>
    )
};

export default SortFlights;