import dayjs from "dayjs";
import { authAxios } from "../axios";
import type { ICreateTaskDto, ITask } from "@teamlite/types";

export const getMyTaskList = async () => {
  const res = await authAxios.get("tasks");
  return res.data;
};

export const getMyTaskListByProjectId = async (projectId: string) => {
  const res = await authAxios.get(`/tasks/${projectId}/my`);
  return res.data;
};

export const getAllTaskListByProjectId = async (
  projectId: string,
  tab: string,
): Promise<ITask[]> => {
  const res = await authAxios.get(`/tasks/${projectId}?tab=${tab}`);
  return res.data;
};

export const createTask = async (projectId: string, data: ICreateTaskDto) => {
  return authAxios.post(`/tasks/${projectId}`, {
    ...data,
    dueDate: dayjs(data.dueDate).toISOString(),
  });
};

export const getMyTaskListByTeamId = async (
  teamId: string,
  query: { sortBy?: string; sortOrder?: "asc" | "desc" },
): Promise<{ data: ITask[]; meta: any }> => {
  const res = await authAxios.get(
    `/tasks/${teamId}/tasks?${new URLSearchParams(query).toString()}`,
  );
  return res.data;
};

export const updateTask = async (taskId: string, data: ICreateTaskDto) => {
  return authAxios.patch(`/tasks/${taskId}`, {
    ...data,
    dueDate: dayjs(data.dueDate).toISOString(),
  });
};
