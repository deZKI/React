import React, {useState, useEffect} from 'react';
import AccountItem from './AccountItem';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';
import {mockData} from '../../stores/mock';
import AccountModal from './AccountModal';
import {IPersonalAccount} from '../../interfaces/personal.account';
import './styles/AccountsList.scss';
import Modal from "react-modal";
import Filters from './Filters';
import {AccountStatus, PurposeType, AccountHolderType} from '../../enums/accounts';
import {FiltersState} from "../../interfaces/personal.filter";

Modal.setAppElement('#root');

const PersonalAccountsList: React.FC = () => {
    const [accounts, setAccounts] = useState<IPersonalAccount[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<IPersonalAccount[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<IPersonalAccount | null>(null);
    const [itemsPerPage, setItemsPerPage] = useState(10); // По умолчанию 10 записей на странице
    const [totalCount, setTotalCount] = useState(0); // Добавляем totalCount
    const [filtersModalOpen, setFiltersModalOpen] = useState(false);
    const [filters, setFilters] = useState<FiltersState>({
        address: '',
        room: '',
        status: 'all',
        purpose: 'all',
        holder: 'all',
    });
    const [tempFilters, setTempFilters] = useState<FiltersState>({...filters});

    useEffect(() => {
        const perPage = itemsPerPage;
        setAccounts(mockData);
        setFilteredAccounts(mockData);
        setTotalCount(mockData.length); // Установка общего количества записей
        setTotalPages(Math.ceil(mockData.length / perPage));
    }, [itemsPerPage]);

    useEffect(() => {
        setPage(1)
    }, [searchQuery, filters])
    useEffect(() => {
        const filtered = accounts.filter(account =>
            (filters.status === 'all' || account.status === filters.status) &&
            (filters.purpose === 'all' || account.purpose === filters.purpose) &&
            (filters.holder === 'all' || account.holder === filters.holder) &&
            (account.address.toLowerCase().includes(filters.address.toLowerCase())) &&
            (account.room.toLowerCase().includes(filters.room.toLowerCase())) &&
            (account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.secondName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.phone.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredAccounts(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setTotalCount(filtered.length); // Обновляем общее количество записей
    }, [searchQuery, accounts, filters, itemsPerPage]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleItemsPerPageChange = (newSize: number) => {
        setItemsPerPage(newSize);
        setPage(1); // Сбрасываем страницу при изменении количества записей на странице
    };

    const handleEdit = (account: IPersonalAccount) => {
        setEditingAccount(account);
        setModalOpen(true);
    };

    const handleSave = (updatedAccount: IPersonalAccount) => {
        if (editingAccount) {
            setAccounts(accounts.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc));
        } else {
            setAccounts([...accounts, updatedAccount]);
        }
        setEditingAccount(null);
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setAccounts(accounts.filter(acc => acc.id !== id));
        setModalOpen(false);
    };

    const handleAdd = () => {
        setEditingAccount(null);
        setModalOpen(true);
    };

    const handleTempFilterChange = (fieldName: keyof FiltersState, value: string | AccountStatus | PurposeType | AccountHolderType) => {
        setTempFilters({...tempFilters, [fieldName]: value});
    };

    const applyFilters = () => {
        setFilters(tempFilters);
        setFiltersModalOpen(false);
    };

    const displayedAccounts = filteredAccounts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="account-list">
            <div className="account-list-header">
                <h1>Лицевые счета </h1>

                <button onClick={handleAdd} className="main-button">Добавить лицевой счет</button>
            </div>

            <div className="account-table">
                <div>
                    <SearchFilter onSearch={handleSearch}/>
                    <button onClick={() => setFiltersModalOpen(true)} className="button">Фильтры</button>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>ЛИЦЕВОЙ СЧЕТ</th>
                        <th>АДРЕС</th>
                        <th>ПОМЕЩЕНИЕ</th>
                        <th>НАЗНАЧЕНИЕ ПОМЕЩЕНИЯ</th>
                        <th>ФИО</th>
                        <th>ТЕЛЕФОН</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedAccounts.map(account => (
                        <AccountItem key={account.id} account={account} onEdit={handleEdit}/>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalCount={totalCount}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
                <AccountModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} account={editingAccount}
                              onSave={handleSave} onDelete={handleDelete}/>
            </div>

            <Modal
                isOpen={filtersModalOpen}
                onRequestClose={() => setFiltersModalOpen(false)}
                className="filters-modal"
                overlayClassName="filters-modal-overlay"
            >
                <Filters onFilterChange={handleTempFilterChange} filters={tempFilters}/>
                <button onClick={applyFilters} className="button">Применить</button>
            </Modal>
        </div>
    );
};

export default PersonalAccountsList;
