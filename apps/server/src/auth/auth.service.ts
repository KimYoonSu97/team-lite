import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '@teamlite/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<IUser, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return {
        id: result.id,
        email: result.email,
        nickname: result.nickname,
        description: result.description,
        profileImage: result.profile_image,
        isUse: result.is_use,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
        deletedAt: result.deleted_at,
      };
    }
    return null;
  }

  login(user: Omit<IUser, 'password'>) {
    const payload = { username: user.email, sub: user.id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
