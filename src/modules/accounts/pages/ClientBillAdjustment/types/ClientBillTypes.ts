import { Dayjs } from 'dayjs';

export interface IClientBillAdjustment {
  id: number;
  amount: string;
  adjust_client_balance_no: string;
  type: string;
  create_date: string;
  payment_method: string;
  extra_charge: string;
  client_name: string;
  created_by: string;
}

export interface ICreateClientBalance {
  client_id: number;
  amount: number;
  create_date: Date;
  payment_method: string;
  type: string;
}

export interface ISearchBalanceTransfer {
  from_date?: string | Dayjs;
  to_date?: string | Dayjs;
  balance_transfer_no?: string;
  from_account?: string;
  to_account?: string;
  name?: string;
  limit?: string | number;
  skip?: string | number;
}
