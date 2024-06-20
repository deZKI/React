import {AccountStatus} from "../enums/accounts.status";
import {PurposeType} from "../enums/accounts.purpose";
import {AccountHolderType} from "../enums/accounts.holders";

export interface FiltersState {
    address: string;
    room: string;
    status: AccountStatus | 'all'; // Добавлен тип 'all' для фильтра status
    purpose: PurposeType | 'all'; // Добавлен тип 'all' для фильтра purpose
    holder: AccountHolderType | 'all'; // Добавлен тип 'all' для фильтра holder
}
