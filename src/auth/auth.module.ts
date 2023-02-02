import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import { ParticipantsModule } from 'src/participants/participants.module';

@Module({
  imports: [
    ParticipantsModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '10000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService],
})
export class AuthModule {}
