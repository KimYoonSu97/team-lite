import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserResponseDto } from 'src/common/dto/userResponse.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return plainToInstance(UserResponseDto, newUser, {
      excludeExtraneousValues: true,
    });
  }

  @Post('check-email')
  checkEmail(@Body() checkEmailDto: CheckEmailDto) {
    return this.usersService.checkEmail(checkEmailDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(
    @Request() req: Request & { user: { id: string; email: string } },
  ) {
    const user = await this.usersService.findOneById(req.user.id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(@Query('email') email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return [];
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
