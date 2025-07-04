export interface ISubscriptionType {
  product_id: number;
  client_id: number;
  last_payment_date?: string;
  sold_date: string;
  period: string;
  expire_date: string;
  subscription_amount: number;
  last_paid_amount?: number;
  last_collected_by: number;
  last_feedback: string;
  status?: string;
}
export interface ISubscriptionListType {
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
  updated_at: null;
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

export interface ISubscriptionFilter {
  client_name?: string;
  client_id?: number;
  status?: string;
  product_id?: number;
  last_collected_by?: number;
  l_start_date?: string;
  l_end_date?: string;
  start_date?: string;
  end_date?: string;
  e_start_date?: string;
  e_end_date?: string;
  invoice_no?: string;
  money_receipt_no?: string;
  limit?: number;
  skip?: string;
}

export interface IRenewType {
  expire_date: string;
  last_paid_amount: number;
  last_collected_by: number;
  last_payment_date: string;
  last_feedback: string;
}
export interface IUpdateType {
  status?: string; // Optional. values: active, inactive, expired
  period?: string; // Optional
  last_feedback?: string;
}
export interface Tracking {
  id: string;
  details: string;
  created_at: string;
  created_by: string;
}
export interface ISubscriptionTracking {
  id: number;
  client_id: number;
  client_no: string;
  client_name: string;
  product_id: number;
  product_name: string;
  tracking: Tracking[];
}
