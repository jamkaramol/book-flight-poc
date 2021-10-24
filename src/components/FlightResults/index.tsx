import React from "react";
import FlightDetailsCard from "../FlightDetails";
import useGetFlights from "../../hooks/useGetFlights";
import FilterOptions from "../FilterOptions";
import './flightResults.scss';

const FlightResults = (): JSX.Element => {

    const { flightList = [] } = useGetFlights();
    const noResultJSX = (
        <div data-testid="no-result-found" className="no-flight-result-found">
            No result found, please search again !!!
        </div>
    );

    return (
        <div data-testid="flight-results">
            {flightList.length === 0 && noResultJSX}
            {flightList.length > 0 && flightList.map((details, i) => {
                return <FlightDetailsCard key={i} details={details} />
            })}
            <FilterOptions />
        </div>
    );

};

export default FlightResults;