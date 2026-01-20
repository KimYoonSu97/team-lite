import z from "zod";
import type { CommonData } from "../common";
import type { IUser } from "../user";
import type { IProject } from "../project";
export enum TeamType {
  PERSONAL = "PERSONAL",
  GROUP = "GROUP",
}

export const createTeamSchema = z.object({
  name: z
    .string({ message: "팀 이름은 필수 입력 항목입니다." })
    .min(3, { message: "팀 이름은 최소 3자 이상이어야 합니다." })
    .max(15, { message: "팀 이름은 최대 15자 이하여야 합니다." }),

  description: z
    .string({ message: "팀 설명은 필수 입력 항목입니다." })
    .min(3, { message: "팀 설명은 최소 3자 이상이어야 합니다." })
    .max(100, { message: "팀 설명은 최대 100자 이하여야 합니다." }),
  members: z.array(z.string()),
  profileImage: z.string().optional().nullable(),
});

export interface ICreateTeamDto extends z.infer<typeof createTeamSchema> {}

export const addMemberSchema = z.object({
  teamId: z.string(),
  members: z.array(z.string()),
});

export interface IAddMembersDto extends z.infer<typeof addMemberSchema> {}

export interface ITeam extends CommonData {
  name: string;
  profileImage: string | null;
  owner: IUser;
  teamType: TeamType;
  project: IProject[];
  teamMembers: IUser[];
}
