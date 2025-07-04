// export interface IAdmin {
//   id: number;
//   name: string;
//   phone: string;
//   email: string;
//   role: number;
// }

export interface IUser {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  photo: string;
  user_status: string;
  role_name: string;
  role_type: string;
  company_id: number;
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_logo: string;
  company_created_at: string;
  phone_number: string;
  status: string;
  main_user: boolean;
}

// export interface ISingleAdmin {
//   id: number;
//   name: string;
//   photo: string;
//   phone: string;
//   email: string;
//   role: number;
//   status: string;
//   created_at: string;
// }
export interface ISingleAdmin {
  role_id: number;
  company_name: string;
  email: string;
  first_name: string;
  last_name: string;
  photo: string;
  role_name: string;
  role_type: string;
  user_id: number;
  user_status: boolean;
  username: string;
  phone_number: string;
  main_user: boolean;
}
