
import "./flightClassInfo.scss";

const FlightClassInfo = ({ classInfo }: any): JSX.Element => {
    return (
        <div className="flight-class-option">
            <div className="available-seats">{classInfo.availableSeats} seats left</div>
            <div className="flight-class-option-details">
                <div>${classInfo.price}</div>
                <div className="class-name">{classInfo.flightClass}</div>
            </div>
        </div>
    )
};

export default FlightClassInfo;