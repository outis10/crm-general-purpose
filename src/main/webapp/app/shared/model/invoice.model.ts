import dayjs from 'dayjs';
import { IOrder } from 'app/shared/model/order.model';
import { InvoiceStatus } from 'app/shared/model/enumerations/invoice-status.model';

export interface IInvoice {
  id?: number;
  createdAt?: dayjs.Dayjs;
  dueAt?: dayjs.Dayjs;
  amount?: number;
  status?: keyof typeof InvoiceStatus;
  comments?: string | null;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IInvoice> = {};
