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
    const user = this.authService.getAccessToken({
      email: req.user.email,
      id: req.user.id,
    });

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    res.redirect(
      `${frontendUrl}/auth/callback?accessToken=${user.accessToken}`,
    );
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = this.authService.getAccessToken({
      email: req.user.email,
      id: req.user.id,
    });

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    res.redirect(
      `${frontendUrl}/auth/callback?accessToken=${user.accessToken}`,
    );
  }
}
