/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IExpenseHead {
  id: number;
  expense_head_id: string;
  name: string;
}
export interface ICreateExpenseHead {
  name: string;
}

export interface IExpenseSubHead {
  id: number;
  expense_sub_head_name: string;
  expense_sub_head_id: string;
  expense_head_name: string;
  expense_head_id: string;
  head_id: number;
}

export interface ICreateExpenseSubHead {
  name: any;
  expense_head_id: any;
  expense_sub_head_id: any;
}

export interface IExpenseParams {
  limit?: number;
  skip?: number;
  head_id?: number;
  name?: string;
}

export interface ISubHeadModuloePermission {
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    update: boolean;
  };
  sub_module_id: number;
  sub_module_name: string;
}
