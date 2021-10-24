import React from "react";
import "./flight.scss";
import SearchFlight from "../../components/SearchFlight";
import FlightResults from "../../components/FlightResults";
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FlightResultNavBar from "../../components/FlightResultNavBar";
import SortFlights from "../../components/SortFlights";
import FilterFlights from "../../components/FilterFlights";

const Flights = () => {
    let match = useRouteMatch();
    return <React.Fragment>
        <Switch>
            <Route path={`${match.path}/results`}>
                <FlightResultNavBar />
                <FlightResults />
            </Route>
            <Route path={`${match.path}/sort`}>
                <SortFlights />
            </Route>
            <Route path={`${match.path}/filter`} >
                <FilterFlights />
            </Route>
            <Route path={match.path}>
                <SearchFlight />
            </Route>
        </Switch>
    </React.Fragment>
};

export default Flights;