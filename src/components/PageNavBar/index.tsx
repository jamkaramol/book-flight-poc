import React, { useEffect } from "react";
import BackButton from "../BackButton";
import "./pageNavBar.scss";
import { hideNavbar, hideTabs } from "../../appSlice";
import { useDispatch } from "react-redux";

const PageNavBar = ({
    showBackButton = true,
    heading = "",
    action = ""
}: {
    showBackButton?: boolean,
    heading?: JSX.Element | string,
    action?: JSX.Element | string
}): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(hideTabs());
        dispatch(hideNavbar());
    }, [dispatch])

    return (
        <div className="navbar">
            {showBackButton && <BackButton className={"back-button"} />}
            {heading && (
                <div className="flight-details">
                    {heading}
                </div>
            )}
            {action && (
                <div className="action-button">
                    {action}
                </div>
            )}
        </div>
    )
};

export default PageNavBar;