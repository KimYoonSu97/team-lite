import { ICreateUserDto } from '@teamlite/types/src/user/user';

export class CreateUserDto implements ICreateUserDto {
  email: string;
  nickname: string;
  password: string;
  profileImage?: File;
}
