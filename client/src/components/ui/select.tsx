import { FC, useEffect, useState } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value: string;
    name?: string;
    labelOption?: string;
    onChange?: (value: string) => void;
}

const Select: FC<SelectProps> = ({ options, onChange, labelOption, value, name }: SelectProps) => {
    const [valueSelect, setValueSelect] = useState<string>(value);
    useEffect(() => {
        setValueSelect(value);
    }, [value]);
    return (
        <select
            name={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={e => onChange?.(e.target.value) ?? setValueSelect(e.target.value)}
            value={valueSelect}
        >
            {labelOption ? <option value={''}>{labelOption}</option> : null}
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
