import type { IProject, IUser } from "@teamlite/types";
import { authAxios } from "../axios";

export const getProjectDetail = async (projectId: string) => {
  const res = await authAxios.get(`/projects/${projectId}`);
  return res.data;
};

export const getProjectList = async (teamId: string): Promise<IProject[]> => {
  const res = await authAxios(`/projects/${teamId}/list`);

  return res.data;
};

export const getProjectMember = async (projectId: string): Promise<IUser[]> => {
  const res = await authAxios(`/projects/${projectId}/member`);
  return res.data;
};

export const addProjectMember = async (
  projectId: string,
  userIds: string[],
) => {
  const res = await authAxios.post(`/projects/${projectId}/add-members`, {
    projectId,
    members: userIds,
  });
  return res.data;
};
