import z from "zod";
import type { CommonData } from "../common";
import type { ITeam } from "../team";
import type { IUser } from "../user";

export const createProjectSchema = z.object({
  name: z
    .string({ message: "프로젝트 이름은 필수 입력 항목입니다." })
    .min(3, { message: "프로젝트 이름은 최소 3자 이상이어야 합니다." })
    .max(50, { message: "프로젝트 이름은 최대 50자 이하여야 합니다." }),
  description: z
    .string({ message: "프로젝트 설명은 필수 입력 항목입니다." })
    .min(3, { message: "프로젝트 설명은 최소 3자 이상이어야 합니다." })
    .max(500, { message: "프로젝트 설명은 최대 500자 이하여야 합니다." }),
  profileImage: z.string().optional().nullable(),
});

export interface ICreateProjectDto extends z.infer<
  typeof createProjectSchema
> {}

export interface IProject extends CommonData {
  team: ITeam;
  owner: IUser;
  title: string;
  profileImage: string | null;
  status: string;
}
