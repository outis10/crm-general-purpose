import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

export interface INotification {
  id?: number;
  type?: keyof typeof NotificationType;
  message?: string;
  read?: boolean | null;
  createdAt?: dayjs.Dayjs;
  userId?: number | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<INotification> = {
  read: false,
};
