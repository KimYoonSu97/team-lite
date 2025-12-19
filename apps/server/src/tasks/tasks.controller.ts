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
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';

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
    return await this.tasksService.findAll(param.projectId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':taskId')
  updateTask(@Param() id: string) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':taskId/done')
  updateTaskStatus(@Param() id: string) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete(':taskId')
  deleteTask(@Param() id: string) {}
}
