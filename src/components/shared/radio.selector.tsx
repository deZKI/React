import React from 'react';
import "./styles/RadioSelector.scss"

interface RadioSelectorProps<T extends string | number> {
    options: { label: string; value: T }[];
    name: string;
    selectedValue: T;
    onChange: (value: T) => void;
}

const RadioSelector = <T extends string | number>({options, name, selectedValue, onChange}: RadioSelectorProps<T>) => (
    <div className="radio-selector">
        {options.map((option, index) => (
            <div
                className="radio-option__option"
                style={{
                    background: option.value === selectedValue ? '#cdd1d4' : '',
                    borderRadius: option.value === selectedValue ? '6px' : '',
                }}
            >
                <input
                    type="radio"
                    name={name}
                    className="radio-option__input"
                    value={option.value.toString()}  // Приводим значение к строке
                    checked={option.value === selectedValue}
                    onChange={() => onChange(option.value)}
                />
                <label key={index} className="radio-option__label"
                       style={{color: option.value === selectedValue ? 'black' : '#565c64'}}>{option.label}</label>
            </div>
        ))}
    </div>
);

export default RadioSelector;
