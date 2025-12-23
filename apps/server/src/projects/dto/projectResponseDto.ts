import { IProject } from '@teamlite/types';
import { Exclude, Expose, Type } from 'class-transformer';
import { CommonResponseDto } from 'src/common/dto/commonResponse.dto';
import { UserResponseDto } from 'src/common/dto/userResponse.dto';
import { TeamResponseDto } from 'src/teams/dto/TeamResponse.dto';

export class ProjectResponseDto extends CommonResponseDto implements IProject {
  @Expose()
  @Type(() => TeamResponseDto)
  team: TeamResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  owner: UserResponseDto;

  @Expose()
  title: string;

  @Expose()
  profileImage: string | null;

  @Expose()
  status: string;

  @Exclude()
  ownerId: string;

  @Exclude()
  teamId: string;

  constructor(partial: Partial<ProjectResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
