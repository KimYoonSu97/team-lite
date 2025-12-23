import { ITeam, IUser } from '@teamlite/types';
import { Expose, Type } from 'class-transformer';
import { CommonResponseDto } from 'src/common/dto/commonResponse.dto';
import { UserResponseDto } from 'src/common/dto/userResponse.dto';

export class TeamResponseDto extends CommonResponseDto implements ITeam {
  @Expose()
  name: string;
  @Expose()
  profileImage: string | null;

  @Expose()
  @Type(() => UserResponseDto)
  owner: UserResponseDto;

  constructor(partial: Partial<TeamResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
