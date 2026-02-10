import type { ICreateProjectDto, IProject, IUser } from "@teamlite/types";
import { authAxios } from "../axios";

export const getProjectDetail = async (
  projectId: string,
): Promise<IProject> => {
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

export const createProject = async (
  teamId: string,
  data: ICreateProjectDto,
) => {
  const res = await authAxios.post(`/projects/${teamId}`, data);
  return res.data;
};

export const updateProject = async (
  projectId: string,
  data: ICreateProjectDto,
) => {
  const res = await authAxios.put(`/projects/${projectId}`, data);
  return res.data;
};

export const updateProjectMember = async (
  projectId: string,
  userIds: string[],
) => {
  const res = await authAxios.put(`/projects/${projectId}/member`, {
    projectId,
    members: userIds,
  });
  return res.data;
};
