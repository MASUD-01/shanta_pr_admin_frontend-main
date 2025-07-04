export interface IExpense {
  account_id: number;
  id: number;
  method: string;
  amount: string;
  date: string;
  note: string;
  expense_head_name: string;
  expense_sub_head_name: string;
  account_name: string;
  created_by: string;
  expense_head_id: number;
  expense_no: string;
  expense_sub_head_id: number;
}

export interface IExpenseSubHead {
  id: number;
  name: string;
}

export interface ISingleExpense {
  id: number;
  method: string;
  amount: string;
  date: string;
  note: null | string;
  created_by: string;
  expense_name: string;
  sub_expense: string;
  account_name: string;
  created_at: string;
  expense_date: string;
  expense_no: string;
  head_name: string;
  sub_head_expense: string;
  unique_cheque_no: string;
}
