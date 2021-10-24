import React from "react";
import "./tab.scss";
import { Link } from "react-router-dom";


const Tab = ({ label, onClick, activeTab, path, icon }: any) => {

    const onClickHandler = () => {
        onClick(path);
    }
    let className = 'tab-list-item';
    if (activeTab === path) {
        className += ' tab-list-active';
    }

    return (
        <Link
            className={className}
            onClick={onClickHandler}
            to={path}
        >
            {icon} {label}
        </Link>
    );
};

export default Tab;