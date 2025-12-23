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
        ownerId,
      },
    });
    return newTeam;
  }

  async addMembers(teamId: string, members: string[]) {
    const res = await this.prisma.team_members.createMany({
      data: members.map((member) => ({
        teamId,
        userId: member,
        role: 'MEMBER',
      })),
    });
    return res;
  }

  async findAll(userId: string) {
    const teams = await this.prisma.team_members.findMany({
      where: { userId },
      include: {
        team: {
          include: {
            owner: true,
            project: true,
          },
        },
      },
    });
    return teams;
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
      where: { teamId },
      include: {
        user: true,
      },
    });
    return members;
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
        teamId,
        userId: deleteUserId,
      },
    });
  }
}
