import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/common/dto/userResponse.dto';

export class LoginResponseDto {
  @Expose()
  accessToken: string;
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }
}
