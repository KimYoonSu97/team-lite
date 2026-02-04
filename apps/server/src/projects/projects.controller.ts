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
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import type { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProjectResponseDto } from './dto/projectResponseDto';
import { plainToInstance } from 'class-transformer';
import type { AddProjectMemberDto } from './dto/add-member.dto';
import { UserResponseDto } from 'src/common/dto/userResponse.dto';

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
    return plainToInstance(ProjectResponseDto, res, {
      excludeExtraneousValues: true,
    });
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':teamId/list')
  async findAll(
    @Param('teamId') teamId: string,
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const res = await this.projectsService.findAll(teamId, req.user.id);
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
  async findOne(
    @Param('projectId') projectId: string,
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const res = await this.projectsService.findOne(projectId, req.user.id);
    if (!res) {
      // memo 에러처리
      throw new NotFoundException('실행할 수 없습니다.');
    }
    // console.log(res);
    return plainToInstance(ProjectResponseDto, res, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':projectId/member')
  async findProjectMember(@Param('projectId') projectId: string) {
    const res = await this.projectsService.findProjectMember(projectId);
    return res.map((member) => {
      return plainToInstance(UserResponseDto, member.user, {
        excludeExtraneousValues: true,
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':projectId/member')
  async addMembers(@Body() addProjectMemberDto: AddProjectMemberDto) {
    const res = await this.projectsService.addMembers(
      addProjectMemberDto.projectId,
      addProjectMemberDto.members,
    );
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':projectId/member')
  async update(
    @Param('projectId') projectId: string,
    @Body() updateProjectMemberDto: AddProjectMemberDto,
  ) {
    const res = await this.projectsService.updateMember(
      projectId,
      updateProjectMemberDto.members,
    );
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':projectId/member/:userId')
  async deleteMembers(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
  ) {
    const res = await this.projectsService.deleteMember(projectId, userId);
    return res;
  }
}
