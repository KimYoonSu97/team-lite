import { z } from "zod";
import { createUserSchema } from "../user";

export const loginSchema = createUserSchema.pick({
  email: true,
  password: true,
});

export interface ILoginDto extends z.infer<typeof loginSchema> {}
