import z from "zod";
import type { CommonData } from "../common";
import type { IProject } from "../project";
import type { IUser } from "../user";

export const createTaskSchema = z.object({
  title: z
    .string({ message: "제목은 필수 입력 항목입니다." })
    .min(3, { message: "제목은 최소 3자 이상이어야 합니다." })
    .max(50, { message: "제목은 최대 50자 이하여야 합니다." }),
  content: z
    .string({ message: "내용은 필수 입력 항목입니다." })
    .min(1, { message: "내용은 최소 1자 이상이어야 합니다." })
    .max(500, { message: "내용은 최대 500자 이하여야 합니다." }),
  description: z
    .string({ message: "설명은 필수 입력 항목입니다." })
    .min(1, { message: "설명은 최소 1자 이상이어야 합니다." })
    .max(500, { message: "설명은 최대 500자 이하여야 합니다." }),
  deadLine: z.string({ message: "마감일은 필수 입력 항목입니다." }),
  priority: z.string({ message: "우선순위는 필수 입력 항목입니다." }),
  assigneeId: z
    .string({ message: "담당자는 필수 입력 항목입니다." })
    .min(1, { message: "담당자는 필수 입력 항목입니다." }),
});
export const updateTaskSchema = z.object({
  status: z.string(),
});

export interface ICreateTaskDto extends z.infer<typeof createTaskSchema> {}

export interface ITask extends CommonData {
  owner: IUser;
  assignee: IUser;
  project: IProject;

  title: string;
  content: string;
  priority: string | null;
  status: string | null;
  duedate: Date;
}

export interface IUpdateTaskDto extends z.infer<typeof updateTaskSchema> {}
