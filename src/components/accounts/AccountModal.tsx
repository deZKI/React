import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IPersonalAccount } from '../../interfaces/personal.account';
import './styles/AccountModal.scss';
import { AccountStatus, AccountHolderType, PurposeType } from "../../enums/accounts";
import RadioSelector from "../shared/radio.selector";
import XMark from "../../icons/Xmark";

interface AccountModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    account: IPersonalAccount | null;
    onSave: (account: IPersonalAccount) => void;
    onDelete: (id: number) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onRequestClose, account, onSave, onDelete }) => {
    const initialFormData: IPersonalAccount = {
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
    };

    const [formData, setFormData] = useState<IPersonalAccount>(initialFormData);
    const [formErrors, setFormErrors] = useState<Partial<IPersonalAccount>>({});
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    useEffect(() => {
        if (account) {
            setFormData(account);
        } else {
            setFormData(initialFormData);
        }
        setFormErrors({});
    }, [account, isOpen]);

    const validateForm = (): boolean => {
        const errors: Partial<IPersonalAccount> = {};

        if (!formData.accountNumber) {
            errors.accountNumber = 'Введите номер лицевого счета';
        }
        if (!formData.address) {
            errors.address = 'Введите адрес';
        }
        if (!formData.room) {
            errors.room = 'Введите номер помещения';
        }
        if (!formData.firstName) {
            errors.firstName = 'Введите имя';
        }
        if (!formData.lastName) {
            errors.lastName = 'Введите фамилию';
        }
        if (!formData.phone) {
            errors.phone = 'Введите номер телефона';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            onSave({ ...formData, id: formData.id || Date.now() });
            onRequestClose();
        }
    };

    const handleRadioChange = (value: any, fieldName: string) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleDelete = () => {
        if (formData.id) {
            onDelete(formData.id);
            onRequestClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className="account-modal">
                <div className="account-modal-header">
                    <div><h2>{account ? `Лицевой счет: ${formData.accountNumber}` : 'Добавление'}</h2></div>
                    <button className="button account-modal__close-button" onClick={() => onRequestClose()}>
                        <XMark width="32" height="32" />
                    </button>
                </div>
                <form className="account-modal-form" onSubmit={handleSubmit}>
                    <div className="account-modal-choices gap-4">
                        <div className="form-group">
                            <RadioSelector
                                options={[
                                    { label: AccountStatus.Active, value: AccountStatus.Active },
                                    { label: AccountStatus.Closed, value: AccountStatus.Closed }
                                ]}
                                name="status"
                                selectedValue={formData.status}
                                onChange={(value) => handleRadioChange(value, 'status')}
                            />
                        </div>
                        <div className="form-group">
                            <RadioSelector
                                options={[
                                    { label: PurposeType.Residential, value: PurposeType.Residential },
                                    { label: PurposeType.NonResidential, value: PurposeType.NonResidential }
                                ]}
                                name="purpose"
                                selectedValue={formData.purpose}
                                onChange={(value) => handleRadioChange(value, 'purpose')}
                            />
                        </div>
                        <div className="form-group">
                            <RadioSelector
                                options={[
                                    { label: AccountHolderType.Individual, value: AccountHolderType.Individual },
                                    { label: AccountHolderType.LegalEntity, value: AccountHolderType.LegalEntity }
                                ]}
                                name="holder"
                                selectedValue={formData.holder}
                                onChange={(value) => handleRadioChange(value, 'holder')}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountNumber">ЛИЦЕВОЙ СЧЕТ</label>
                        <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className={formErrors.accountNumber ? 'error' : ''}
                        />
                        {formErrors.accountNumber && <div className="error-message">{formErrors.accountNumber}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">АДРЕС</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={formErrors.address ? 'error' : ''}
                        />
                        {formErrors.address && <div className="error-message">{formErrors.address}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="room">ПОМЕЩЕНИЕ</label>
                        <input
                            type="text"
                            name="room"
                            value={formData.room}
                            onChange={handleChange}
                            className={formErrors.room ? 'error' : ''}
                        />
                        {formErrors.room && <div className="error-message">{formErrors.room}</div>}
                    </div>
                    <div className="row">
                        <div className="col form-group">
                            <label htmlFor="firstName">Имя</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={formErrors.firstName ? 'error' : ''}
                            />
                            {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
                        </div>
                        <div className="col form-group">
                            <label htmlFor="lastName">Фамилия</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={formErrors.lastName ? 'error' : ''}
                            />
                            {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">ТЕЛЕФОН</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={formErrors.phone ? 'error' : ''}
                        />
                        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="secondName">Отчество</label>
                        <input
                            type="text"
                            name="secondName"
                            value={formData.secondName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row">
                        <div className="col form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={formErrors.email ? 'error' : ''}
                            />
                            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                        </div>
                        <div className="col form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={formErrors.phone ? 'error' : ''}
                            />
                            {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                        </div>
                    </div>

                    <div className="row gap-4">
                        {account && (
                            <button type="button" className="col btn btn-outline-danger"
                                    onClick={() => setIsConfirmModalOpen(true)}>Удалить</button>
                        )}

                        <button type="submit"
                                className=" col btn w-100 btn btn-primary">{account ? 'Сохранить' : 'Добавить'}</button>
                    </div>
                </form>
            </div>

            {/* Модальное окно подтверждения удаления */}
            <Modal isOpen={isConfirmModalOpen} onRequestClose={() => setIsConfirmModalOpen(false)}>
                <div className="confirm-modal">
                    <h3>Вы уверены, что хотите удалить этот лицевой счет?</h3>
                    <div className="confirm-modal-actions">
                        <button className="btn btn-outline-secondary" onClick={() => setIsConfirmModalOpen(false)}>Отмена</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
                    </div>
                </div>
            </Modal>
        </Modal>
    );
};

export default AccountModal;
