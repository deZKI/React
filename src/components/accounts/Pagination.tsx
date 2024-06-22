import React from 'react';
import './styles/Pagination.scss';
import Arrow from "../../icons/Arrow";

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    totalCount: number;
    itemsPerPage: number;
    onItemsPerPageChange: (newSize: number) => void;
}

const itemsPerPageOptions = [10, 30, 50, 100]; // сколько отображаем

const Pagination: React.FC<Props> = ({
                                         page,
                                         totalPages,
                                         onPageChange,
                                         totalCount,
                                         itemsPerPage,
                                         onItemsPerPageChange,
                                     }) => {
    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value, 10);
        onItemsPerPageChange(newSize);
    };

    return (
        <div className="pagination">
            <div>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div className="pagination-info">
                <button onClick={handlePrev} disabled={page === 1}>
                    <Arrow></Arrow>
                </button>

                <span>{page} из {totalPages}</span>

                <button style={{transform: "scale(-1, 1)"}} onClick={handleNext} disabled={page === totalPages}>
                    <Arrow></Arrow>
                </button>
            </div>

            <div className="pagination-summary">
                <div>Всего: {totalCount}</div>
                <div>На странице  {Math.min(totalCount, itemsPerPage * (page - 1) + 1)} - {Math.min(totalCount, itemsPerPage * page)} </div>
            </div>

        </div>
    );
};

export default Pagination;
