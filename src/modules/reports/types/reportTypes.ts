export interface IClientLedgerReport {
  last_due: number;
  data: IClientLedger[];
}
export interface IClientLedger {
  id: string;
  voucher_no: string;
  amount: string;
  type: string;
  details: string;
  ledger_date: string;
  tr_type: string;
  client_id: number;
  client_name: string;
  created_by_id: number;
  created_by: string;
  payment_method: string;
  due: string;
  client_no: string;
  particular: string;
}
export interface IClientLedgerParams {
  client_id?: number;
  start_date?: string;
  end_date?: string;
}

export interface ISalesReport {
  id: number;
  invoice_no: string;
  invoice_date: string;
  due_date: string;
  discount: string;
  vat: string;
  net_total: string;
  client_name: string;
  sale_by: string;
  due: string;
  sub_total: string;
  extra_charge: string;
  collected_amount: string;
  collection: string;
  sale_products: SaleProduct[];
}
export interface ISubscriptionReport {
  id: number;
  company_id: number;
  product_id: number;
  client_id: number;
  last_payment_date: string;
  expire_date: string;
  subscription_amount: string;
  last_paid_amount: string;
  last_collected_by: number;
  last_feedback: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  sold_date: string;
  status: string;
  client_name: string;
  client_no: string;
  product_name: string;
  last_collected_by_name: string;
  client_address: string;
  client_email: string;
  client_phone: string;
  period: string;
}

export interface SaleProduct {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
}

export interface ICollectionReport {
  id: number;
  money_receipt_no: string;
  paid_amount: string;
  payment_date: string;
  client_name: string;
  client_id: number;
  collected_by: string;
  created_by: string;
}

export interface IClientPaymentHistory {
  id: number;
  client_name: string;
  status: string;
  product_name: null | string;
  amount: null | string;
  method: null | string;
  payment_date: null;
  created_at: string;
}

export interface IExpenseHead {
  id: number;
  expense_head_name: string;
  amount: string;
  date: string;
  note: string;
}
export interface IExpenseHeadParams {
  head_id?: { value: number; label: string };
  sub_head_id?: { value: number; label: string };
  start_time?: string;
  end_time?: string;
  created_by?: { value: number; label: string };
  limit?: number;
  skip?: number;
}

export interface IExpenseSubHeadReport {
  id: number;
  expense_head_name: string;
  expense_sub_head_name: string;
  amount: string;
  date: string;
  note: string;
  employee_name: string;
  created_by: string;
  expense_no: string;
  account_name: string;
  method: string;
}

export interface IClientDiscount {
  client_id: number;
  client_name: string;
  created_by: string;
  date: string;
  discount: string;
  voucher_no: string;
}

export interface IAccountReport {
  opening_balance: `${number}`;
  ledger: IAccountAllData[];
}
export interface IAccountAllData {
  id: string;
  voucher_no: string;
  amount: string;
  type: string;
  payment_method: string;
  details: string;
  ledger_date: string;
  account_name: string;
  created_by: string;
  tr_type: string;
  particular: string;
  running_balance: `${number}`;
}
export interface IAccountLedger {
  id: string;
  voucher_no: string;
  amount: string;
  type: string;
  payment_method: string;
  details: string;
  ledger_date: string;
  account_name: string;
  created_by: string;
  tr_type: string;
  particular: string;
}

export interface IViewAuditTrails {
  id: number;
  details: string;
  company_id: number;
  created_by: number;
  created_at: string;
}

export interface IExpenseDetails {
  total_expense: string;
  expense_head: string;
  sub_head_name: string;
  amount: string;
}

export interface IIncomeDetails {
  invoice_id: number;
  invoice_date: string;
  items: [
    {
      item_id: number;
      unit_price: number;
      quantity: number;
      product_name: string;
    }
  ];
}

export interface IViewProfitLoss {
  category?: string;
  amount?: string;
}

export interface IInvestment {
  investment_id: number;
  invested_by: string;
  receiver: string;
  purpose: string;
  date: string;
  amount: string;
  payment_method: string;
  bank_name: string;
  created_data: null;
}

export interface IInvestmentReport {
  data: IInvestment[];
  summary: {
    invesment_no: number;
    total_investment_amount: number;
  };
}

export interface ILoanType {
  installment_id: number;
  installment_date: string;
  installment_amount: string;
  remaining_due: string;
  last_date: string;
  loan_amount: string;
  loan_from: string;
}

export interface ILoanReport {
  data: ILoanType[];
  summary: {
    total_loan_no: number;
    total_loan_amount: number;
    total_paid_amount: number;
    total_remaining_due: number;
  };
}
