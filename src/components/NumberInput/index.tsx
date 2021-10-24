
import React from "react";
import './numberInput.scss';

const NumberInput = (
    { label = "Number",
        min = 1,
        max = 1000,
        value = 1,
        onChangeHandler
    }: {
        label: string,
        min: number,
        max: number,
        value: number,
        onChangeHandler: (event: any) => void
    }) => {
    return (
        <div className="numberInput">
            <label htmlFor={label}>{label}</label>
            <input data-testid={label} type="number" value={value} name={label} min={min} max={max} onChange={onChangeHandler} />
        </div>
    )
};


export default NumberInput;