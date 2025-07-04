export interface IFlatDetails {
  id: number;
  building_name: string;
  flat_number: string;
  floor_number: number;
  flat_type: string;
  carpet_area: number;
  base_rent: number;
  security_deposit: number;
  status: "available" | "occupied";
}

export interface IFlatDetailsCategory {
  building_name: string;
  flat_number: string;
  floor_number: number;
  flat_type: string;
  carpet_area: number;
  base_rent: number;
  security_deposit: number;
  status: "available" | "occupied";
}

export interface IFlatDetailsParams {
  limit?: number;
  skip?: number;
}
