import { IsNotEmpty } from 'class-validator';
import { createZodDto } from 'nestjs-zod';
import { updateTaskSchema } from '@teamlite/types';

export class PatchTaskStatusDto extends createZodDto(updateTaskSchema) {
  // @IsNotEmpty({ message: '상태는 필수 입력 항목입니다.' })
  // status: string;
}
