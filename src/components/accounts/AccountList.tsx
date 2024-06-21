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
import Bar from "../../icons/Bar";

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

    // Добавляем состояние для сортировки
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

        // Применяем сортировку
        const sorted = applySorting(filtered, sortColumn, sortDirection);
        setFilteredAccounts(sorted);
        setTotalPages(Math.ceil(sorted.length / itemsPerPage));
        setTotalCount(sorted.length); // Обновляем общее количество записей
    }, [searchQuery, accounts, filters, itemsPerPage, sortColumn, sortDirection]);

    const applySorting = (
        data: IPersonalAccount[],
        column: string | null,
        direction: 'asc' | 'desc'
    ): IPersonalAccount[] => {
        if (!column) return data;

        const sortedData = [...data];
        sortedData.sort((a, b) => {
            const valueA = a[column as keyof IPersonalAccount];
            const valueB = b[column as keyof IPersonalAccount];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }

            return direction === 'asc' ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
        });

        return sortedData;
    };

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

    const handleTempFilterChange = (
        fieldName: keyof FiltersState,
        value: string | AccountStatus | PurposeType | AccountHolderType
    ) => {
        setTempFilters({...tempFilters, [fieldName]: value});
    };

    const applyFilters = () => {
        setFilters(tempFilters);
        setFiltersModalOpen(false);
    };

    const handleSort = (column: string) => {
        if (column === sortColumn) {
            // Если уже выбран этот столбец, меняем направление сортировки
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Если выбран новый столбец, сортируем по нему по умолчанию по возрастанию
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const displayedAccounts = filteredAccounts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="account-list">
            <div className="account-list-header">
                <h1>Лицевые счета </h1>
                <button onClick={handleAdd} className="btn btn-primary">Добавить лицевой счет</button>
            </div>

            <div className="account-list-body">
                <div className="d-flex align-items-center">
                    <div style={{flex: 1}}><SearchFilter onSearch={handleSearch}/></div>
                    <button onClick={() => setFiltersModalOpen(true)}
                            className="flex-shrink-0 btn btn-outline-secondary btn-sm">
                        <Bar></Bar>Фильтры
                    </button>
                </div>
                <table className="table account-table">
                    <thead>
                    <tr>
                        <th onClick={() => handleSort('id')} title="Нажмите для сортировки по ID">ID</th>
                        <th onClick={() => handleSort('accountNumber')} title="Нажмите для сортировки по счету ">ЛИЦЕВОЙ
                            СЧЕТ
                        </th>
                        <th onClick={() => handleSort('address')} title="Нажмите для сортировки по адресу">АДРЕС</th>
                        <th onClick={() => handleSort('room')} title="Нажмите для сортировки по помещению">ПОМЕЩЕНИЕ
                        </th>
                        <th onClick={() => handleSort('purpose')}
                            title="Нажмите для сортировки по назначению помещений">НАЗНАЧЕНИЕ ПОМЕЩЕНИЯ
                        </th>
                        <th onClick={() => handleSort('lastName')} title="Нажмите для сортировки фамилии">ФИО</th>
                        <th onClick={() => handleSort('phone')} title="Нажмите для сортировки номеру телефона">ТЕЛЕФОН
                        </th>

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
                <div className="d-flex flex-column flex-end">
                    <Filters onFilterChange={handleTempFilterChange} filters={tempFilters}/>
                    <button onClick={applyFilters} className="btn btn-primary">Применить</button>
                </div>
            </Modal>
        </div>
    );
};

export default PersonalAccountsList;
