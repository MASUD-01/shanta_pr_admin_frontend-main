/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct {
  id: number;
  name: string;
  details: string;
}

export interface ICreateProduct {
  name: string;
  photo: any;
  details: string;
}

export interface IProductsParams {
  limit?: number;
  skip?: number;
}

export interface ISingleProduct {
  id: number;
  name: string;
  photo: string;
  details: string;
  created_at: string;
  created_by: string;
}
