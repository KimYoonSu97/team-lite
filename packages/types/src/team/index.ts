import { CommonData } from "../common";

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
  id: string;
  name: string;
  profileImage: string | null;
  ownerId: string;
  description: string;
}
