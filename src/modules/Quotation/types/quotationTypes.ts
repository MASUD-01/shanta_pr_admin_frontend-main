export interface IQuotation {
  id: number;
  quotation_date: string;
  quotation_no: string;
  net_total: string;
  due: string;
  client_id: number;
  client_name: string;
  client_mobile: string;
}

export interface IQuotationItem {
  id: number;
  quotation_id: number;
  unit_price: string;
  created_at: string;
  description: string;
  quantity: number;
  product_name: string;
  product_id: number;
}

export interface ISingleQuotation {
  signature: string;
  client_id: number;
  id: number;
  quotation_no: string;
  note: string;
  vat: string;
  discount: string;
  quotation_date: string;
  net_total: string;
  sub_total: string;
  due: string;
  remark: string;
  created_at: string;
  client_name: string;
  client_email: string;
  client_mobile: string;
  client_address: string;
  created_by: string;
  quotation_items: IQuotationItem[];
}

export interface IQuotationFilter {
  key: string;
  start_date: string;
  end_date: string;
  limit?: number;
  skip?: string;
}
