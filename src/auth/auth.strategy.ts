import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '281870653649-enrbk0s4bpo6b1b18koldsqevr38sc63.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
    };
    done(null, user);
  }
}
