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
        teamId,
        ownerId: userId,
      },
    });
  }

  async findAll(teamId: string) {
    return await this.prisma.project.findMany({
      where: { teamId },
      include: {
        team: true,
        owner: true,
      },
    });
  }

  async findOne(projectId: string) {
    return await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        team: true,
        owner: true,
      },
    });
  }
}
