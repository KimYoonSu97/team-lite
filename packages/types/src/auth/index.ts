import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string({ message: "비밀번호는 필수 입력 항목입니다." })
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(32, { message: "비밀번호는 최대 32자 이하이어야 합니다." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
      message: "비밀번호는 최소 1개의 영문, 1개의 숫자로 구성되어야 합니다.",
    }),
});

export interface ILoginDto extends z.infer<typeof loginSchema> {}
