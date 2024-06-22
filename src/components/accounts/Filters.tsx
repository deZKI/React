import React from 'react';
import {AccountStatus, AccountHolderType, PurposeType} from '../../enums/accounts';
import {FiltersState} from '../../interfaces/personal.filter';
import RadioSelector from '../shared/radio.selector';
import './styles/Filters.scss';

interface FiltersProps {
    onFilterChange: (fieldName: keyof FiltersState, value: string | AccountStatus | PurposeType | AccountHolderType) => void;
    filters: FiltersState;
}

const Filters: React.FC<FiltersProps> = ({onFilterChange, filters}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        onFilterChange(name as keyof FiltersState, value as any);
    };

    return (
        <div className="filters">
            <div className="filter-group">
                <label>Статус</label>
                <RadioSelector
                    options={[
                        {label: 'Все', value: 'all'},
                        {label: 'Активные', value: AccountStatus.Active},
                        {label: 'Закрытые', value: AccountStatus.Closed},
                    ]}
                    name="status"
                    selectedValue={filters.status}
                    onChange={(value) => onFilterChange('status', value)}
                />
            </div>
            <div className="filter-group">
                <label>Назначение</label>
                <RadioSelector
                    options={[
                        {label: 'Все', value: 'all'},
                        {label: 'Жилое', value: PurposeType.Residential},
                        {label: 'Нежилое', value: PurposeType.NonResidential},
                    ]}
                    name="purpose"
                    selectedValue={filters.purpose}
                    onChange={(value) => onFilterChange('purpose', value)}
                />
            </div>
            <div className="filter-group">
                <label>Держатель</label>
                <RadioSelector
                    options={[
                        {label: 'Все', value: 'all'},
                        {label: 'Физ. лицо', value: AccountHolderType.Individual},
                        {label: 'Юр. лицо', value: AccountHolderType.LegalEntity},
                    ]}
                    name="holder"
                    selectedValue={filters.holder}
                    onChange={(value) => onFilterChange('holder', value)}
                />
            </div>
            <div className="filter-group">
                <label>Адрес</label>
                <input
                    type="text"
                    name="address"
                    placeholder="Все"
                    className="form-control border-0 shadow-none"
                    value={filters.address}
                    onChange={handleInputChange}
                />
            </div>
            <div className="filter-group">
                <label>Помещение</label>
                <input
                    type="text"
                    name="room"
                    placeholder="Все"
                    className="form-control border-0 shadow-none"
                    value={filters.room}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default Filters;
