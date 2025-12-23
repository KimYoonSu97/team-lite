import { ICreateUserDto } from '@teamlite/types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  email: string;

  @IsNotEmpty({ message: '닉네임은 필수 입력 항목입니다.' })
  @Matches(/^[가-힣]+$/, {
    message: '닉네임은 한글로만 입력해주세요. (자음/모음 단독 불가)',
  })
  nickname: string;

  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @MaxLength(32, { message: '비밀번호는 최대 32자 이하여야 합니다.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message: '비밀번호는 영문과 숫자를 반드시 포함해야 합니다.',
  })
  password: string;

  @IsOptional()
  profileImage?: string | null;
}
