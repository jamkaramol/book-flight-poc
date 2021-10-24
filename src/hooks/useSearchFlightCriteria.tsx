import { useState } from "react";
import { useSelector } from "react-redux";
import { selectFlightSearchCriteria } from "../pages/Flights/flightsSlice";

interface UseSearchFlight {
    criteriaValues: {
        departure: string,
        destination: string,
        departDate: string,
        returnDate: string,
        travelers: string,
        flightClass: string
    },
    onChangeInputHandler: (type: string, value: string) => void;
}

const useSearchFlightCriteria = (): UseSearchFlight => {
    const searchCriteria = useSelector(selectFlightSearchCriteria);
    
    const [departure, setDeparture] = useState(searchCriteria.departure);
    const [destination, setDestination] = useState(searchCriteria.destination);
    const [departDate, setDepartDate] = useState(searchCriteria.departDate);
    const [returnDate, setReturnDate] = useState(searchCriteria.returnDate);
    const [travelers, setTravelers] = useState(searchCriteria.travelers);
    const [flightClass, setFlightClass] = useState(searchCriteria.flightClass);

    const onChangeInputHandler = (type: string, value: string) => {
        switch (type) {
            case "departure": {
                setDeparture(value);
                break;
            }
            case "departDate": {
                setDepartDate(value);
                break;
            }
            case "destination": {
                setDestination(value);
                break;
            }
            case "returnDate": {
                setReturnDate(value);
                break;
            }
            case "travelers": {
                setTravelers(value);
                break;
            }
            case "flightClass": {
                setFlightClass(value);
                break;
            }
            default: {
                break;
            }
        }
    }

    return {
        criteriaValues: {
            departure,
            destination,
            departDate,
            returnDate,
            travelers,
            flightClass
        },
        onChangeInputHandler
    }

};


export default useSearchFlightCriteria;