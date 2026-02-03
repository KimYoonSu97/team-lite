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
): Promise<ITask[]> => {
  const res = await authAxios.get(`/tasks/${projectId}`);
  return res.data;
};

export const patchTaskStatus = async (taskId: string, status: string) => {
  const res = await authAxios.patch(`/tasks/${taskId}/status`, {
    status,
  });
  return res.data;
};

export const createTask = async (projectId: string, data: ICreateTaskDto) => {
  return authAxios.post(`/tasks/${projectId}`, {
    ...data,
    deadLine: dayjs(data.deadLine).toISOString(),
  });
};

export const getMyTaskListByTeamId = async (
  teamId: string,
  query: { sortBy?: string; sortOrder?: "asc" | "desc" },
) => {
  const res = await authAxios.get(
    `/tasks/${teamId}/tasks?${new URLSearchParams(query).toString()}`,
  );
  return res.data;
};
