import { todaysDate, getDateFromToday } from '../utils/common';

export const SearchFormFields = ["Departure", "Destination", "Return Date", "Departure Date", "Travelers", "Class", "Search Flights"];

export const filedNameAndValue = [
    {
        id: "departure",
        value: "Pune"
    },
    {
        id: "destination",
        value: "Mumbai"
    },
    {
        id: "departure date",
        value: todaysDate()
    },
    {
        id: "return date",
        value: getDateFromToday(4)
    },
    {
        id: "travelers",
        value: "4"
    },
    {
        id: "class",
        value: "Economy"
    }
];