import { Injectable } from '@nestjs/common';
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
    return await this.prisma.project.create({
      data: {
        title: createProjectDto.name,
        description: createProjectDto.description,
        team_id: teamId,
        owner_id: userId,
      },
    });
    // return 'This action adds a new project';
  }

  async findAll(teamId: string) {
    return await this.prisma.project.findMany({
      where: { team_id: teamId },
    });
  }

  async findOne(projectId: string) {
    return await this.prisma.project.findUnique({
      where: { id: projectId },
    });
  }
}
