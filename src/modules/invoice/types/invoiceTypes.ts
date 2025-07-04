export interface IInvoice {
  id: number;
  invoice_date: string;
  due_date: string;
  invoice_no: string;
  net_total: string;
  due: string;
  client_id: number;
  client_no: string;
  client_name: string;
  client_mobile: string;
}

export interface IInvoiceProductItem {
  id: number;
  invoice_id: number;
  unit_price: string;
  created_at: string;
  description: string;
  quantity: number;
  product_name: string;
  product_id: number;
}
export interface ISingleInvoice {
  invoice_no: string;
  signature: string;
  client_id: number;
  id: number;
  note: string;
  vat: string;
  discount: string;
  invoice_date: string;
  due_date: string;
  net_total: string;
  sub_total: string;
  due: string;
  remark: string;
  created_at: string;
  client_name: string;
  client_email: string;
  client_mobile: string;
  client_address: string;
  employee_name: string;
  employee_designation: string;
  employee_salary: string;
  employee_mobile: string;
  employee_address: null | string;
  employee_email: null | string;
  invoice_items: IInvoiceProductItem[];
  money_receipts: {
    id: number;
    money_receipt_no: string;
    paid_amount: string;
  }[];
  created_by: string;
}

export interface IInvoiceFilter {
  client_name?: string;
  client_id?: number;
  account_id?: number;
  start_date?: string;
  end_date?: string;
  invoice_no?: string;
  money_receipt_no?: string;
  limit?: number;
  skip?: string;
}
