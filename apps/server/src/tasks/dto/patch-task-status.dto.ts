import { IUpdateTaskDto } from '@teamlite/types';
import { IsNotEmpty } from 'class-validator';

export class PatchTaskStatusDto implements IUpdateTaskDto {
  @IsNotEmpty({ message: '상태는 필수 입력 항목입니다.' })
  status: string;
}
