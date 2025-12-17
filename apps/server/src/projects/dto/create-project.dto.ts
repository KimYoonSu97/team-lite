import { ICreateProjectDto } from '@teamlite/types';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjectDto implements ICreateProjectDto {
  @IsNotEmpty({ message: '프로젝트 이름은 필수 입력 항목입니다.' })
  @IsString({ message: '프로젝트 이름은 문자열이어야 합니다.' })
  @MinLength(1, { message: '프로젝트 이름은 최소 3자 이상이어야 합니다.' })
  @MaxLength(50, { message: '프로젝트 이름은 최대 50자 이하여야 합니다.' })
  name: string;

  @IsNotEmpty({ message: '프로젝트 설명은 필수 입력 항목입니다.' })
  @IsString({ message: '프로젝트 설명은 문자열이어야 합니다.' })
  @MinLength(1, { message: '프로젝트 설명은 최소 3자 이상이어야 합니다.' })
  @MaxLength(500, { message: '프로젝트 설명은 최대 500자 이하여야 합니다.' })
  description: string;

  @IsOptional()
  profileImage?: File;
}
