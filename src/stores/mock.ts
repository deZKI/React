import { IPersonalAccount } from "../interfaces/personal.account";
import { PurposeType, AccountHolderType, AccountStatus } from "../enums/accounts";

// Генерация данных
const generateMockData = (): IPersonalAccount[] => {
    const data: IPersonalAccount[] = [];
    const numberOfRecords = 1000; // Желаемое количество записей

    for (let i = 1; i <= numberOfRecords; i++) {
        const id = i;
        const status = i % 2 === 0 ? AccountStatus.Active : AccountStatus.Closed;
        const purpose = i % 3 === 0 ? PurposeType.Residential : PurposeType.NonResidential;
        const holder = i % 4 === 0 ? AccountHolderType.LegalEntity : AccountHolderType.Individual;
        const accountNumber = `${Math.floor(Math.random() * 100000000)}`.padStart(8, '0');
        const company = `ООО "Компания ${String.fromCharCode(65 + i % 26)}"`;
        const address = `ул. Примерная, д. ${i * 2}`;
        const room = `Комната ${i}`;
        const firstName = 'Имя';
        const secondName = 'Отчество';
        const lastName = `Фамилия ${i}`;
        const organization = `Организация ${String.fromCharCode(65 + i % 26)}`;
        const email = `person.${i}@example.com`;
        const phone = `+7-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}`;

        data.push({
            id,
            status,
            purpose,
            holder,
            accountNumber,
            company,
            address,
            room,
            firstName,
            secondName,
            lastName,
            organization,
            email,
            phone,
        });
    }

    return data;
};

export const mockData: IPersonalAccount[] = generateMockData();
