import { ITask } from '@teamlite/types';
import { Expose, Type } from 'class-transformer';
import { CommonResponseDto } from 'src/common/dto/commonResponse.dto';
import { UserResponseDto } from 'src/common/dto/userResponse.dto';
import { ProjectResponseDto } from 'src/projects/dto/projectResponseDto';

export class TaskResponseDto extends CommonResponseDto implements ITask {
  @Expose()
  @Type(() => UserResponseDto)
  owner: UserResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  assignee: UserResponseDto;

  @Expose()
  @Type(() => ProjectResponseDto)
  project: ProjectResponseDto;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  priority: string | null;

  @Expose()
  status: string | null;

  @Expose()
  duedate: Date;
}
