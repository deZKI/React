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
            <label key={index}>
                <input
                    type="radio"
                    name={name}
                    value={option.value.toString()}  // Приводим значение к строке
                    checked={option.value === selectedValue}
                    onChange={() => onChange(option.value)}
                />
                {option.label}
            </label>
        ))}
    </div>
);

export default RadioSelector;
