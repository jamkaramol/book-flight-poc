
import './timeInfo.scss';

const TimeInfo = ({ time, city }: { time: string, city: string }): JSX.Element => {
    return (
        <div className="flight-time-info">
            <div>{time}</div>
            <div className="city-name">{city.slice(0, 3)}</div>
        </div>
    )
};

export default TimeInfo;