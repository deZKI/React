import {IPersonalAccount} from "../interfaces/personal.account";


export const mockData: IPersonalAccount[] = [
    { id: 1, accountNumber: "12345", address: "Street 1, City", room: "Room 101", purpose: "Residential", fullName: "John Doe", phone: "+123456789" },
    { id: 2, accountNumber: "67890", address: "Street 2, City", room: "Room 102", purpose: "Commercial", fullName: "Jane Smith", phone: "+987654321" },
];
