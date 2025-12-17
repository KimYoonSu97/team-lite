import { IsEmail, IsNotEmpty } from 'class-validator';
import { ICheckEmailDto } from '@teamlite/types';

export class CheckEmailDto implements ICheckEmailDto {
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  email: string;
}
