import { IAddMembersDto } from '@teamlite/types';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class AddMembersDto implements IAddMembersDto {
  @IsNotEmpty({ message: '팀 ID는 필수 입력 항목입니다.' })
  @IsString({ message: '팀 ID는 문자열이어야 합니다.' })
  teamId: string;

  @IsArray({ message: '멤버는 배열이어야 합니다.' })
  @IsString({ message: '멤버는 문자열이어야 합니다.', each: true })
  members: string[];
}
