import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';

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
        content: createTaskDto.content,
        description: createTaskDto.description,
        duedate: new Date(createTaskDto.deadLine),
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

  patchTaskStatus(taskId: string, status: string) {
    return this.prismaService.task.update({
      where: { id: taskId },
      data: { status },
    });
  }
}
