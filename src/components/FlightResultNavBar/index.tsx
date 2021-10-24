import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { selectFlightSearchCriteria } from '../../pages/Flights/flightsSlice';

import { FiEdit2 } from "react-icons/fi";
import { IoMdArrowForward } from "react-icons/io";
import { hideNavbar, hideTabs } from "../../appSlice";
import { useDispatch } from "react-redux";
import PageNavBar from "../PageNavBar";
import { getMonthAndDay } from '../../utils/common';

const FlightResultNavBar = (): JSX.Element => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(hideTabs());
        dispatch(hideNavbar());
    }, [dispatch])

    const searchCriteria: any = useSelector(selectFlightSearchCriteria);

    const { departure = "", destination = "", departDate = "", returnDate = "", travelers } = searchCriteria;

    const formatName = (name: string = "") => {
        return String(name).slice(0, 3).toUpperCase();
    }

    const actionJSX = (<FiEdit2 />);
    const headingDetailsJSX = (<React.Fragment>
        <div style={{ fontSize: "14px" }}>
            {formatName(departure)} <IoMdArrowForward /> {formatName(destination)}
        </div>
        <div>
            {getMonthAndDay(departDate)} - {getMonthAndDay(returnDate)} | {travelers} Adults
        </div>
    </React.Fragment>
    );


    return (
        <PageNavBar
            date-testid="child-route-tab"
            showBackButton={true}
            heading={departure ? headingDetailsJSX : " "}
            action={actionJSX}
        />
    )
};

export default FlightResultNavBar;