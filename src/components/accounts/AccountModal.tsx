import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import {IPersonalAccount} from '../../interfaces/personal.account';
import './styles/AccountModal.scss';

interface AccountModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    account: IPersonalAccount | null;
    onSave: (account: IPersonalAccount) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({isOpen, onRequestClose, account, onSave}) => {
    const [formData, setFormData] = useState<IPersonalAccount>({
        id: 0,
        accountNumber: '',
        address: '',
        room: '',
        purpose: '',
        fullName: '',
        phone: ''
    });

    useEffect(() => {
        if (account) {
            setFormData(account);
        } else {
            setFormData({id: 0, accountNumber: '', address: '', room: '', purpose: '', fullName: '', phone: ''});
        }
    }, [account]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({...formData, id: formData.id || Date.now()});
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Account Modal" className="account-modal">
            <h2>{account ? 'Edit Account' : 'Add Account'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange}
                       placeholder="ЛИЦЕВОЙ СЧЕТ"/>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="АДРЕС"/>
                <input type="text" name="room" value={formData.room} onChange={handleChange} placeholder="ПОМЕЩЕНИЕ"/>
                <input type="text" name="purpose" value={formData.purpose} onChange={handleChange}
                       placeholder="НАЗНАЧЕНИЕ ПОМЕЩЕНИЯ"/>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="ФИО"/>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="ТЕЛЕФОН"/>
                <button type="submit" className="button">{account ? 'Save' : 'Add'}</button>
            </form>
        </Modal>
    );
};

export default AccountModal;
