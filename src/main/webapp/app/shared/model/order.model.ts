import dayjs from 'dayjs';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { IProduct } from 'app/shared/model/product.model';
import { IQuotation } from 'app/shared/model/quotation.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  createdAt?: dayjs.Dayjs;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  status?: keyof typeof OrderStatus;
  shippingAt?: dayjs.Dayjs | null;
  comments?: string | null;
  opportunity?: IOpportunity | null;
  product?: IProduct | null;
  quotation?: IQuotation | null;
}

export const defaultValue: Readonly<IOrder> = {};
