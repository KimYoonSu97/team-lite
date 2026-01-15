import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID') as string,
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET') as string,
      callbackURL: configService.get('GOOGLE_CALLBACK_URL') as string,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { emails, photos } = profile;
    const email = emails && emails[0].value;
    const avatar = photos && photos[0].value;
    if (!email || !avatar) {
      throw new UnauthorizedException('Google account is not verified');
    }

    const user = await this.authService.validateSocialUser({
      email: email,
      provider: 'google',
      providerId: profile.id,
      profileImage: avatar,
      nickname: profile.displayName,
    });

    return {
      email: email,
      profileImage: avatar,
      provider: 'google',
      providerId: profile.id,
      nickname: profile.displayName,
      accessToken: accessToken,
    };
  }
}
