import React from 'react';
import { AccountStatus } from '../../enums/accounts.status';
import { PurposeType } from '../../enums/accounts.purpose';
import { AccountHolderType } from '../../enums/accounts.holders';
import {FiltersState} from "../../interfaces/personal.filter";

interface FiltersProps {
    onFilterChange: (fieldName: keyof FiltersState, value: string | AccountStatus | PurposeType | AccountHolderType) => void;
    filters: FiltersState;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, filters }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onFilterChange(name as keyof FiltersState, value as any);
    };

    return (
        <div className="filters">
            <input
                type="text"
                name="address"
                placeholder="Фильтр по адресу"
                value={filters.address}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="room"
                placeholder="Фильтр по помещению"
                value={filters.room}
                onChange={handleInputChange}
            />
            <select
                name="status"
                value={filters.status}
                onChange={handleInputChange}
            >
                <option value="all">Все</option>
                <option value={AccountStatus.Active}>Активный</option>
                <option value={AccountStatus.Closed}>Закрытый</option>
            </select>
            <select
                name="purpose"
                value={filters.purpose}
                onChange={handleInputChange}
            >
                <option value="all">Все</option>
                <option value={PurposeType.Residential}>Жилой</option>
                <option value={PurposeType.NonResidential}>Нежилой</option>
            </select>
            <select
                name="holder"
                value={filters.holder}
                onChange={handleInputChange}
            >
                <option value="all">Все</option>
                <option value={AccountHolderType.Individual}>Физическое лицо</option>
                <option value={AccountHolderType.LegalEntity}>Юридическое лицо</option>
            </select>
        </div>
    );
};

export default Filters;
