import React from "react";
import './FlightDetails.scss';
import logo from '../../logo.svg';
import { getDurationFromStartAndStop } from '../../utils/common';
import TimeInfo from "../TimeInfo";
import FlightClassInfo from "../FlightClassInfo";

interface FlightDetailsCardType {
    details: any
};

const FlightDetailsCard = ({ details }: FlightDetailsCardType): JSX.Element => {
    const { airlinesName, startTime, stopTime, stops, availableSeats, departure, destination } = details;
    return (
        <div data-testid="flight-details" className="flight-details-card">
            <div className="airline-details">
                <img src={logo} alt={airlinesName} className="airline-logo" />
                <div>{airlinesName}</div>
            </div>

            <div className="time-and-route">
                <TimeInfo time={startTime} city={departure} />
                <div className="duration-and-stop">
                    <div className="flight-duration">{getDurationFromStartAndStop(startTime, stopTime)}</div>
                    <div className="stop-view">
                        <div className="line">
                            {stops.length && stops.map((val: string, i: number) => <div key={i} className="dot">&nbsp;</div>)}
                        </div>
                    </div>
                    <div>{stops.length - 2} Stop (Add)</div>
                </div>
                <TimeInfo time={stopTime} city={destination} />
            </div>

            <div className="class-options">
                {availableSeats.length > 0 && availableSeats.map((classInfo: any) => {
                    return <FlightClassInfo classInfo={classInfo} key={classInfo.flightClass} />
                })}
            </div>

        </div>
    )
};


export default FlightDetailsCard;