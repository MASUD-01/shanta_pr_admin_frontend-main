export interface IAllSource {
  id: number;
  name: string;
}
export interface ICreateSource {
  name: string;
}

export interface ISourceParams {
  limit?: number;
  skip?: number;
}
