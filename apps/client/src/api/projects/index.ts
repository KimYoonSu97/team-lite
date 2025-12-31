import { authAxios } from "../axios";

export const getProjectDetail = async (projectId: string) => {
  const res = await authAxios.get(`/projects/${projectId}`);
  return res.data;
};

export const getProjectList = async (teamId: string) => {
  const res = await authAxios(`/projects/${teamId}/list`);

  return res.data;
};
