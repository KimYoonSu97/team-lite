export interface ICreateUserDto {
  email: string;
  nickname: string;
  password: string;
  profileImage?: File;
}

export interface IUser {
  id: string;
  email: string;
}

export interface ICheckEmailDto {
  email: string;
}
