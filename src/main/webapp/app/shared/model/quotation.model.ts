import dayjs from 'dayjs';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { IProduct } from 'app/shared/model/product.model';
import { QuotationStatus } from 'app/shared/model/enumerations/quotation-status.model';

export interface IQuotation {
  id?: number;
  createdAt?: dayjs.Dayjs;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  status?: keyof typeof QuotationStatus;
  expiredAt?: dayjs.Dayjs;
  comments?: string | null;
  opportunity?: IOpportunity | null;
  product?: IProduct | null;
}

export const defaultValue: Readonly<IQuotation> = {};
