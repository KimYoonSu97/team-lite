import type { ICreateTeamDto, ITeam } from "@teamlite/types";
import { authAxios } from "../axios";

export const getTeamList: () => Promise<ITeam[]> = async () => {
  const res = await authAxios.get("/teams");
  if (res.status === 200) {
    return res.data;
  } else {
    return null;
  }
};

export const createTeam = async (data: ICreateTeamDto) => {
  const res = await authAxios.post("/teams", {
    name: data.name,
    description: data.description,
    members: [],
  });
  return res.data;
};

export const getTeamMembers = async (teamId: string) => {
  const res = await authAxios(`/teams/${teamId}/members`);
  return res.data;
};

export const getTeamDetail = async (teamId: string): Promise<ITeam> => {
  const res = await authAxios(`/teams/${teamId}`);

  return res.data;
};

export const getPersonalTeam = async (userId: string): Promise<ITeam> => {
  const res = await authAxios(`/teams/personal/${userId}`);
  return res.data;
};

export const addTeamMembers = async (teamId: string, userIds: string[]) => {
  const res = await authAxios.post(`/teams/add-members`, {
    teamId,
    members: userIds,
  });
  return res.data;
};

export const updateTeam = async (teamId: string, data: ICreateTeamDto) => {
  const res = await authAxios.patch(`/teams/${teamId}`, {
    name: data.name,
    description: data.description,
    members: [],
  });
  return res.data;
};
