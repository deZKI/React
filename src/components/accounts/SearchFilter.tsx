import React from 'react';
import './styles/SearchFilter.scss';

interface Props {
    onSearch: (query: string) => void;
}

const SearchFilter: React.FC<Props> = ({ onSearch }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <input type="text" placeholder="Search..." onChange={handleChange} className="search-input" />
    );
};

export default SearchFilter;
