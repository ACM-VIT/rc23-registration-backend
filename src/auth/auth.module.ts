import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ParticipantsModule } from 'src/participants/participants.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ParticipantsModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: config.get<string | number>('jwt.expiry'),
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
