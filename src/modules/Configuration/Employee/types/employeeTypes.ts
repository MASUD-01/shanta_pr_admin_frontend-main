/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IEmployee {
  id: number;
  code: string;
  name: string;
  designation: string;
  blood_group: string;
  date_of_birth: string;
  joining_date: string;
  appointment_date: string;
  address: string;
  department_name: string;
  salary: string;
  commission: string | number;
  mobile: string | number;
  status: number | boolean;
}

export interface ISingleEmployee {
  department_id: number;
  designation_id: number;
  id: number;
  name: string;
  designation: string;
  salary: string;
  commission: number;
  mobile: string;
  blood_group: string;
  date_of_birth: string;
  joining_date: string;
  appointment_date: string;
  address: string;
  status: string;
  email: null | string;
  created_at: string;
  department: string;
  created_by: null | string;
}

export interface IFromData {
  [key: string]: any;
  company_id: number | undefined;
  name: string;
  designation: string;
  salary: number | string;
  commission: number | string;
  mobile: string;
  blood_group: any;
  date_of_birth: string;
  joining_date: string;
  appointment_date: string;
  address: string;
  department_id: { value: string; label: number };
}
export type ISubmitData = Partial<{
  [K in keyof IFromData]: K extends "department_id" ? any : IFromData[K];
}>;

export interface IEmployeeParams {
  limit?: number;
  skip?: number;
  name?: string;
}
