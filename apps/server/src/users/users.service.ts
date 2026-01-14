import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(createUserDto: CreateUserDto) {
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  //   const newUser = await this.prisma.user.create({
  //     data: {
  //       ...createUserDto,
  //       password: hashedPassword,
  //     },
  //   });
  //   return newUser;
  // }

  async checkEmail(checkEmailDto: CheckEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: checkEmailDto.email },
    });

    return { isAvailable: user ? false : true };
  }

  async findOneByEmail(email: string) {
    const res = await this.prisma.user.findUnique({
      where: { email },
    });
    return res;
  }

  async findOneById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
}
