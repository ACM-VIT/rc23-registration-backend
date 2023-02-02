import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ParticipantsModule } from 'src/participants/participants.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ParticipantsModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '10000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
