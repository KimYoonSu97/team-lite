import { IsOptional, IsIn } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { SortQueryDto } from '../../common/dto/sort-query.dto';

export class FindTeamTasksQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['createdAt', 'duedate'])
  sortBy?: 'createdAt' | 'duedate' = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
