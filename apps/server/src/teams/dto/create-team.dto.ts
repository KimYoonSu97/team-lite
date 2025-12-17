import { ICreateTeamDto } from '@teamlite/types';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTeamDto implements ICreateTeamDto {
  @IsNotEmpty({ message: '팀 이름은 필수 입력 항목입니다.' })
  @IsString({ message: '팀 이름은 문자열이어야 합니다.' })
  @MinLength(1, { message: '팀 이름은 최소 3자 이상이어야 합니다.' })
  @MaxLength(50, { message: '팀 이름은 최대 50자 이하여야 합니다.' })
  name: string;

  @IsNotEmpty({ message: '팀 설명은 필수 입력 항목입니다.' })
  @IsString({ message: '팀 설명은 문자열이어야 합니다.' })
  @MinLength(1, { message: '팀 설명은 최소 3자 이상이어야 합니다.' })
  @MaxLength(500, { message: '팀 설명은 최대 500자 이하여야 합니다.' })
  description: string;

  @IsArray({ message: '팀 멤버는 배열이어야 합니다.' })
  @IsString({ message: '팀 멤버는 문자열이어야 합니다.', each: true })
  members: string[];

  @IsOptional()
  profileImage?: File;
}
