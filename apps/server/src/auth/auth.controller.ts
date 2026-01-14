import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req, @Res() res) {
    const { accessToken } = this.authService.login(req.user);
    const frontendUrl = this.configService.get('FRONTEND_URL') as string;
    res.redirect(`${frontendUrl}/auth/callback?accessToken=${accessToken}`);
  }

  // @Post('login')
  // async login(@Body() loginDto: LoginDto) {
  //   const user = await this.authService.validateUser(
  //     loginDto.email,
  //     loginDto.password,
  //   );
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   const resposne = this.authService.getAccessToken(user);
  //   return plainToInstance(
  //     LoginResponseDto,
  //     { ...resposne, user },
  //     {
  //       excludeExtraneousValues: true,
  //     },
  //   );
  // }
}
