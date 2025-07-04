export interface IAllDesignation {
  id: number;
  name: string;
}
export interface ICreateDesignation {
  name: string;
}

export interface IDesignationParams {
  limit?: number;
  skip?: number;
  name?: string;
}
