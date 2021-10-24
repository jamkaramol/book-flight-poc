import React from "react";
import "./filterOptions.scss";
import { Link } from "react-router-dom";

const FilterOptions = (): JSX.Element => {

    return (
        <div className="filter-options">
            <button  className="sort-by"  > <Link data-testid="flight-sort-option" to={"sort"}> Sort By </Link></button>
            <button  className="filter-by" > <Link data-testid="flight-filter-option" to={"filter"}> Filters </Link></button>
        </div>
    )

};

export default FilterOptions;