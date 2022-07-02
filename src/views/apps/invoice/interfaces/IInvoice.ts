import {ClientInterface} from './ClientInterface';

export interface IInvoice {
    id: number;
    issuedDate: string;
    client: ClientInterface;
    service: string;
    total: number;
    avatar: string;
    invoiceStatus: string;
    balance: number | string;
    dueDate: string;
}