export interface IAccountGroup {
  id: number;
  code: string;
  name: string;
}

export interface IAccoutHeadAll {
  id: number;
  code: string;
  parent_id: number;
  name: string;
  group_name: string;
  children?: IAccoutHeadAllChildren[];
}

export interface IAccoutHeadAllChildren {
  id: number;
  code: string;
  parent_id: number;
  name: string;
  group_name: string;
}

export interface IAccountHeadParams {
  name?: string;
  group_id?: number;
  parent_id?: number;
}

export interface ICreateAccount {
  group_id: number;
  parent_head?: number;
  name: string;
  description?: string;
}

export interface IAllAccount {
  id: number;
  name: string;
  branch: null | string;
  account_type: string;
  bank_name: null | string;
  routing_no: null | string;
  account_no: string;
  balance: string;
}
export interface ICAccount {
  name: string;
  branch: string;
  opening_balance: string;
  account_no: string;
  account_date: string;
}

export interface IAddBalance {
  id: number;
  amount: string;
  type: string;
  date: string;
  payment_method: string;
  extra_charge: string;
  account_name: string;
  created_by: string;
}

export interface IBalanceTransfer {
  id: number;
  amount: string;
  date: string;
  from_ac_name: string;
  from_ac_branch: string;
  from_ac_no: string;
  to_ac_name: string;
  to_ac_branch: string;
  to_ac_no: string;
  created_by: string;
}

export interface IStatement {
  id: number;
  name: string;
  date: string;
  credit: string;
  debit: string;
  balance: string;
}

export interface ITransactionHistory {
  id: string;
  voucher_no: null | string;
  amount: string;
  type: string;
  payment_method: null | string;
  purpose: string;
  details: string;
  ledger_date: string;
  account_name: string;
  created_by: string;
  last_balance: string;
}

export interface IFilterItem {
  start_date: string;
  end_date: string;
  account_id?: number;
  limit?: number;
  skip?: number;
}
