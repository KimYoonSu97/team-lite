export interface IResponse<T> {}

export interface CommonData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isUse: boolean;
  description: string | null;
}
