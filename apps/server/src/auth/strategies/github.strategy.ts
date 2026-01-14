import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID') as string,
      clientSecret: configService.get('GITHUB_CLIENT_SECRET') as string,
      callbackURL: configService.get('GITHUB_CALLBACK_URL') as string,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    try {
      const { id, username, photos, emails } = profile;
      const email = emails && (emails[0].value as string);
      const avatar = photos && (photos[0].value as string);

      const user = await this.authService.validateSocialUser({
        email: email as string,
        provider: 'github',
        providerId: id as string,
        profileImage: avatar as string,
        nickname: username as string,
      });
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
