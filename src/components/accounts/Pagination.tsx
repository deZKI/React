import React from 'react';
import './styles/Pagination.scss';

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={page === 1}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
            </button>
            <span>{page} из {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6-1.41 1.41z" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
