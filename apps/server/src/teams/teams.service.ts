import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTeamDto: CreateTeamDto, ownerId: string) {
    const newTeam = await this.prisma.team.create({
      data: {
        name: createTeamDto.name,
        description: createTeamDto.description,
        owner_id: ownerId,
      },
    });
    return newTeam;
  }

  async addMembers(teamId: string, members: string[]) {
    await this.prisma.team_members.createMany({
      data: members.map((member) => ({
        team_id: teamId,
        user_id: member,
        role: 'MEMBER',
      })),
    });
  }

  async findAll(userId: string) {
    const teams = await this.prisma.team_members.findMany({
      where: { user_id: userId },
      include: { team: true },
    });
    console.log(teams);
    return teams
      ? teams.map((team) => {
          return {
            id: team.team.id,
            name: team.team.name,
            imageUrl: team.team.image_url,
            description: team.team.description,
            profileImage: team.team.image_url,
          };
        })
      : [];
  }

  async findOne(teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: { owner: true },
    });
    return team;
  }

  async findMembers(teamId: string) {
    const members = await this.prisma.team_members.findMany({
      where: { team_id: teamId },
      include: { user: true },
    });
    return members
      ? members.map((member) => {
          return {
            id: member.user.id,
            email: member.user.email,
            nickname: member.user.nickname,
            profileImage: member.user.profile_image,
          };
        })
      : [];
  }

  async deleteMemberFromTeam(id: string) {
    return await this.prisma.team_members.delete({
      where: {
        id,
      },
    });
  }
  async getMemberIdInfo(deleteUserId: string, teamId: string) {
    return await this.prisma.team_members.findFirst({
      where: {
        team_id: teamId,
        user_id: deleteUserId,
      },
    });
  }
}
