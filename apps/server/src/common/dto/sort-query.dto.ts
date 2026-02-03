import { IsOptional, IsIn } from 'class-validator';

export class SortQueryDto<T extends string = string> {
  @IsOptional()
  sortBy?: T;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
