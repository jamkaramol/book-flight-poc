import React from "react";
import { useHistory } from "react-router";
import { BiArrowBack } from "react-icons/bi";

const BackButton = ({ className = "" }: { className: string }): JSX.Element => {

    const history = useHistory();
    const backButtonHandler = () => {
        history.goBack();
    };

    return (
        <div data-testid="nav-back-button" onClick={backButtonHandler} className={className} >
            <BiArrowBack  />
        </div>
    )
};

export default BackButton;