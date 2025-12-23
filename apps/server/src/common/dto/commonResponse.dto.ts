import { CommonData } from '@teamlite/types/src/common';
import { Expose } from 'class-transformer';

export class CommonResponseDto implements CommonData {
  @Expose()
  id: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  deletedAt: Date | null;
  @Expose()
  isUse: boolean;
  @Expose()
  description: string | null;
}
