export interface IResponse<T> {}

export interface CommonData {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isUse: boolean;
  description: string | null;
}
