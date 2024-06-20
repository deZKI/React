import React from 'react';
import { IPersonalAccount } from '../../interfaces/personal.account';
import './styles/AccountItem.scss';

interface Props {
    account: IPersonalAccount;
    onEdit: (account: IPersonalAccount) => void;
}

const AccountItem: React.FC<Props> = ({ account, onEdit }) => (
    <tr>
        <td>{account.accountNumber}</td>
        <td>{account.address}</td>
        <td>{account.room}</td>
        <td>{account.purpose}</td>
        <td>{account.fullName}</td>
        <td>{account.phone}</td>
        <td>
            <button onClick={() => onEdit(account)}>Edit</button>
        </td>
    </tr>
);

export default AccountItem;
