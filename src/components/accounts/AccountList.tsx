import React, {useState, useEffect} from 'react';
import AccountItem from './AccountItem';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';
import {mockData} from '../../stores/mock';
import AccountModal from './AccountModal';
import {IPersonalAccount} from '../../interfaces/personal.account';
import './styles/AccountsList.scss';

const PersonalAccountsList: React.FC = () => {
    const [accounts, setAccounts] = useState<IPersonalAccount[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<IPersonalAccount[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<IPersonalAccount | null>(null);

    useEffect(() => {
        const perPage = 10;
        setAccounts(mockData);
        setFilteredAccounts(mockData);
        setTotalPages(Math.ceil(mockData.length / perPage));
    }, []);

    useEffect(() => {
        const filtered = accounts.filter(account =>
            account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.phone.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAccounts(filtered);
        setTotalPages(Math.ceil(filtered.length / 10));
    }, [searchQuery, accounts]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
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

    const handleAdd = () => {
        setEditingAccount(null);
        setModalOpen(true);
    };

    const displayedAccounts = filteredAccounts.slice((page - 1) * 10, page * 10);

    return (
        <div className="table-container">
            <h1>Personal Accounts</h1>
            <SearchFilter onSearch={handleSearch}/>
            <button onClick={handleAdd} className="button">Add Account</button>
            <table className="table">
                <thead>
                <tr>
                    <th>ЛИЦЕВОЙ СЧЕТ</th>
                    <th>АДРЕС</th>
                    <th>ПОМЕЩЕНИЕ</th>
                    <th>НАЗНАЧЕНИЕ ПОМЕЩЕНИЯ</th>
                    <th>ФИО</th>
                    <th>ТЕЛЕФОН</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {displayedAccounts.map(account => (
                    <AccountItem key={account.id} account={account} onEdit={handleEdit}/>
                ))}
                </tbody>
            </table>
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            <AccountModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} account={editingAccount}
                          onSave={handleSave}/>
        </div>
    );
};

export default PersonalAccountsList;
