import dayjs from 'dayjs';
import { IContact } from 'app/shared/model/contact.model';
import { OpportunityStage } from 'app/shared/model/enumerations/opportunity-stage.model';

export interface IOpportunity {
  id?: number;
  name?: string;
  amount?: number;
  probability?: number;
  expectedCloseDate?: dayjs.Dayjs;
  stage?: keyof typeof OpportunityStage;
  description?: string | null;
  createdAt?: dayjs.Dayjs;
  modifiedAt?: dayjs.Dayjs | null;
  closedAt?: dayjs.Dayjs | null;
  contact?: IContact | null;
}

export const defaultValue: Readonly<IOpportunity> = {};
