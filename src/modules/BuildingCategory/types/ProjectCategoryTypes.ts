export interface IProjectService {
  id: number;
  building_name: string;
  building_code: string;
  total_floors: number;
  total_flats: number;
  address: string | number;
  price: string;
  city: string;
  state: string;
  pincode: string;
}

export interface IProjectServiceCategory {
  building_name: string;
  building_code: string;
  total_floors: number;
  total_flats: number;
  address: string | number;
  price: string;
  city: string;
  state: string;
  pincode: string;
}
export interface IProjectServiceParams {
  limit?: number;
  skip?: number;
}
