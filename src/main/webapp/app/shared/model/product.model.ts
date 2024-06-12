import dayjs from 'dayjs';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  sku?: string | null;
  category?: string | null;
  createdAt?: dayjs.Dayjs;
  modifiedAt?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IProduct> = {};
