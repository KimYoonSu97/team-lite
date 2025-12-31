import type { CommonData } from "../common";
import type { IProject } from "../project";
import type { IUser } from "../user";

export interface ICreateTaskDto {
  assigneeId: string;
  content: string;
  title: string;
  description: string;
  deadLine: string;
  priority: string;
}

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
