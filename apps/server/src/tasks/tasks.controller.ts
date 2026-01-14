import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { TaskResponseDto } from './dto/taskResponse.dto';

import type { PatchTaskStatusDto } from './dto/patch-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // 할 일 생성
  @UseGuards(AuthGuard('jwt'))
  @Post(':projectId')
  create(
    @Param() param: { projectId: string },
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    return this.tasksService.create(
      param.projectId,
      req.user.id,
      createTaskDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':projectId')
  async findProjectTasks(@Param() param: { projectId: string }) {
    const res = await this.tasksService.findAll(param.projectId);
    return res.map((task) => {
      return plainToInstance(TaskResponseDto, task, {
        excludeExtraneousValues: true,
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':projectId/my')
  async findMyTasksInProject(
    @Param() param: { projectId: string },
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const res = await this.tasksService.findMyTasksInProject(
      req.user.id,
      param.projectId,
    );
    return res.map((task) => {
      return plainToInstance(TaskResponseDto, task, {
        excludeExtraneousValues: true,
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async findMyTasks(
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const res = await this.tasksService.findMyTasks(req.user.id);
    return res.map((task) => {
      return plainToInstance(TaskResponseDto, task, {
        excludeExtraneousValues: true,
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/status')
  update(
    @Param() param: { id: string },
    @Body() updateTaskDto: PatchTaskStatusDto,
  ) {
    console.log(updateTaskDto);
    console.log(param.id, updateTaskDto.status);
    return this.tasksService.patchTaskStatus(param.id, updateTaskDto.status);
  }
}
