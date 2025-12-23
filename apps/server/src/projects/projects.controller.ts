import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProjectResponseDto } from './dto/projectResponseDto';
import { plainToInstance } from 'class-transformer';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':teamId')
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Param('teamId') teamId: string,
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const res = await this.projectsService.create(
      createProjectDto,
      teamId,
      req.user.id,
    );
    if (!res) {
      // memo 에러처리
      throw new NotFoundException('실행할 수 없습니다.');
    }
    return res;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':teamId/list')
  async findAll(@Param('teamId') teamId: string) {
    const res = await this.projectsService.findAll(teamId);
    if (!res) {
      // memo 에러처리
      throw new NotFoundException('실행할 수 없습니다.');
    }
    return res.map((project) => {
      return plainToInstance(ProjectResponseDto, project, {
        excludeExtraneousValues: true,
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':projectId')
  async findOne(@Param('projectId') projectId: string) {
    const res = await this.projectsService.findOne(projectId);
    if (!res) {
      // memo 에러처리
      throw new NotFoundException('실행할 수 없습니다.');
    }
    return plainToInstance(ProjectResponseDto, res, {
      excludeExtraneousValues: true,
    });
  }
}
