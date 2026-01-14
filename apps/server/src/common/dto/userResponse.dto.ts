import { IUser } from '@teamlite/types';
import { Exclude, Expose } from 'class-transformer';
import { CommonResponseDto } from './commonResponse.dto';

export class UserResponseDto extends CommonResponseDto implements IUser {
  @Expose()
  email: string;
  @Expose()
  nickname: string;
  @Expose()
  profileImage: string | null;

  constructor(partial: Partial<UserResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
