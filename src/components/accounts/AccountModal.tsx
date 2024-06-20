import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import {IPersonalAccount} from '../../interfaces/personal.account';
import './styles/AccountModal.scss';
import {AccountStatus} from "../../enums/accounts.status";
import {PurposeType} from "../../enums/accounts.purpose";
import {AccountHolderType} from "../../enums/accounts.holders";
import RadioSelector from "../shared/radio.selector";

interface AccountModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    account: IPersonalAccount | null;
    onSave: (account: IPersonalAccount) => void;
    onDelete: (id: number) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({isOpen, onRequestClose, account, onSave, onDelete}) => {
    const [formData, setFormData] = useState<IPersonalAccount>({
        id: 0,
        accountNumber: '',
        address: '',
        room: '',
        status: AccountStatus.Active,
        purpose: PurposeType.Residential,
        holder: AccountHolderType.Individual,
        firstName: '',
        secondName: '',
        lastName: '',
        phone: '',
        company: '',
        organization: '',
        email: ''
    });

    useEffect(() => {
        if (account) {
            setFormData(account);
        } else {
            setFormData({
                id: 0,
                accountNumber: '',
                address: '',
                room: '',
                status: AccountStatus.Active,
                purpose: PurposeType.Residential,
                holder: AccountHolderType.Individual,
                firstName: '',
                secondName: '',
                lastName: '',
                phone: '',
                company: '',
                organization: '',
                email: ''
            });
        }
    }, [account]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave({...formData, id: formData.id || Date.now()});
        onRequestClose();
    };

    const handleRadioChange = (value: any, fieldName: string) => {
        setFormData({...formData, [fieldName]: value});
    };

    const handleDelete = () => {
        if (formData.id) {
            onDelete(formData.id);
            onRequestClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Account Modal" className="account-modal">
            <h2>{account ? 'Edit Account' : 'Add Account'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Статус</label>
                    <RadioSelector
                        options={[
                            {label: AccountStatus.Active, value: AccountStatus.Active},
                            {label: AccountStatus.Closed, value: AccountStatus.Closed}
                        ]}
                        name="status"
                        selectedValue={formData.status}
                        onChange={(value) => handleRadioChange(value, 'status')}
                    />
                </div>
                <div className="form-group">
                    <label>Назначение</label>
                    <RadioSelector
                        options={[
                            {label: PurposeType.Residential, value: PurposeType.Residential},
                            {label: PurposeType.NonResidential, value: PurposeType.NonResidential}
                        ]}
                        name="purpose"
                        selectedValue={formData.purpose}
                        onChange={(value) => handleRadioChange(value, 'purpose')}
                    />
                </div>
                <div className="form-group">
                    <label>Держатель</label>
                    <RadioSelector
                        options={[
                            {label: AccountHolderType.Individual, value: AccountHolderType.Individual},
                            {label: AccountHolderType.LegalEntity, value: AccountHolderType.LegalEntity}
                        ]}
                        name="holder"
                        selectedValue={formData.holder}
                        onChange={(value) => handleRadioChange(value, 'holder')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="accountNumber">ЛИЦЕВОЙ СЧЕТ</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber}
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">АДРЕС</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="room">ПОМЕЩЕНИЕ</label>
                    <input type="text" name="room" value={formData.room} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Имя</label>
                    <input type="text" name="firstName" value={formData.firstName}
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="middleName">Отчество</label>
                    <input type="text" name="middleName" value={formData.secondName}
                           onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Фамилия</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">ТЕЛЕФОН</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange}/>
                </div>
                <button type="submit" className="button">{account ? 'Сохранить' : 'Добавить'}</button>
                {account && (
                    <button type="button" className="button" onClick={handleDelete}>Удалить</button>
                )}
            </form>
        </Modal>
    );
};

export default AccountModal;
