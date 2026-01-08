import type { CommonData } from "../common";
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email({ message: "올바른 이메일 형식이 아닙니다." }),
  nickname: z
    .string({ message: "닉네임은 필수 입력 항목입니다." })
    .min(2, { message: "닉네임은 최소 2자 이상이어야 합니다." })
    .max(16, { message: "닉네임은 최대 16자 이하이어야 합니다." })
    .regex(/^[가-힣]+$/, { message: "닉네임은 한글로 입력해주세요." }),

  password: z
    .string({ message: "비밀번호는 필수 입력 항목입니다." })
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(32, { message: "비밀번호는 최대 32자 이하이어야 합니다." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
      message: "비밀번호는 최소 1개의 영문, 1개의 숫자로 구성되어야 합니다.",
    }),
  profileImage: z.string().optional().nullable(),
});

export interface ICreateUserDto extends z.infer<typeof createUserSchema> {}

export interface IUser extends CommonData {
  id: string;
  email: string;
  nickname: string;
  profileImage: string | null;
}

export interface ICheckEmailDto {
  email: string;
}

export interface ILoginResponseDto {
  accessToken: string;
  user: IUser;
}
