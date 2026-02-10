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
    return await this.prisma.$transaction(async (tx) => {
      const projects = await tx.project.findMany({
        where: { teamId },
        include: {
          team: true,
          owner: true,
          projectMembers: true,
        },
      });

      const projectMembers = await tx.project_members.findMany({
        where: {
          userId,
        },
      });

      const myProjects = projects.filter((project) =>
        projectMembers.some((member) => member.projectId === project.id),
      );

      const tasks = await tx.task.groupBy({
        by: ['projectId'],
        where: {
          projectId: {
            in: myProjects.map((project) => project.id),
          },
          status: {
            notIn: ['CLOSED', 'COMPLETED'],
          },
        },

        _count: {
          id: true,
        },
      });

      return myProjects.map((project) => {
        return {
          ...project,
          allTaskCount:
            tasks.find((task) => task.projectId === project.id)?._count.id || 0,
        };
      });
    });
  }

  async findProjectMember(projectId: string) {
    return await this.prisma.project_members.findMany({
      where: {
        projectId,
      },
      include: {
        user: true,
      },
    });
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

  async findOne(projectId: string, userId: string) {
    const projectDetail = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        team: true,
        owner: true,
        projectMembers: {
          include: { user: true },
        },
      },
    });

    const myTask = await this.prisma.task.count({
      where: {
        projectId,
        assigneeId: userId,
      },
    });
    const allTask = await this.prisma.task.count({
      where: {
        projectId,
      },
    });

    return {
      ...projectDetail,
      myTaskCount: myTask,
      allTaskCount: allTask,
      projectMembers: projectDetail?.projectMembers.map(
        (member) => member.user,
      ),
    };
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

  async update(projectId: string, updateProjectDto: CreateProjectDto) {
    return await this.prisma.project.update({
      where: { id: projectId },
      data: {
        title: updateProjectDto.name,
        description: updateProjectDto.description,
      },
    });
  }

  async updateMember(projectId: string, members: string[]) {
    return await this.prisma.$transaction(async (tx) => {
      // 현재 멤버 조회 (OWNER 제외)
      const currentMembers = await tx.project_members.findMany({
        where: {
          projectId,
          role: 'MEMBER', // OWNER는 제외
        },
      });
      const currentUserIds = currentMembers.map((m) => m.userId);

      // 추가할 멤버
      const toAdd = members.filter((m) => !currentUserIds.includes(m));

      // 삭제할 멤버
      const toRemove = currentUserIds.filter((id) => !members.includes(id));

      // 삭제
      if (toRemove.length > 0) {
        await tx.project_members.deleteMany({
          where: {
            projectId,
            userId: { in: toRemove },
            role: 'MEMBER', // OWNER는 삭제하지 않음
          },
        });
      }
      // 추가
      if (toAdd.length > 0) {
        await tx.project_members.createMany({
          data: toAdd.map((userId) => ({
            projectId,
            userId,
            role: 'MEMBER',
          })),
        });
      }
      return { added: toAdd.length, removed: toRemove.length };
    });
  }
}
