import React from "react";
import "./SelectBox.scss";

interface SelectBoxProps {
    label: string,
    selectedValue: string,
    onChangeHandler: (text: string) => void,
    options: string[]
}

const SelectBox = ({ label = "Select option", selectedValue = "", onChangeHandler, options = [] }: SelectBoxProps): JSX.Element => {

    const onSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeHandler(event.target.value);
    };

    return (
        <div className="select-box">
            <label htmlFor={label}>{label}</label>
            <select  
                data-testid={label.toLocaleLowerCase()}
                name={label} 
                onChange={onSelectHandler} 
                value={selectedValue}>
                <option value=" "></option>
                {options.length > 0 && options.map((option) => {
                    return <option key={option} value={option}>{option} </option>
                })}
            </select>
        </div>
    )
};

export default SelectBox;