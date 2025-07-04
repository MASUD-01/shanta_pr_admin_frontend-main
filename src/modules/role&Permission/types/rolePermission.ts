export interface IRolePermissionList {
  username: string;
  user_id: number;
  company_id: number;
  role_name: string;
  role_id: number;
  modules: [
    {
      module_id: number;
      module_name: string;
      sub_modules: [
        {
          sub_module_id: number;
          sub_module_name: string;
        }
      ];
    }
  ];
}
export interface IGetAllRolePermissionList {
  company_id: number;
  created_by: number;
  id: number;
  main_role: boolean;
  name: string;
}

export interface IViewAllModule {
  company_id: number;
  modules: [
    {
      module_id: number;
      module_name: string;
      sub_modules: [
        {
          sub_module_id: number;
          sub_module_name: string;
        }
      ];
    }
  ];
}
