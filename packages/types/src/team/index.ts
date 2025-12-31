import type { CommonData } from "../common";
import type { IUser } from "../user";

export interface ICreateTeamDto {
  name: string;
  description: string;
  members: string[];
  profileImage?: File;
}

export interface IAddMembersDto {
  teamId: string;
  members: string[];
}

export interface ITeam extends CommonData {
  name: string;
  profileImage: string | null;
  owner: IUser;
}
