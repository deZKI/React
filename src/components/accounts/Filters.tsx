import React from 'react';
import { AccountStatus, AccountHolderType, PurposeType } from '../../enums/accounts';
import { FiltersState } from '../../interfaces/personal.filter';
import RadioSelector from '../shared/radio.selector';
import './styles/Filters.scss';

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
            <div className="filter-group">
                <label>Статус</label>
                <RadioSelector
                    options={[
                        { label: 'Все', value: 'all' },
                        { label: 'Активный', value: AccountStatus.Active },
                        { label: 'Закрытый', value: AccountStatus.Closed },
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
                        { label: 'Все', value: 'all' },
                        { label: 'Жилой', value: PurposeType.Residential },
                        { label: 'Нежилой', value: PurposeType.NonResidential },
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
                        { label: 'Все', value: 'all' },
                        { label: 'Физическое лицо', value: AccountHolderType.Individual },
                        { label: 'Юридическое лицо', value: AccountHolderType.LegalEntity },
                    ]}
                    name="holder"
                    selectedValue={filters.holder}
                    onChange={(value) => onFilterChange('holder', value)}
                />
            </div>
        </div>
    );
};

export default Filters;
