import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PatchTaskStatusDto } from './dto/patch-task-status.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    projectId: string,
    ownerId: string,
    createTaskDto: CreateTaskDto,
  ) {
    await this.prismaService.task.create({
      data: {
        projectId,
        ownerId,
        assigneeId: createTaskDto.assigneeId,
        title: createTaskDto.title,
        status: createTaskDto.status,
        content: createTaskDto.content,
        description: createTaskDto.description,
        duedate: new Date(createTaskDto.dueDate),
        priority: createTaskDto.priority,
      },
    });

    // return 'This action adds a new task';
  }

  async findAll(projectId: string) {
    return await this.prismaService.task.findMany({
      where: { projectId },
      include: {
        assignee: true,
        owner: true,
        project: true,
      },
    });
  }

  async findMyTasks(userId: string) {
    const myTaskList = await this.prismaService.task.findMany({
      where: { assigneeId: userId },
      include: {
        assignee: true,
        owner: true,
        project: true,
      },
    });
    return myTaskList;
  }

  async findMyTasksInTeam(
    userId: string,
    teamId: string,
    query: {
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
      skip: number;
      take: number;
    },
  ) {
    const projectList = await this.prismaService.project.findMany({
      where: { teamId },
      select: { id: true },
    });

    const where = {
      assigneeId: userId,
      projectId: { in: projectList.map((p) => p.id) },
    };

    // 총 개수 조회
    const total = await this.prismaService.task.count({ where });

    // 데이터 조회
    const taskList = await this.prismaService.task.findMany({
      where,
      include: {
        assignee: true,
        owner: true,
        project: true,
      },
      orderBy: {
        [query.sortBy || 'createdAt']: query.sortOrder || 'desc',
      },
      skip: query.skip,
      take: query.take,
    });

    return { data: taskList, total };
  }

  async findMyTasksInProject(userId: string, projectId: string) {
    const myTaskList = await this.prismaService.task.findMany({
      where: { assigneeId: userId, projectId },
      include: {
        assignee: true,
        owner: true,
        project: true,
      },
    });
    return myTaskList;
  }

  updateTask(taskId: string, updateTaskDto: PatchTaskStatusDto) {
    return this.prismaService.task.update({
      where: { id: taskId },
      data: {
        title: updateTaskDto.title,
        content: updateTaskDto.content,
        description: updateTaskDto.description,
        duedate: new Date(updateTaskDto.dueDate),
        priority: updateTaskDto.priority,
        status: updateTaskDto.status,
        assigneeId: updateTaskDto.assigneeId,
      },
    });
  }
}
