import { CommonData } from "../common";
import { ITeam } from "../team";
import { IUser } from "../user";

export interface ICreateProjectDto {
  name: string;
  description: string;
  profileImage?: File;
}

export interface IProject extends CommonData {
  team: ITeam;
  owner: IUser;
  title: string;
  profileImage: string | null;
  status: string;
}
