import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlightFilterCriteria, setPriceMax, setPriceMin } from '../../pages/Flights/flightsSlice';
import PageNavBar from "../PageNavBar";
import { useHistory } from "react-router";
import "./filterFlights.scss";
import NumberInput from "../NumberInput";
const MAX_PRICE_LIMIT = 10000;

const FilterFlights = () => {
    const history = useHistory();
    const { priceMax = 0, priceMin = 1 } = useSelector(getFlightFilterCriteria);

    const [minValue, setMinValue] = useState<number>(priceMin);
    const [maxValue, setMaxValue] = useState<number>(priceMax);

    const dispatch = useDispatch();

    const minPriceChangeHandler = (event: any) => {
        const value = Number(event.target.value);
        setMinValue(value);
        dispatch(setPriceMin(value));
    };

    const maxPriceChangeHandler = (event: any) => {
        const value = Number(event.target.value);
        setMaxValue(value);
        dispatch(setPriceMax(value));
    };

    const priceSliderChangeHandler = (event: any) => {
        const value = Number(event.target.value);
        setMaxValue(value);
        dispatch(setPriceMax(value));
    };

    const resetHandler = () => {
        setMinValue(0);
        setMaxValue(0);
        dispatch(setPriceMin(0));
        dispatch(setPriceMax(0));
    };

    const applyHandler = () => {
        dispatch(setPriceMin(minValue));
        dispatch(setPriceMax(maxValue));
        history.goBack();
    };

    return (
        <div className="filter-flights">
            <PageNavBar showBackButton={true} heading={"Filter By"} action={""} />
            <div className="flight-filter-options">
                <div className="price-filters">
                    <div className="price-filter-heading">
                        Price Range
                    </div>
                    <div className="price-inputs">
                        <NumberInput label={"Minimum Price"} value={minValue} min={10} max={MAX_PRICE_LIMIT} onChangeHandler={minPriceChangeHandler} />
                        <NumberInput label={"Maximum Price"} value={maxValue} min={minValue} max={MAX_PRICE_LIMIT} onChangeHandler={maxPriceChangeHandler} />
                    </div>
                    <div className="price-range-slider">
                        <input data-testid="price-slider" className="custom-slider" type="range" min={minValue + 1} max={MAX_PRICE_LIMIT} onChange={priceSliderChangeHandler} value={maxValue} />
                    </div>
                </div>
                <div className="action-buttons">
                    <div>
                        <button data-testid="reset-filter" className="button button-secondary" onClick={resetHandler} > Reset all </button>
                    </div>
                    <div>
                        <button data-testid="apply-filter" className="button button-primary" onClick={applyHandler} > Apply </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterFlights;