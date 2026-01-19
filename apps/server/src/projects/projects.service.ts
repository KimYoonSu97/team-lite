import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createProjectDto: CreateProjectDto,
    teamId: string,
    userId: string,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const newProject = await tx.project.create({
        data: {
          title: createProjectDto.name,
          description: createProjectDto.description,
          teamId,
          ownerId: userId,
        },
      });

      await tx.project_members.create({
        data: {
          projectId: newProject.id,
          userId,
          role: 'OWNER',
        },
      });
      return newProject;
    });
  }

  // 프로젝트 찾기
  async findAll(teamId: string, userId: string) {
    const projects = await this.prisma.project.findMany({
      where: { teamId },
      include: {
        team: true,
        owner: true,
        projectMembers: true,
      },
    });

    const projectMembers = await this.prisma.project_members.findMany({
      where: {
        userId,
      },
    });
    return projects.filter((project) =>
      projectMembers.some((member) => member.projectId === project.id),
    );
  }

  // async findAll(teamId:string)

  async findMyProject(teamId: string, userId: string) {
    return await this.prisma.project.findMany({
      where: {
        teamId,
        ownerId: userId,
      },
      include: {
        team: true,
        owner: true,
      },
    });
  }

  async findOne(projectId: string) {
    return await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        team: true,
        owner: true,
      },
    });
  }

  async addMembers(projectId: string, members: string[]) {
    const res = await this.prisma.project_members.createMany({
      data: members.map((member) => ({
        projectId,
        userId: member,
        role: 'MEMBER',
      })),
    });
    return res;
  }

  async deleteMember(projectId: string, userId: string) {
    const res = await this.prisma.project_members.findFirst({
      where: {
        userId,
        projectId,
      },
    });
    if (!res) {
      throw new NotFoundException('프로젝트 멤버를 찾을 수 없습니다.');
    }
    return await this.prisma.project_members.delete({
      where: {
        id: res.id,
      },
    });
  }
}
