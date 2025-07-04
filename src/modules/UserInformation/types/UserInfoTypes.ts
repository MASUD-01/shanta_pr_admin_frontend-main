export interface IUserDetails {
  id: number;
  full_name_owner: string;
  full_name_tenant: string;
  email_tenant: string;
  email_owner: string;
  phone_number_owner: number;
  phone_number_tenant: number;
  Address: string;
  pan_number: number;
  assigned_flat: number | string;
  lease_start_date: number;
  lease_end_date: number;
}

export interface IUserDetailsCategory {
  full_name_owner: string;
  full_name_tenant: string;
  email_tenant: string;
  email_owner: string;
  phone_number_owner: number;
  phone_number_tenant: number;
  Address: string;
  pan_number: number;
  assigned_flat: number | string;
  lease_start_date: number;
  lease_end_date: number;
}

export interface IUserDetailsParams {
  limit?: number;
  skip?: number;
}
