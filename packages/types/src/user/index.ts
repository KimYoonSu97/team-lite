import type { CommonData } from "../common";

export interface ICreateUserDto {
  email: string;
  nickname: string;
  password: string;
  profileImage?: File;
}

export interface IUser extends CommonData {
  id: string;
  email: string;
  nickname: string;
  profileImage: string | null;
}

export interface ICheckEmailDto {
  email: string;
}
