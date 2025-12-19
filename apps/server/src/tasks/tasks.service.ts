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
        project_id: projectId,
        owner_id: ownerId,
        assignee_id: createTaskDto.assigneeId,
        title: createTaskDto.title,
        content: createTaskDto.content,
        description: createTaskDto.description,
        duedate: createTaskDto.deadLine,
        priority: createTaskDto.priority,
      },
    });

    // return 'This action adds a new task';
  }

  async findAll(projectId: string) {
    return await this.prismaService.task.findMany({
      where: { project_id: projectId },
      include: {
        user_task_assignee_idTouser: true,
        user_task_owner_idTouser: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  updateOne(id: number, updateTaskDto: any) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
