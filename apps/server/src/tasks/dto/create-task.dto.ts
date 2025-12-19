import { ICreateTaskDto } from '@teamlite/types';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsDate,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto implements ICreateTaskDto {
  @IsNotEmpty({ message: '제목은 필수 입력 항목입니다.' })
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  @MinLength(1, { message: '제목은 최소 1자 이상이어야 합니다.' })
  @MaxLength(50, { message: '제목은 최대 50자 이하여야 합니다.' })
  title: string;

  @IsNotEmpty({ message: '내용은 필수 입력 항목입니다.' })
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @MinLength(1, { message: '내용은 최소 1자 이상이어야 합니다.' })
  @MaxLength(500, { message: '내용은 최대 500자 이하여야 합니다.' })
  content: string;

  @IsNotEmpty({ message: '설명은 필수 입력 항목입니다.' })
  @IsString({ message: '설명은 문자열이어야 합니다.' })
  @MinLength(1, { message: '설명은 최소 1자 이상이어야 합니다.' })
  @MaxLength(500, { message: '설명은 최대 500자 이하여야 합니다.' })
  description: string;

  @IsNotEmpty({ message: '마감일은 필수 입력 항목입니다.' })
  deadLine: string;

  @IsNotEmpty({ message: '우선순위는 필수 입력 항목입니다.' })
  priority: string;

  @IsNotEmpty({ message: '담당자 ID는 필수 입력 항목입니다.' })
  @IsString({ message: '담당자 ID는 문자열이어야 합니다.' })
  assigneeId: string;
}
