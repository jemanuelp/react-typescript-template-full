import {IInvoice} from './IInvoice';

export type InvoicePaymentDetail = {
  invoice: IInvoice;
  paymentDetails: {
    totalDue: string;
    bankName: string;
    country: string;
    iban: string;
    swiftCode: string;
  }
}