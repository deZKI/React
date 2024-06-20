import React from 'react';
import {IPersonalAccount} from '../../interfaces/personal.account';
import './styles/AccountItem.scss';

interface Props {
    account: IPersonalAccount;
    onEdit: (account: IPersonalAccount) => void;
}

const AccountItem: React.FC<Props> = ({account, onEdit}) => {
    const fullName = `${account.lastName} ${account.firstName} ${account.secondName}`;

    return (
        <tr className="account-row" onClick={() => onEdit(account)}>
            <td>{account.accountNumber}</td>
            <td>{account.address}</td>
            <td>{account.room}</td>
            <td>{account.purpose}</td>
            <td>{fullName}</td>
            <td>{account.phone}</td>
        </tr>
    )
};

export default AccountItem;
