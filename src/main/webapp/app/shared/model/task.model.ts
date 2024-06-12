import dayjs from 'dayjs';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { IUser } from 'app/shared/model/user.model';
import { IContact } from 'app/shared/model/contact.model';

export interface ITask {
  id?: number;
  name?: string;
  dueAt?: dayjs.Dayjs;
  completed?: boolean | null;
  description?: string | null;
  priority?: string | null;
  assignedAt?: dayjs.Dayjs | null;
  completedAt?: dayjs.Dayjs | null;
  opportunity?: IOpportunity | null;
  assignedTo?: IUser | null;
  contacts?: IContact[] | null;
}

export const defaultValue: Readonly<ITask> = {
  completed: false,
};
