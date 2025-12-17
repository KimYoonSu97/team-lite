import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';

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
    return await this.projectsService.create(
      createProjectDto,
      teamId,
      req.user.id,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':teamId/list')
  async findAll(@Param('teamId') teamId: string) {
    return await this.projectsService.findAll(teamId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':projectId')
  async findOne(@Param('projectId') projectId: string) {
    return await this.projectsService.findOne(projectId);
  }

  // async findAll(@Request() req: Request & { user: { id: string; email: string } }) {
}
