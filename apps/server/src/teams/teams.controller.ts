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
import { TeamResponseDto } from './dto/TeamResponse.dto';
import { UserResponseDto } from 'src/common/dto/userResponse.dto';
import { plainToInstance } from 'class-transformer';

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
    await this.teamsService.addMembers(newTeam.id, [req.user.id]);
    return newTeam;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-members')
  async addMembers(@Body() addMembersDto: AddMembersDto) {
    const res = await this.teamsService.addMembers(
      addMembersDto.teamId,
      addMembersDto.members,
    );
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async findAll(
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const res = await this.teamsService.findAll(req.user.id);
    if (!res) {
      throw new NotFoundException('팀을 찾을 수 없습니다.');
    }
    return res.map((team) =>
      plainToInstance(TeamResponseDto, team.team, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':teamId')
  async findOne(@Param('teamId') id: string) {
    const res = await this.teamsService.findOne(id);
    if (!res) {
      throw new NotFoundException('팀을 찾을 수 없습니다.');
    }
    return plainToInstance(TeamResponseDto, res, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':teamId/members')
  async findTeamMembers(@Param('teamId') teamId: string) {
    const res = await this.teamsService.findMembers(teamId);
    if (!res) {
      throw new NotFoundException('팀 멤버를 찾을 수 없습니다.');
    }
    return res.map((member) =>
      plainToInstance(UserResponseDto, member.user, {
        excludeExtraneousValues: true,
      }),
    );
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
