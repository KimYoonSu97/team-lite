import { ITeam, TeamType } from '@teamlite/types';
import { Expose, Type } from 'class-transformer';
import { CommonResponseDto } from 'src/common/dto/commonResponse.dto';
import { UserResponseDto } from 'src/common/dto/userResponse.dto';
import { ProjectResponseDto } from 'src/projects/dto/projectResponseDto';

export class TeamResponseDto extends CommonResponseDto implements ITeam {
  @Expose()
  name: string;
  @Expose()
  profileImage: string | null;

  @Expose()
  @Type(() => UserResponseDto)
  owner: UserResponseDto;

  @Expose()
  teamType: TeamType;

  @Expose()
  @Type(() => ProjectResponseDto)
  project: ProjectResponseDto[];

  constructor(partial: Partial<TeamResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
