import {AccountStatus, AccountHolderType, PurposeType} from "../enums/accounts";

export interface IPersonalAccount {
    id: number;

    status: AccountStatus
    purpose: PurposeType
    holder: AccountHolderType

    accountNumber: string; // Лицевой счет
    company: string; // Компания
    address: string; // Дом
    room: string; // Помещение
    firstName: string // Имя
    secondName: string // Отчество
    lastName: string // Фамилия
    organization: string // Название организации
    email: string  // Email
    phone: string; // Телефон
}
