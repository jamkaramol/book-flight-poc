import React from "react"
import './navBar.scss';

const NavBar = ({ logo, heading }: { logo: JSX.Element, heading: string }): JSX.Element => {
    return (
        <div data-testid="app-navbar" className="navbar">
            <div className="logo">
                {logo}
            </div>
            <div className="heading">
                {heading}
            </div>
        </div>
    )
};

export default NavBar;