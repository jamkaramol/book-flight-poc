import React from "react";
import './dateInput.scss';

interface DateInputProps {
    value: string;
    placeholderText?: string;
    onChange: (value: any) => void;
    label: string,
    required?: boolean,
    min?: string,
    max?: string
}

const DateInput = ({
    value = "",
    placeholderText = "",
    onChange,
    label,
    required = false,
    min = "",
    max = ""
}: DateInputProps) => {

    const dateInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        return onChange(event.target.value);
    }

    const classNames = "input-label " + (required ? "required" : "");

    return (
        <div className="input-box">
            <label className={classNames}>{label}</label>
            <input 
                data-testid={label.toLocaleLowerCase()}
                type="date" 
                value={value} 
                placeholder={placeholderText} 
                onChange={dateInputChangeHandler}
                min={min}
                max={max}
                >
            </input>
        </div>)
};

export default DateInput;