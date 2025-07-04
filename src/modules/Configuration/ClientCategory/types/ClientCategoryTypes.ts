export interface IClientCategory {
  id: number;
  category_name: string;
  prefix: string;
  prefix_start: string;
}

export interface ICreateClientCategory {
  category_name: string;
  prefix: string;
  prefix_start: string;
}
export interface IClientCategoryParams {
  limit?: number;
  skip?: number;
}
