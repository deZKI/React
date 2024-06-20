import {AccountStatus} from '../enums/accounts.status';
import {IPersonalAccount} from "../interfaces/personal.account";
import {PurposeType} from "../enums/accounts.purpose";
import {AccountHolderType} from "../enums/accounts.holders";

export const mockData: IPersonalAccount[] = [
    {
        id: 1,
        status: AccountStatus.Active,
        purpose: PurposeType.Residential,
        holder: AccountHolderType.Individual,
        accountNumber: '12345678',
        company: 'ООО "Компания А"',
        address: 'ул. Главная, д. 1',
        room: 'Комната 101',
        firstName: 'Иван',
        secondName: 'Иванович',
        lastName: 'Иванов',
        organization: 'ИП "Организация А"',
        email: 'ivan.ivanov@example.com',
        phone: '+7-123-456-78-90',
    },
    {
        id: 2,
        status: AccountStatus.Closed,
        purpose: PurposeType.NonResidential,
        holder: AccountHolderType.LegalEntity,
        accountNumber: '87654321',
        company: 'ЗАО "Компания Б"',
        address: 'пр. Дубовый, д. 45',
        room: 'Офис 202',
        firstName: 'Елена',
        secondName: 'Петровна',
        lastName: 'Сидорова',
        organization: 'ООО "Организация Б"',
        email: 'elena.sidorova@example.com',
        phone: '+7-987-654-32-10',
    },
];
