export interface IMoneyReceipt {
  id: number;
  payment_date: string;
  client_name: string;
   account_name: string;
  money_receipt_no: string;
  payment_method: string;
  paid_amount: string;
  discount: number;
  client_id: number;
  invoice_total: string;
  extra_charge: string;
  client_no: string;
}

export interface ISingleMoneyReceipt {
  account_branch: null | string;
  account_name: null | string;
  account_no: null | string;
  bank_name: null | string;
  cheque_number: null | string;
  client_name: string;
  created_at: string;
  discount: null | string;
  extra_charge: null | string;
  id: number;
  invoice_total: string;
  money_receipt_no: string;
  note: null | string;
  paid_amount: string;
  payment_date: string;
  payment_method: string;
  remark: null | string;
  collected_by: null | string;
  transaction_no: null | string; //manual money receipt number
  created_by: string;
  invoices: {
    id: number;
    invoice_no: string;
    paid_amount: string;
  }[];
}
