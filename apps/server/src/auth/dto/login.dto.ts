import { ILoginDto } from '@teamlite/types';

export class LoginDto implements ILoginDto {
  email: string;
  password: string;
}
