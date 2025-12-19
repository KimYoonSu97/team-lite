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
  NotFoundException,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AuthGuard } from '@nestjs/passport';
import { AddMembersDto } from './dto/add-member.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createTeamDto: CreateTeamDto,
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const newTeam = await this.teamsService.create(createTeamDto, req.user.id);

    await this.teamsService.addMembers(newTeam.id, [
      req.user.id,
      ...createTeamDto.members,
    ]);

    return newTeam;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-members')
  async addMembers(@Body() addMembersDto: AddMembersDto) {
    await this.teamsService.addMembers(
      addMembersDto.teamId,
      addMembersDto.members,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async findAll(
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    return await this.teamsService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':teamId')
  async findOne(@Param('teamId') id: string) {
    return await this.teamsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':teamId/members')
  async findTeamMembers(@Param('teamId') teamId: string) {
    return await this.teamsService.findMembers(teamId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':teamId/members/:deleteUserId')
  async findMembers(
    @Param('teamId') teamId: string,
    @Param('deleteUserId') deleteUserId: string,
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const teamMember = await this.teamsService.getMemberIdInfo(
      deleteUserId,
      teamId,
    );
    if (!teamMember) {
      throw new NotFoundException('팀 멤버를 찾을 수 없습니다.');
    }
    return await this.teamsService.deleteMemberFromTeam(teamMember.id);
  }
}
