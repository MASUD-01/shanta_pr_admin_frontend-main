/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoginResponse<T> {
  success: boolean;
  data?: T;
  token?: string;
  message?: string;
  type?: string;
  status?: number;
}

export interface IModules {
  module_id: number;
  module_name: string;
  sub_modules: [
    {
      permissions: {
        read: boolean;
        write: boolean;
        delete: boolean;
        update: boolean;
      };
      sub_module_id: number;
      sub_module_name: string;
    }
  ];
}

export interface IUser {
  email: string;
  id: number;
  name: string;
  phone_number: string;
  photo: string;
  role: string;
  role_id: number;
  status: boolean;
  permissions: {
    username: string;
    user_id: number;
    company_id: number;
    role_name: string;
    role_id: number;
    modules: IModules[];
  };
}
