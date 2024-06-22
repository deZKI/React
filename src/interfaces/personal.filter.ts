import {AccountStatus, AccountHolderType, PurposeType} from "../enums/accounts";

export interface FiltersState {
    address: string;
    room: string;
    status: AccountStatus | 'all'; // Добавлен тип 'all' для фильтра status
    purpose: PurposeType | 'all'; // Добавлен тип 'all' для фильтра purpose
    holder: AccountHolderType | 'all'; // Добавлен тип 'all' для фильтра holder
}
