import { socialAccount } from './../../../../node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/index.d';
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
    private readonly prisma: PrismaService,
  ) {}

  // async validateUser(email: string, password: string) {
  //   const user = await this.usersService.findOneByEmail(email);

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     return user;
  //   }
  //   return null;
  // }

  getAccessToken(user) {
    const payload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  login(user: any) {
    const payload = { email: user.email, userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateSocialUser(details: {
    email: string;
    provider: string;
    providerId: string;
    profileImage: string;
    nickname: string;
  }) {
    const { email, provider, providerId, nickname, profileImage } = details;

    // 이미 가입되어있는지 확인하다.
    const existingSocialAccount = await this.prisma.socialAccount.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
      include: {
        user: true,
      },
    });

    if (existingSocialAccount) {
      return existingSocialAccount.user;
    }

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      await this.prisma.socialAccount.create({
        data: {
          provider,
          providerId,
          userId: existingUser.id,
        },
      });
      return existingUser;
    }

    return this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          nickname,
          profileImage,
          socialAccounts: {
            create: { provider, providerId },
          },
        },
      });
      const personalTeam = await tx.team.create({
        data: {
          name: `${nickname}의 워크스페이스`,
          teamType: 'PERSONAL',
          ownerId: newUser.id,
          description: `${nickname}의 워크스페이스`,
        },
      });

      await tx.team_members.create({
        data: {
          userId: newUser.id,
          teamId: personalTeam.id,
          role: 'OWNER',
        },
      });
      return newUser;
    });
  }

  //   const user = await this.usersService.findOneByEmail(details.email);
  //   if (user) {
  //     return user;
  //   }
  //   return null;
  // }
}
