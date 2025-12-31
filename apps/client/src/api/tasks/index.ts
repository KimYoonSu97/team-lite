import { authAxios } from "../axios";

export const getMyTaskList = async () => {
  const res = await authAxios.get("tasks");
  return res.data;
};

export const getMyTaskListByProjectId = async (projectId: string) => {
  const res = await authAxios.get(`/tasks/${projectId}/my`);
  return res.data;
};

export const getAllTaskListByProjectId = async (projectId: string) => {
  const res = await authAxios.get(`/tasks/${projectId}`);
  return res.data;
};
