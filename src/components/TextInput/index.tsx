import React from "react";
import './TextInput.scss';

interface TextInputProps {
    value: string;
    placeholderText?: string;
    onChange: (value: any) => void;
    label: string,
    type?: string,
    required?: boolean
}

const TextInput = ({
    value = "",
    placeholderText = "",
    onChange,
    label,
    type = "text",
    required = false
}: TextInputProps) => {

    const textInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        return onChange(event.target.value);
    }

    const classNames = "input-label " + (required ? "required" : "");

    return (
        <div className="input-box">
            <label htmlFor={label} className={classNames}>{label}</label>
            <input data-testid={label.toLocaleLowerCase()} type={type} value={value} placeholder={placeholderText} onChange={textInputChangeHandler}>
            </input>
        </div>)
};

export default TextInput;