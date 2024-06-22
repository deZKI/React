import React from 'react';
import './styles/SearchFilter.scss';
import Loupe from "../../icons/Loupe";

interface Props {
    onSearch: (query: string) => void;
}

const SearchFilter: React.FC<Props> = ({onSearch}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Loupe/>
            <input type="text" placeholder="Поиск..." onChange={handleChange}
                   className="form-control border-0 shadow-none"/>
        </div>
    );
};

export default SearchFilter;
